import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import useQueue from "./useQueue";

let microphone = ref<MediaRecorder>();
let microphoneIsOpen = ref(false);
const {
  add: enqueueBlob,
  remove: removeBlob,
  first: firstBlob,
  size: queueSize,
  queue,
} = useQueue<Blob>();

const isRecording = ref(false)

export default function useMicrophone() {
  const eventer = () =>
    document.visibilityState !== "visible" && stopMicrophone();
  onMounted(() => {
    window.addEventListener("visibilitychange", eventer);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("visibilitychange", eventer);
    if (microphone.value) microphone.value.ondataavailable = null;
  });

  watch(microphone, (val) => {
    if (val) {
      val.ondataavailable = (e) => {
        if (microphoneIsOpen.value) {
          enqueueBlob(e.data);
        }
      };
    }
  });

  setupMicrophone();

  return {
    microphone,
    microphoneIsOpen,
    startMicrophone,
    stopMicrophone,
    queue,
    isRecording,
    enqueueBlob,
    removeBlob,
    firstBlob,
    queueSize,
  }
}

const setupMicrophone = async () => {
  const userMedia = await navigator.mediaDevices.getUserMedia({
    audio: {
      noiseSuppression: true,
      echoCancellation: true,
    },
  });

  microphone.value = new MediaRecorder(userMedia);
};

const stopMicrophone = () => {
  if (!microphone.value) return

  if (microphone.value.state === "recording") {
    isRecording.value = false
    const waiting = setTimeout(() => {
      clearTimeout(waiting);
      microphone.value.pause();
      microphoneIsOpen.value = false;
    }, 1500);
  }
};

const startMicrophone = () => {
  if (!microphone.value) return
  if (microphone.value.state === "paused") {
    microphone.value.resume();
  } else if (microphone.value.state !== 'recording') {
    microphone.value.start(250);
  }
  microphoneIsOpen.value = true
  isRecording.value = true
};
