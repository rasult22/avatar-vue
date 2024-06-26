<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import UIButton from "@/ui/ui-button.vue";
import IconEn from '@/components/icon-en.vue'
import IconRu from '@/components/icon-ru.vue'
import IconMic from '@/components/icon-mic.vue'
import IconRecording from '@/components/icon-recording.vue'
import UISpinner from "@/ui/ui-spinner.vue";
import { useAvatar } from "@/composables/useAvatar";
import useMicroPhone from "@/composables/useMicrophone";
import useDeepgram from "@/composables/useDeepgram";
import useOpenAI from "@/composables/useOpenAI";
import { useRouter } from "vue-router";
import useSystem from "@/composables/useSystem";
import { onClickOutside } from '@vueuse/core'

const router = useRouter()
const ll = ''
let isProcessing = ref(false);
let userText = ref(ll);
let textToSend = ref<string[]>([])
let prevText = ref(ll);
let avatarText = ref(ll);
let lang = localStorage.getItem('lang') as 'en' | 'ru' | undefined
const {showLoading, hideLoading} = useSystem()
const {
  sendMessage,
  messages,
  currentMessage,
  gtpIsStreaming,
  currentWord,
  clearMessages
} = useOpenAI();
const { connection, isConnecting, transcript, connectionIsReady } =
  useDeepgram(lang || "en");
const {
  isRecording,
  microphoneIsOpen,
  queue,
  microphone,
  firstBlob,
  removeBlob,
  queueSize,
  startMicrophone,
  stopMicrophone,
} = useMicroPhone();
const videoRef = ref<HTMLVideoElement>();
const canvasRef = ref<HTMLCanvasElement>();
const recButtonRef = ref<HTMLButtonElement>()
onClickOutside(recButtonRef, () => {
  if (isRecording.value) {
    onStopRecording()
  }
})
const {
  isLoading,
  isGenerating,
  iceConnectionState,
  closeConnection,
  state,
  isError,
  errorMessage,
  generateVoice,
  start,
} = useAvatar(videoRef, canvasRef, lang);
let text = ref("Салам Азамат, как дела?");
const enWaitingWords = [
  "Give me a second to gather my thoughts.",
  "Hold on while I think this through.",
  "Just a moment, I’m pondering.",
  "Let me mull this over.",
  "I need a quick minute to reflect.",
  "Allow me some time to consider.",
  "Bear with me as I contemplate.",
  "I just need a brief moment to deliberate.",
  "Hang tight, I’m processing.",
  "Can you give me a short pause to think?"
];
const ruWaitingWords = ['Секундочку, дайте мне подумать', 'Позвольте немного подумать.' ,'Сейчас подумаем... Вот!' , 'Аха, подождите немного', 'Давайте подумаем...', 'Позвольте мне взглянуть... Аха']

watch(currentMessage, (v) => {
  if (v) avatarText.value = v
})
onMounted(async () => {
  showLoading()
  await start()
  hideLoading()
})
onBeforeUnmount(() => {
  closeConnection()
})

