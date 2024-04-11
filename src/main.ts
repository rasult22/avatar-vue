import './index.css';
import {MotionPlugin} from '@vueuse/motion'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Vue3TouchEvents from "vue3-touch-events";
import type { Vue3TouchEventsOptions} from "vue3-touch-events";
const app = createApp(App)
app.use(router)
app.use(MotionPlugin)
app.use<Vue3TouchEventsOptions>(Vue3TouchEvents, {
  disableClick: true,
  longTapTimeInterval: 500000
})

app.mount('#app');
