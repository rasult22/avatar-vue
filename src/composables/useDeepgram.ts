import {
  CreateProjectKeyResponse,
  LiveClient,
  LiveSchema,
  LiveTranscriptionEvents,
  LiveTranscriptionEvent,LiveConnectionState,
  SpeakSchema,
} from "@deepgram/sdk";
import { onBeforeUnmount, ref, watch } from "vue";
import useQueue from "./useQueue";
/**
 * TTS Voice Options
 */
const voices: {
  [key: string]: {
    name: string;
    avatar: string;
    language: string;
    accent: string;
  };
} = {
  "aura-asteria-en": {
    name: "Asteria",
    avatar: "/aura-asteria-en.svg",
    language: "English",
    accent: "US",
  },
};
const voiceMap = (model: string) => {
  return voices[model];
};
const getApiKey = async (): Promise<string> => {
  // const result: CreateProjectKeyResponse = await (
  //   await fetch("/api/authenticate", { cache: "no-store" })
  // ).json();
  return process.env.VUE_APP_DEEPGRAM_API

};

const connection = ref<LiveClient>();
const isConnecting = ref(false);
const connectionIsReady = ref(false);
let transcript = ref({
  isFinal: true,
  text: ""
})

const connect = async (lang: 'ru' | 'en') => {
  if (!connection.value && !isConnecting.value) {
    isConnecting.value = true;
    
    connection.value = new LiveClient(
      await getApiKey(),
      {
        
      },
      {
        language: lang,
        model: "nova-2",
        interim_results: true,
        smart_format: true,
        endpointing: 350,
        utterance_end_ms: 1000,
        filler_words: true,
      }
    );
    isConnecting.value = false
  }
};

const keepAlive = () => {
  let interval;
  if (connection.value && connectionIsReady) {
    interval = setInterval(() => {
      if (connection.value && connection.value.getReadyState() !== LiveConnectionState.OPEN) {
        clearInterval(interval)
      } else {
        if (connection.value) {
          connection.value.keepAlive()
        }
      }
    }, 10000)
  } else {
    if (interval) {
      clearInterval(interval)
    }
  }
}

const setupListeners = () => {
  if (connection.value && connection.value.getReadyState() !== undefined) {
    (connection.value as any)._socket.onmessage = (e) => {
      console.log(e)
    }
    connection.value.addListener(LiveTranscriptionEvents.Open, () => {
      connectionIsReady.value = true
    })
    
    connection.value.addListener(LiveTranscriptionEvents.Close, () => {
      // toast("The connection to Deepgram closed, we'll attempt to reconnect.");
      clear()
    })

    connection.value.addListener(LiveTranscriptionEvents.Error, () => {
      // toast(
      //   "An unknown error occured. We'll attempt to reconnect to Deepgram."
      // );
      clear()
    })
    connection.value.addListener(LiveTranscriptionEvents.Metadata, (data) => {
      console.log(data, 'Metadata')
    })
    connection.value.addListener(LiveTranscriptionEvents.Transcript, (data: LiveTranscriptionEvent) => {
      console.log(data, 'Transcript')
      if (data.channel.alternatives[0].transcript) {
        transcript.value = {
          isFinal: data.is_final,
          text: data.channel.alternatives[0].transcript
        }
      }
    })
  }
}

const clear = () => {
  if (connection.value) {
    console.log('clearing deepgram')
    connectionIsReady.value = false
    connection.value.finish()
    connection.value.removeAllListeners()
    connection.value = undefined
  }
}

export default function useDeepgram(lang: 'ru' | 'en') {
  const start = async () => {
    console.log('starting deepgram')
    await connect(lang)
    setupListeners()
  }
  setTimeout(() => {
    start()
  }, 1000)

  watch(connection, () => {
    keepAlive()
  })
  onBeforeUnmount(()=> {
    clear()
  })

  return {
    connection,
    isConnecting,
    clear,
    transcript,
    connectionIsReady
  }
}
