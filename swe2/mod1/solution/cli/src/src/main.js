import { createApp } from 'vue';
import App from './App.vue';
import '../public/assets/css/reset.css';
import '../public/assets/css/styles.css';
import store from './store';
import router from './router';

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');
