<template>
  <a-radio-group v-model:value="locale">
    <a-radio-button
      key="en"
      value="en"
    >English</a-radio-button>
    <a-radio-button
      key="cn"
      value="zh-cn"
    >中文</a-radio-button>
  </a-radio-group>
  <a-button
    type="primary"
    block
    class="mt-2"
    @click="handleLock"
  >{{t('layout.header.lockScreenBtn')}}</a-button>
  <ConfigProvider
    :locale="getAntdLocale"
    v-bind="lockEvent"
  >
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script >
import { defineComponent, ref } from "vue";
import { ConfigProvider, Radio, Button } from "ant-design-vue"; //按需引入
import HelloWorld from "./components/HelloWorld.vue";
import { useLocale } from "/@/hooks/web/useLocale";
import { useLocale as useLoc } from "/@/locales/useLocale";
import AppProvider from "./components/Application/src/AppProvider.vue";
import { initAppConfigStore } from "/@/logics/initAppConfig.js";
import { useLockPage } from "/@/hooks/web/useLockPage";
import { useTitle } from "/@/hooks/web/useTitle";
import { useI18n } from "/@/hooks/web/useI18n";
import store from "/@/store";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
    ConfigProvider,
    AppProvider,
    [Radio.Group.name]: Radio.Group,
    [Radio.Button.name]: Radio.Button,
    [Button.name]: Button,
  },
  setup() {
    console.log("init!!!");
    initAppConfigStore();
    useTitle();
    const { t } = useI18n();
    const { getAntdLocale } = useLoc();
    const bol = ref(true);
    const getLocale = useLocale(bol.value);
    const lockEvent = useLockPage();
    const locale = ref(getLocale.locale);
    async function handleLock() {
      store.commit("lock/commitLockInfoState", {
        isLock: true,
        pwd: undefined,
      });
    }
    return {
      getAntdLocale,
      bol,
      getLocale,
      locale,
      lockEvent,
      t,
      handleLock,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>