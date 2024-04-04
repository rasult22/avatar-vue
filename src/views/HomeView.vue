<script setup lang="ts">
import { ref } from 'vue';
import UIButton from '@/ui/ui-button.vue';
import UIInput from '@/ui/ui-input.vue'
import UISpinner from '@/ui/ui-spinner.vue'
import {useAvatar} from '@/composables/useAvatar'
import useMicroPhone from '@/composables/useMicrophone'

const {isRecording, microphoneIsOpen, queue, queueSize, startMicrophone, stopMicrophone} = useMicroPhone()
const videoRef = ref<HTMLVideoElement>()
const {isLoading, isGenerating, iceConnectionState,closeConnection, state, isError, errorMessage, mediaCanPlay, generateVoice, start} = useAvatar(videoRef)
let text = ref('Салам Азамат, как дела?')
const generate = () => {
  generateVoice(text.value)
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
    <UIButton @mousedown="startMicrophone" @mouseup="stopMicrophone">
      <div class="flex items-center space-x-2">
        <span>Start Recording</span>
        <UISpinner v-if="isRecording" />
      </div>
    </UIButton>
    <div class="flex flex-wrap justify-center">
      <div class="bg-slate-200 font-mono p-4 w-[400px] h-[200px] mt-4">
        <h1 class="font-bold text-[20px]">HeyGen RTC connection</h1>
        <p>isLoading: {{ isLoading }}</p>
        <p>isGenerating: {{ isGenerating }}</p>
        <p>iceConnectionState: {{ iceConnectionState }}</p>
        <p>isError: {{ isError }}</p>
        <p>errorMessage: {{ errorMessage }}</p>
      </div>
      <div class="bg-slate-200 font-mono p-4 w-[400px] h-[200px] mt-4">
        <h1 class="font-bold text-[20px]">MicrophoneInfo</h1>
        <p>isRecording: {{ isRecording }}</p>
        <p>microphoneIsOpen: {{ microphoneIsOpen }}</p>
        <p>queue: {{ queue }}</p>
        <p>queueSize: {{ queueSize }}</p>
      </div>
    </div>
  </div>
</template>