watch([currentMessage, gtpIsStreaming], ([value]) => {
  
  if (value && !gtpIsStreaming.value) {
    console.log(value)
    if (value.length > 2000) {
      const fn = async () => {  
        const arr = value.split(' ')
        const halfIndex = Math.ceil(arr.length / 2);

        //
        let firstHalf = arr.slice(0, halfIndex)
        const firstHalfIndex = Math.ceil(firstHalf.length / 2)
        let firstHalfFirst = firstHalf.slice(0, firstHalfIndex).join(' ')
        let firstHalfSecond = firstHalf.slice(firstHalfIndex).join('')
        ///
        console.log('sending firsthalffirst: ' + firstHalf)
        await generateVoice(firstHalfFirst)
        await new Promise((res) => {
          setTimeout(() => {
            generateVoice(firstHalfSecond).then(() => {
              res(0)
            })
          }, 2000)
        })
        
        //
        let secondHalf = arr.slice(halfIndex);
        const secondHalfHalfIndex = Math.ceil(secondHalf.length / 2)
        let secondHalfFirst = secondHalf.slice(0, secondHalfHalfIndex).join(' ')
        let secondHalfSecond = secondHalf.slice(secondHalfHalfIndex).join(' ')
        //
        await new Promise((res) => {
          setTimeout(() => {
            generateVoice(secondHalfFirst).then(() => {
              res(0)
            })
          }, 2000)
        })
        await new Promise((res) => {
          setTimeout(() => {
            generateVoice(secondHalfSecond).then(() => {
              res(0)
            })
          }, 2000)
        })
      }
      fn()
    }
    if (value.length > 200 && value.length <= 2000) {
      console.log (`${value} is longer than 100`)
      console.log ('split it to 2')
      const fn = async () => {  
        const arr = value.split(' ')
        const halfIndex = Math.ceil(arr.length / 2);
        let firstHalf = arr.slice(0, halfIndex).join(' ');
        console.log('sending first: ' + firstHalf)
        await generateVoice(firstHalf)
        let secondHalf = arr.slice(halfIndex).join(' ');
        setTimeout(() => {
          console.log('sending second:' + secondHalf)
          generateVoice(secondHalf)
        }, 2000)
      }
      
      fn()
    } else if (value.length <= 200){
      console.log('sending:', value)
      generateVoice(value);
    }
    avatarText.value = value;
    currentMessage.value = "";
  }
});


const processQueue = () => {
  if (queueSize.value > 0 && !isProcessing.value) {
    isProcessing.value = true;

    if (connectionIsReady.value) {
      const nextBlob = firstBlob.value;

      if (nextBlob && nextBlob.size > 0) {
        connection.value.send(nextBlob);
      }
      removeBlob();
    }
    // timeout?
    isProcessing.value = false;
  }
};

watch(queueSize, () => {
  processQueue();
});

watch(transcript, (val) => {
  // call openAI
  userText.value = val.text;
  if (val.isFinal && !gtpIsStreaming.value) {
    prevText.value = val.text;
    textToSend.value.push(val.text)
    // sendMessage(val.text);
  }
});


