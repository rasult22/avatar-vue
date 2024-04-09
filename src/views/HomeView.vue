<script setup lang="ts">
import { ref, watch } from "vue";
import UIButton from "@/ui/ui-button.vue";
import UIInput from "@/ui/ui-input.vue";
import UISpinner from "@/ui/ui-spinner.vue";
import { useAvatar } from "@/composables/useAvatar";
import useMicroPhone from "@/composables/useMicrophone";
import useDeepgram from "@/composables/useDeepgram";
import useOpenAI from "@/composables/useOpenAI";

let isProcessing = ref(false);
let userText = ref("...");
let avatarText = ref("...");

const {
  sendMessage,
  messages,
  currentMessage,
  gtpIsStreaming,
  currentWord,
  textArr,
} = useOpenAI();
const { connection, isConnecting, transcript, connectionIsReady } =
  useDeepgram("ru");
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
const {
  renderCanvas,
  isLoading,
  isGenerating,
  iceConnectionState,
  closeConnection,
  state,
  isError,
  errorMessage,
  mediaCanPlay,
  generateVoice,
  start,
} = useAvatar(videoRef, canvasRef);
let text = ref("Салам Азамат, как дела?");

watch(currentMessage, (v) => {
  if (v) avatarText.value = v
})

watch([currentMessage, gtpIsStreaming], ([value]) => {
  
  if (value && !gtpIsStreaming.value) {
    console.log(value)
    if (value.length > 200) {
      console.log (`${value} is longer than 100`)
      console.log ('split it to 2')
      const fn = async () => {  
        const arr = value.split(' ')
        const halfIndex = Math.ceil(arr.length / 2);
        let firstHalf = arr.slice(0, halfIndex).join(' ');
        console.log('sending first:' + firstHalf)
        await generateVoice(firstHalf)
        let secondHalf = arr.slice(halfIndex).join(' ');
        setTimeout(() => {
          console.log('sending second:' + secondHalf)
          generateVoice(secondHalf)
        }, 2000)
      }
      
      fn()
    } else {
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
    sendMessage(val.text);
  }
});

const onStopRecording = () => {
  stopMicrophone();
  setTimeout(() => {
    if (
      !isRecording &&
      !transcript.value.isFinal &&
      transcript.value.text !== text.value
    ) {
      console.log("this case");
      text.value = transcript.value.text;
    }
  }, 1000);
};
</script>
<template>
  <div class="home flex flex-col justify-center items-center bg-blue-900 py-4 px-4">
    <div class="flex z-[2] flex-col items-center space-y-2">
      <UIButton v-if="state === 'stopped'" :disabled="isLoading" @click="start">
        <div class="flex items-center space-x-2">
          <span>Start Connection</span>
          <UISpinner v-if="isLoading" />
        </div>
      </UIButton>
      <UIButton v-else @click="closeConnection">Stop Connection</UIButton>
    </div>
    <div class="flex relative flex-col w-full items-center">
      <div
        class="absolute inset-x-0 m-auto h-80 max-w-lg bg-gradient-to-tr from-indigo-400 via-teal-900 to-[#C084FC] blur-[118px]"
      ></div>
      <div class="flex items-start sm:flex-wrap sm:justify-center">
        
        <video
          ref="videoRef"
          class="my-4 hidden z-10 rounded-full max-h-[400px] min-h-[300px] border w-[300px]"
          autoPlay
          playsInline
        ></video>
        <canvas
          ref="canvasRef"
          width="300"
          height="300"
          class="z-10 my-4 rounded-full max-h-[400px] h-[300px] flex border w-[300px]"
        ></canvas>
        <div v-if="avatarText" class="text-white w-[250px] sm:w-full z-[2] text-left">
          <span class="font-bold text-purple-300">avatar:</span>
          {{ avatarText }}
        </div>
        <div v-if="userText" class="text-white w-[300px] sm:w-full z-[2]">
          <span class="font-bold text-red-300">user:</span> {{ userText }}
        </div>
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
    <div class="flex space-x-2 sm:flex-wrap sm:justify-center">
      <UIButton
        class="z-[2]"
        @touchstart="startMicrophone"
        @touchend="onStopRecording"
        @mousedown="startMicrophone"
        @mouseup="onStopRecording"
      >
        <div class="flex items-center space-x-2">
          <span v-if="!isRecording">Hold to Record</span>
          <span v-else>Recording...</span>
          <UISpinner v-if="isRecording" />
        </div>
      </UIButton>
    </div>
    <div class="flex flex-wrap justify-center">
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
        <p>connection: {{ connection !== undefined }}</p>
        <p>isConnecting: {{ isConnecting }}</p>
        <p>connectionIsReady: {{ connectionIsReady }}</p>
      </div>
    </div>
  </div>
</template>
