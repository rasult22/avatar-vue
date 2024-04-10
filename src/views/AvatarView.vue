<script setup lang="ts">
import { ref, watch } from "vue";
import LangSelector from '@/components/lang-selector.vue'
import AvatarFeature from "@/components/avatar-feature.vue";
import IconEn from '@/components/icon-en.vue'
import IconRu from '@/components/icon-ru.vue'
import useMicroPhone from "@/composables/useMicrophone";
import useSystem from "@/composables/useSystem";
const ll = ''
let showLangSelector = ref(true);
let lang = ref<'en' | 'ru'>()
useMicroPhone()
const {showLoading, hideLoading} = useSystem()

const onLangSelect = (new_lang: 'en' | 'ru') => {
  showLangSelector.value = false
  lang.value = new_lang
}
</script>
<template>
  <LangSelector :show="showLangSelector" @select="onLangSelect" />
  <div class="home min-h-[100vh] flex flex-col pt-[20vh] items-center bg-blue-900 py-4 px-4">
    <div
        class="absolute inset-x-0 m-auto h-80 max-w-lg bg-gradient-to-tr from-indigo-400 via-teal-900 to-[#C084FC] blur-[118px]"
      ></div>
    <div class="absolute top-4 flex w-full z-[2] flex-col items-center space-y-2">
      <div @click="showLangSelector = true"  class="absolute right-4 top-2">
        <IconRu v-if="lang === 'ru'"></IconRu>
        <IconEn v-else></IconEn>
      </div>
    </div>
    <AvatarFeature v-if="lang === 'ru'" lang="ru"/>
    <AvatarFeature v-else-if="lang === 'en'" lang="en"/>
  </div>
</template>
