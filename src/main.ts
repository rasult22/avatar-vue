import './index.css';
import {MotionPlugin} from '@vueuse/motion'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).use(MotionPlugin).mount('#app');
