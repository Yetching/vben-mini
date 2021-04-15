import '/@/design/index.less';

import { createApp } from 'vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';

import router from '/@/router';
import store from '/@/store/index.js';
import { setupI18n } from '/@/locales/setupI18n';

console.log(store.getters);

(async () => {
  const app = createApp(App);
  await setupI18n(app); //await先完成locales的解析与国际化配置
  app.use(router);
  app.use(store); //这样才能在.vue文件中使用useState
  await router.isReady();

  app.mount('#app', true);
})();
