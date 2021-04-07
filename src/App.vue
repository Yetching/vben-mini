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
  <ConfigProvider :locale="getLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script >
import { defineComponent, ref } from "vue";
import { ConfigProvider, Radio } from 'ant-design-vue'  //按需引入
import HelloWorld from "./components/HelloWorld.vue";
import { useLocale } from '/@/hooks/web/useLocale'
import AppProvider from './components/Application/src/AppProvider.vue'
// import { useLockPage } from '/@/hooks/web/useLockPage'

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
    ConfigProvider,
    AppProvider,
    [Radio.Group.name]: Radio.Group,
    [Radio.Button.name]: Radio.Button
  },
  setup () {
    console.log('init!!!')
    const bol = ref(true)
    const getLocale = useLocale(bol.value)
    console.log(getLocale)
    const locale = ref(getLocale.locale)
    return {
      bol,
      getLocale,
      locale
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>