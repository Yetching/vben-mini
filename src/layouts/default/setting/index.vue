<template>
  SettingButton
  <SettingDrawer />
</template>

<script>
import { defineComponent } from "vue";
import { Divider } from "ant-design-vue";
import { TypePicker } from "./components";
import SettingDrawer from "./SettingDrawer";

export default defineComponent({
  name: "SettingButton",
  components: { SettingDrawer },
  setup() {},
});
</script>

<style lang="less" scoped>
</style>