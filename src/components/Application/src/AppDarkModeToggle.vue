<template>
  <div
    :class="[prefixCls,{[`${prefixCls}--dark`]: isDark}]"
    @click="toggleDarkMode"
  >
    darkModeToggle
    <div :class="`${prefixCls}=inner`"></div>
    <SvgIcon
      size="14"
      name="sun"
    />
    <SvgIcon
      size="14"
      name="moon"
    />
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";

import { useDesign } from "/@/hooks/web/useDesign";
import { useRootSetting } from "/@/hooks/setting/useRootSetting";

import { SvgIcon } from "/@/components/Icon";

import { ThemeEnum } from "/@/enums/appEnum";

export default defineComponent({
  name: "DarkModeToggle",
  components: { SvgIcon },
  setup() {
    const { getDarkMode, setDarkMode } = useRootSetting();
    const isDark = computed(() => getDarkMode.value === ThemeEnum.DARK);
    function toggleDarkMode() {
      const darkMode =
        getDarkMode.value === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;
      setDarkMode(darkMode);
    }
    return {
      toggleDarkMode,
      isDark,
    };
  },
});
</script>

<style lang="less" scoped>
</style>