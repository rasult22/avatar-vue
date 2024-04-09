import { ref } from "vue";

const isLoading = ref(false)

export default function useSystem() {
  return {
    isLoading,
    showLoading: () => isLoading.value = true,
    hideLoading: () => isLoading.value = false,
  }
}