import { nextTick, ref, Ref } from 'vue';

const SERVER_URL = process.env.VUE_APP_HEYGET_SERVER_URL;
const apiKey = process.env.VUE_APP_HEYGEN_API_KEY;

type ICEServer = {
  urls: string[];
  username: string;
  credential: string;
};
type SessionInfo = {
  ice_servers2: ICEServer[];
  sdp: any;
  session_id: string;
};

// handle audio

const mediaStreamSource = ref<MediaStreamAudioSourceNode | undefined>()

const shouldRenderCanvas =ref(true)
const isError = ref(false);
const state = ref<'started' | 'stopped'>('stopped')
const errorMessage = ref('');
const mediaCanPlay = ref(false);
const isLoading = ref(false);
const isGenerating = ref(false);
const sessionInfo = ref<SessionInfo>();
const peerConnection = ref<RTCPeerConnection>();
const remoteStream = ref<MediaStream>();
const triggerRemoteStream = ref(0)
const iceConnectionState = ref<RTCIceConnectionState>();

export const useAvatar = (incomingVideoRef: Ref<HTMLVideoElement | undefined>, incomingCanvasRef: Ref<HTMLCanvasElement | undefined>) => {
  const start =  async() => {
    isLoading.value = true;
    shouldRenderCanvas.value = true
    await checkSessionsAndCloseIfExists()
    // create new session
    await new Promise((res, rej) => {
      setTimeout(async () => {
        await createNewSession(incomingVideoRef, incomingCanvasRef)
        res(1)
      },300)
    })
    await new Promise((res, rej) => {
      setTimeout(async () => {
        await startAndDisplaySession()
        res(1)
      }, 300)
    })
    isLoading.value = false
    state.value = 'started'
  }

  return {
    isError,
    isGenerating,
    state,
    errorMessage,
    mediaCanPlay,
    isLoading,
    sessionInfo,
    peerConnection,
    remoteStream,
    renderCanvas,
    triggerRemoteStream,
    closeConnection: closeConnectionHandler,
    iceConnectionState,
    start,
    generateVoice: async (text: string) => {
      if (sessionInfo.value) {
        isGenerating.value = true
        await repeat(sessionInfo.value?.session_id, text)
      }
    }
  };
};

const createNewSession = async (videoRef: Ref<HTMLVideoElement | undefined>, canvasRef: Ref<HTMLCanvasElement | undefined>) => {
  const avatarID = process.env.VUE_APP_HEYGEN_AVATAR_ID || '';
  const voiceID = process.env.VUE_APP_HEYGEN_VOICE_ID || '';

  // call the new interface to get the server's offer SDP and ICE server to create a new RTCPeerConnection
  sessionInfo.value = await newSession('low', avatarID, voiceID);
  if (sessionInfo.value) {
    const { sdp: serverSdp, ice_servers2: iceServers } = sessionInfo.value;

    // Create a new RTCPeerConnection
    peerConnection.value = new RTCPeerConnection({ iceServers: iceServers });

    // When audio and video streams are received, display them in the video element
    // RASUL: instead of displaying in element we save it to the ref, then return it from composable
    peerConnection.value.ontrack = (event) => {
      console.log('Received the track');
      if (event.track.kind === 'audio' || event.track.kind === 'video') {
        remoteStream.value = event.streams[0];
        triggerRemoteStream.value++

        if (event.track.kind === 'audio') {
          const audioContext = new AudioContext()
          const audioAnalyzer = audioContext.createAnalyser()
          const source = audioContext.createMediaStreamSource(event.streams[0])
          source.connect(audioContext.destination)
          const analyzer = audioContext.createAnalyser()
          analyzer.connect(audioContext.destination)
          analyzer.fftSize = 64;
          setInterval(() => {
            let frequencyData = new Uint8Array(analyzer.frequencyBinCount);
            analyzer.getByteFrequencyData(frequencyData);
            if (frequencyData.join('') !== "00000000000000000000000000000000") {
              alert('there is some data')
              console.log(frequencyData)
            }
            
          }, 1000)
        }
        if (videoRef.value) {

          videoRef.value.srcObject = event.streams[0];

          if (videoRef.value.paused)  {
            videoRef.value.play().then(_ => {}).catch(() => {})
          }
          if (shouldRenderCanvas.value) {
            shouldRenderCanvas.value = false
            setTimeout(() => {
              renderCanvas(canvasRef, videoRef)
            }, 500)
          }
        }
      }
    };
    // When receiving a message, save it in the status ref
    peerConnection.value.ondatachannel = (event) => {
      const dataChannel = event.channel;
      dataChannel.onmessage = (event) => {
        // console.log('Recieved message:', event.data);
        setTimeout(() => {
          isGenerating.value = false
        }, 400)
      };
    };
    // Set server's SDP as remote description
    const remoteDescription = new RTCSessionDescription(serverSdp);
    await peerConnection.value.setRemoteDescription(remoteDescription);
  }
};

const startAndDisplaySession = async () => {
  if (!sessionInfo.value || !peerConnection.value) return;

  // Create and set local SDP description
  const localDescription = await peerConnection.value.createAnswer();
  await peerConnection.value.setLocalDescription(localDescription);

  // When ICE candidate is available, send to the server
  peerConnection.value.onicecandidate = ({ candidate }) => {
    console.log('Received ICE candidate:', candidate);
    setTimeout(() => {
      if (candidate && sessionInfo.value) {
        handleICE(sessionInfo.value.session_id, candidate.toJSON());
      }
    }, 300);
  };

  // When ICE connection state changes, display the new state
  peerConnection.value.oniceconnectionstatechange = (event) => {
    iceConnectionState.value = peerConnection.value?.iceConnectionState;
  };

  // Start session
  await startSession(sessionInfo.value.session_id, localDescription);
  console.log('Session Started Successfully');
};

