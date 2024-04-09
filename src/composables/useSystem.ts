import { ref } from "vue";

const errorToast = ref({
  toastIsShown: false,
  showToast: (msg: string) => {
    errorToast.value.toastIsShown = false;
    errorToast.value.message = msg
    errorToast.value.toastIsShown = true;
    setTimeout(() => {
      errorToast.value.toastIsShown = false
    }, 3500)
  },
  message: 'Something went wrong'
})

const isLoading = ref(false)

export default function useSystem() {
  return {
    isLoading,
    errorToast,
    showLoading: () => isLoading.value = true,
    hideLoading: () => isLoading.value = false,
  }
}