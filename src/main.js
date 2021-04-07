import { createApp } from 'vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';

import router from '/@/router';

(async () => {
  const app = createApp(App);
  app.use(router);
  await router.isReady();

  app.mount('#app', true);
})();