async function newSession(
  quality: 'high' | 'medium' | 'low',
  avatar_name: string,
  voice_id: string,
) {
  const response = await fetch(`${SERVER_URL}/v1/streaming.new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': apiKey,
    },
    body: JSON.stringify({
      quality,
      avatar_name,
      voice: {
        voice_id: voice_id,
        rate: 1.25
      },
    }),
  });
  if (response.status === 500) {
    console.error('Server error');
    isError.value = true;
    errorMessage.value = 'Server Error. Please ask the staff if the service has been turned on';
    // updateStatus(
    //   statusElement,
    //   'Server Error. Please ask the staff if the service has been turned on',
    // );

    throw new Error('Server error');
  } else {
    const data = await response.json();
    console.log(data.data);
    return data.data;
  }
}
// submit the ICE candidate
async function handleICE(session_id: string, candidate: RTCIceCandidateInit) {
  const response = await fetch(`${SERVER_URL}/v1/streaming.ice`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': apiKey,
    },
    body: JSON.stringify({ session_id, candidate }),
  });
  if (response.status === 500) {
    console.error('Server error');
    isError.value = true;
    errorMessage.value = 'Server Error. Please ask the staff if the service has been turned on';
    // updateStatus(
    //   statusElement,
    //   'Server Error. Please ask the staff if the service has been turned on',
    // );
    throw new Error('Server error');
  } else {
    const data = await response.json();
    return data;
  }
}
// start the session
async function startSession(session_id: string, sdp: any) {
  const response = await fetch(`${SERVER_URL}/v1/streaming.start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': apiKey,
    },
    body: JSON.stringify({ session_id, sdp }),
  });
  if (response.status === 500) {
    console.error('Server error');
    isError.value = true;
    errorMessage.value = 'Server Error. Please ask the staff if the service has been turned on';

    // updateStatus(
    //   statusElement,
    //   'Server Error. Please ask the staff if the service has been turned on',
    // );
    throw new Error('Server error');
  } else {
    const data = await response.json();
    return data.data;
  }
}

async function closeConnectionHandler() {
  if (!sessionInfo.value || !peerConnection.value) {
    // already closed
    return;
  }
  renderID.value++
  mediaCanPlay.value = false;
  
  console.log('closing connection...');
  try {
    // Close local connection
    peerConnection.value.close();
    // Call the close interface
    const resp = await stopSession(sessionInfo.value.session_id);
    state.value = 'stopped'
    console.log('conneciton closed');
    console.log(resp);
  } catch (err) {
    console.error('Failed to close the connection:', err);
  }
}

const checkSessionsAndCloseIfExists = async () => {
  const data = await getSessionsList()
  const sessionsData = data.data
  if (sessionsData.sessions && sessionsData.sessions.length > 0) {
    sessionsData.sessions.forEach(async (s: any) => {
      await stopSession(s.session_id)
    })
  }
}

async function getSessionsList () {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-api-key': apiKey
    }
  };
  
  const response = await fetch(`${SERVER_URL}/v1/streaming.list`, options).then(response => response.json())
  return response
}

// stop session
async function stopSession(session_id: string) {
  const response = await fetch(`${SERVER_URL}/v1/streaming.stop`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': apiKey,
    },
    body: JSON.stringify({ session_id }),
  });
  if (response.status === 500) {
    console.error('Server error');
    isError.value = true;
    errorMessage.value = 'Server Error. Please ask the staff for help';
    // updateStatus(statusElement, 'Server Error. Please ask the staff for help');
    throw new Error('Server error');
  } else {
    const data = await response.json();
    return data.data;
  }
}
async function repeat(session_id: string, text: string) {
  const response = await fetch(`${SERVER_URL}/v1/streaming.task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': apiKey,
    },
    body: JSON.stringify({ session_id, text }),
  });
  if (response.status === 500) {
    console.error('Server error');
    // updateStatus(
    //   statusElement,
    //   'Server Error. Please ask the staff if the service has been turned on',
    // );
    throw new Error('Server error');
  } else {
    const data = await response.json();
    return data.data;
  }
}

let renderID = ref(0)
const renderCanvas = (canvasRef: Ref<HTMLCanvasElement | undefined>, videoRef: Ref<HTMLVideoElement | undefined>) => {
  // init renderID
  const curRenderID = Math.trunc(Math.random() * 1000000000)
  renderID.value = curRenderID
  // get canvas context
  const ctx = canvasRef.value.getContext('2d', { willReadFrequently: true });


  function process_frame () {
    if (curRenderID !== renderID.value) {
      return
    }
    // If streaming is not
    if (!videoRef.value.videoHeight || !videoRef.value.videoWidth) {
      setTimeout(() => {
        process_frame()
      }, 200)
      return
    }

    // set dimestions
    canvasRef.value.width = videoRef.value.videoWidth;
    canvasRef.value.height = videoRef.value.videoHeight;
    
    // drawing frame
    ctx.drawImage(videoRef.value, 0, 0, canvasRef.value.width, canvasRef.value.height)
    ctx.getContextAttributes().willReadFrequently = true;
    
    const imageData = ctx.getImageData(0, 0, canvasRef.value.width, canvasRef.value.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];

      // You can implement your own logic here
      if (isCloseToGreen([red, green, blue])) {
        // if (isCloseToGray([red, green, blue])) {
        data[i + 3] = 0;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(process_frame);
  }

  process_frame();
}
function isCloseToGreen(color) {
  const [red, green, blue] = color;
  return green > 90 && red < 90 && blue < 90;
}
