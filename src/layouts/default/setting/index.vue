<template>
  <div @click="openDrawer">
    SettingButton
    <SettingDrawer
      ref="settingDrawer"
      @register="register"
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import SettingDrawer from "./SettingDrawer";

export default defineComponent({
  name: "SettingButton",
  components: { SettingDrawer },
  setup() {
    const drawerRef = ref(null);
    const settingDrawer = ref(null);
    console.log(settingDrawer.value);
    onMounted(() => {
      console.log(settingDrawer.value);
    });

    function register(setDrawerProps, fisrt = true) {
      if (fisrt) {
      } else {
        setDrawerProps({
          visible: true,
        });
      }
      drawerRef.value = setDrawerProps;
    }

    function openDrawer() {
      console.log(drawerRef.value);
      register(drawerRef.value, false);
    }

    return {
      register,
      openDrawer,
    };
  },
});
</script>

<style lang="less" scoped>
</style>