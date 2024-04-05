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

};

const ttsOptions = ref<SpeakSchema>({
  model: "aura-asteria-en",
});
const sttOptions = ref<LiveSchema>({
  model: "nova-2",
  interim_results: true,
  smart_format: true,
  endpointing: 350,
  utterance_end_ms: 1000,
  filler_words: true,
});
const connection = ref<LiveClient>();
const isConnecting = ref(false);
const connectionIsReady = ref(false);
let transcript = ref({
  isFinal: true,
  text: ""
})

const connect = async () => {
  console.log('connect outer')
  if (!connection.value && !isConnecting.value) {
    isConnecting.value = true;
    
    console.log('connect inner')
    connection.value = new LiveClient(
      await getApiKey(),
      {},
      {
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
      if (connection.value.getReadyState() !== LiveConnectionState.OPEN) {
        clearInterval(interval)
      } else {
        connection.value.keepAlive()
      }
    }, 10000)
  } else {
    if (interval) {
      clearInterval(interval)
    }
  }
}

const setupListeners = () => {
  console.log('run listeners outer')
  if (connection.value && connection.value.getReadyState() !== undefined) {
    console.log('run listeners inner')

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
    connectionIsReady.value = false
    connection.value.removeAllListeners()
    connection.value = undefined
  }
}

export default function useDeepgram() {
  console.log('run hook')
  const start = async () => {
    await connect()
    console.log('run start')
    setupListeners()
  }
  start()

  watch(connection, () => {
    keepAlive()
  })
  onBeforeUnmount(()=> {
    clear()
  })

  return {
    connection,
    isConnecting,
    transcript,
    connectionIsReady
  }
}
