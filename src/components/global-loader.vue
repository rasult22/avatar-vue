<script setup lang="ts">
import UISpinner from '@/ui/ui-spinner.vue';
import useSystem from '@/composables/useSystem'

const {isLoading} = useSystem()
</script>
<template>
  <div v-if="isLoading" class="w-full h-full z-50 fixed top-0 left-0 backdrop-blur-sm">
    <div class="flex w-full h-full fixed z-[51] items-center justify-center ">
      <div class="bg-white shadow-2xl p-4 rounded-md border">
        <UISpinner />
      </div>
    </div>
  </div>
</template>