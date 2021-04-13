import { createApp } from 'vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';

import router from '/@/router';
import store from '/@/store/index.js';

console.log(store);

(async () => {
  const app = createApp(App);
  app.use(router);
  app.use(store); //这样才能在.vue文件中使用useState
  await router.isReady();

  app.mount('#app', true);
})();
