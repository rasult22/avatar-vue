<script setup lang="ts">
import GlobalLoader from '@/components/global-loader.vue'
import ErrorToast from './components/error-toast.vue';
import { onBeforeMount } from 'vue';
import router from './router';
onBeforeMount(() => {
  router.push('/')
})
</script>
<template>
  <router-view />
  <GlobalLoader />
  <ErrorToast />
</template>
