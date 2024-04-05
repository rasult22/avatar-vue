<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';

const props = defineProps(['modelValue']);
const {modelValue} = toRefs(props)
const emit = defineEmits(['update:modelValue']);

watch(modelValue, (val) => {
  if (modelValue.value !== text.value) {
    text.value = modelValue.value
  }
})

let text = ref(modelValue.value)

watch(text, (val) => {
  emit('update:modelValue', val)
})

</script>
<template>
  <input v-model="text" class="block w-[400px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text">
</template>
