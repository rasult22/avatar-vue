<script setup lang="ts">
import GlobalLoader from '@/components/global-loader.vue'
import ErrorToast from './components/error-toast.vue';

</script>
<template>
  <router-view />
  <GlobalLoader />
  <ErrorToast />
</template>
