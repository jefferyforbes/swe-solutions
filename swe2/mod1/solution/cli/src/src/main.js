import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/reset.css';
import './assets/css/styles.css';
import store from './store';
import router from './router';

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');