const onStopRecording = () => {
  console.log('run')
  setTimeout(() => {
    stopMicrophone();
    if (textToSend.value.length) {
      const finalText =textToSend.value.join(' ')
      setTimeout(() => {
        userText.value = finalText
      }, 400)
      console.log(finalText)
      sendMessage(finalText)
      textToSend.value = []
    } else if (!transcript.value.isFinal && transcript.value.text) {
      sendMessage(transcript.value.text)
      console.log('this case')
    }
    if (lang === 'en') {
      const random = enWaitingWords[Math.floor(Math.random() * enWaitingWords.length)]
      generateVoice(random)
    } else {
      const random = ruWaitingWords[Math.floor(Math.random() * ruWaitingWords.length)]
      generateVoice(random)
    }
  }, 1000)
};
const test = (e) => {
  console.log(e)
}
</script>
<template>
  <div class="home min-h-[100vh] flex flex-col pt-[20vh] items-center bg-blue-900 py-4 px-4">
    <div
        class="absolute inset-x-0 m-auto h-80 max-w-lg bg-gradient-to-tr from-indigo-400 via-teal-900 to-[#C084FC] blur-[118px]"
      ></div>
    <div class="absolute top-4 flex w-full z-[2] flex-col items-center space-y-2">
      <div @click="router.push('/')" class="absolute right-4 top-2">
        <IconRu v-if="lang === 'ru'"></IconRu>
        <IconEn v-else></IconEn>
      </div>
    </div>
    <div :class="{'opacity-0': state === 'stopped'}" class="flex  relative flex-col w-full items-center">
      
      <div class="flex items-start sm:flex-wrap sm:justify-center">
        <video
          ref="videoRef"
          class="my-4 hidden z-10 max-h-[400px] min-h-[300px] w-[300px]"
          autoPlay
          playsInline
        ></video>
        <canvas
          ref="canvasRef"
          width="300"
          height="300"
          class="z-10 my-4 max-h-[400px] h-[300px] flex w-[300px]"
        ></canvas>
      </div>
      <div
        v-if="gtpIsStreaming || isGenerating"
        class="my-4 flex space-x-2 justify-center items-center"
      >
        <div
          class="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"
        ></div>
        <div
          class="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"
        ></div>
        <div class="h-2 w-2 bg-white rounded-full animate-bounce"></div>
      </div>
    </div>
    <div v-if="iceConnectionState === 'connected'" :class="{'opacity-0': state === 'stopped'}" class="flex space-x-2 mt-4 sm:flex-wrap sm:justify-center">
      <UIButton
        ref="recButtonRef"
        class="z-[2] active:scale-105"
        @mousedown="startMicrophone"
        @mouseup="onStopRecording"
        @touchstart="startMicrophone"
        v-touch:longtap="onStopRecording"
        @touchend="onStopRecording"
        >
        <div class="flex items-center space-x-2">
          <IconRecording v-if="isRecording"/>
          <IconMic v-else/>
          <UISpinner  v-if="isRecording"/>
        </div>
      </UIButton>
      <UIButton class="z-[2] active:scale-105" @click="() => {
        clearMessages()
        avatarText = ''
        userText = ''
      }">
        {{lang ==='ru' ? 'Очистить чат' : 'Clear chat'}}
      </UIButton>
    </div>
    <div :class="{'opacity-0': state === 'stopped'}" class="w-full justify-center">
      <div v-if="userText" v-motion :initial="{opacity: 0}" :enter="{opacity: 1}" :delay="20" class="text-white mx-auto sm:text-[14px] w-[50%] sm:w-full z-[2]">
        <span class="font-bold text-red-300">user:</span> {{ userText }}
      </div>
      <div v-if="avatarText" v-motion :initial="{opacity: 0}" :enter="{opacity: 1}" :delay="20" class="text-white mx-auto mt-2 sm:text-[14px] w-[50%] sm:w-full z-[2] text-left">
        <span class="font-bold text-purple-300">avatar:</span>
        {{ avatarText }}
      </div>
    </div>
    <div v-if="false" class="flex flex-wrap justify-center">
      <div class="bg-slate-200 font-mono p-4 w-[400px] min-h-[200px] mt-4">
        <h1 class="font-bold text-[20px]">OpenAI</h1>
        <p>currentWord: {{ currentWord }}</p>
        <p>currentMessage: {{ currentMessage }}</p>
        <p>messages: {{ messages }}</p>
        <p>gtpIsStreaming: {{ gtpIsStreaming }}</p>
      </div>
      <div class="bg-slate-200 font-mono p-4 w-[400px] min-h-[200px] mt-4">
        <h1 class="font-bold text-[20px]">HeyGen RTC connection</h1>
        <p>isLoading: {{ isLoading }}</p>
        <p>isGenerating: {{ isGenerating }}</p>
        <p>iceConnectionState: {{ iceConnectionState }}</p>
        <p>isError: {{ isError }}</p>
        <p>errorMessage: {{ errorMessage }}</p>
      </div>
      <div class="bg-slate-200 font-mono p-4 w-[400px] min-h-[200px] mt-4">
        <h1 class="font-bold text-[20px]">Microphone Info</h1>
        <p>isRecording: {{ isRecording }}</p>
        <p>microphone: {{ microphone && microphone.state }}</p>
        <p>microphoneIsOpen: {{ microphoneIsOpen }}</p>
        <p>queue: {{ queue }}</p>
        <p>queueSize: {{ queueSize }}</p>
      </div>
      <div class="bg-slate-200 font-mono p-4 w-[400px] min-h-[200px] mt-4">
        <h1 class="font-bold text-[20px]">Deepgram API</h1>
        <p>transcript: {{ transcript }}</p>
        <p>isProcessing: {{ isProcessing }}</p>
        <p>connection:. {{ connection !== undefined }}</p>
        <p>isConnecting: {{ isConnecting }}</p>
        <p>connectionIsReady: {{ connectionIsReady }}</p>
      </div>
    </div>
  </div>
</template>
