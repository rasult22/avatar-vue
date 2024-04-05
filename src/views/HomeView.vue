<script setup lang="ts">
import { ref, watch } from 'vue';
import UIButton from '@/ui/ui-button.vue';
import UIInput from '@/ui/ui-input.vue'
import UISpinner from '@/ui/ui-spinner.vue'
import {useAvatar} from '@/composables/useAvatar'
import useMicroPhone from '@/composables/useMicrophone'
import useDeepgram from '@/composables/useDeepgram'
import useOpenAI from '@/composables/useOpenAI';

let isProcessing = ref(false)
const {sendMessage, messages, currentMessage, gtpIsStreaming, currentWord, textQueue} = useOpenAI()
const {connection, isConnecting, transcript, connectionIsReady} = useDeepgram('ru')
const {isRecording, microphoneIsOpen, queue, microphone, firstBlob, removeBlob, queueSize, startMicrophone, stopMicrophone} = useMicroPhone()
const videoRef = ref<HTMLVideoElement>()
const {isLoading, isGenerating, iceConnectionState,closeConnection, state, isError, errorMessage, mediaCanPlay, generateVoice, start} = useAvatar(videoRef)
let text = ref('Салам Азамат, как дела?')
const generate = () => {
  generateVoice(text.value)
}

watch([currentMessage, gtpIsStreaming], ([value]) => {
  if (value && !gtpIsStreaming.value) {
    generateVoice(value)
    currentMessage.value = ""
  }
})

const processQueue = () => {
  if (queueSize.value > 0 && !isProcessing.value) {
    isProcessing.value = true

    if (connectionIsReady.value) {
      const nextBlob = firstBlob.value;

      if (nextBlob && nextBlob.size > 0) {
        connection.value.send(nextBlob)
      }
      removeBlob()
    }
    // timeout?
    isProcessing.value = false
  }
}

watch(queueSize, () => {
  processQueue()
})

watch(transcript, (val) => {
  if (val.isFinal) {
    text.value = val.text
    // call openAI
    sendMessage(text.value)
  }
})

const onStopRecording = () => {
  stopMicrophone()
  setTimeout(() => {
    if (!isRecording && !transcript.value.isFinal && transcript.value.text !== text.value)  {
      console.log('this case')
      text.value = transcript.value.text
    }
  }, 1000)
}

</script>
<template>
  <div class="home flex flex-col justify-center items-center">
    <div class="flex flex-col items-center space-y-2">
      <UIButton v-if="state === 'stopped'" :disabled="isLoading" @click="start">
        <div class="flex items-center space-x-2">
          <span>Start Connection</span>
          <UISpinner v-if="isLoading" />
        </div>  
      </UIButton>
      <UIButton v-else @click="closeConnection">Stop</UIButton>
      <UIInput v-model="text" />
      <UIButton @click="generate" :disabled="isGenerating">
        <div class="flex items-center space-x-2">
          <span>Generate video</span>
          <UISpinner v-if="isGenerating" />
        </div>
      </UIButton>
    </div>
    <video ref="videoRef" class="my-4 w-full max-h-[400px] min-h-[300px] flex border max-w-[300px]" autoPlay playsInline></video>
    <UIButton @touchstart="startMicrophone" @touchend="onStopRecording" @mousedown="startMicrophone" @mouseup="onStopRecording">
      <div class="flex items-center space-x-2">
        <span>Start Recording</span>
        <UISpinner v-if="isRecording" />
      </div>
    </UIButton>
    <div class="flex flex-wrap justify-center">
      <div class="bg-slate-200 font-mono p-4 w-[400px] min-h-[200px] mt-4">
        <h1 class="font-bold text-[20px]">OpenAI</h1>
        <p>textQueue: {{ textQueue }}</p>
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
        <p>connection: {{ connection !== undefined   }}</p>
        <p>isConnecting: {{ isConnecting }}</p>
        <p>connectionIsReady: {{ connectionIsReady }}</p>
      </div>
    </div>
  </div>
</template>
