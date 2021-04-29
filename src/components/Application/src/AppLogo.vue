<template>
  <div
    class="anticon"
    @click="handleGoHome"
    :class="[prefixCls, theme, {'collapsed-show-title': getCollapsedShowTtile}]"
  >
    <img
      src="../../../assets/logo.png"
      alt="logo"
    />
    <div
      class="m1-2 truncate md:opacity-100"
      :class="[`${prefixCls}-title`,{'xs:opacity-0': !alwaysShowTitle}]"
      v-show="showTitle"
    >
      {{title}}</div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useDesign } from "/@/hooks/web/useDesign";
import { useMenuSetting } from "/@/hooks/setting/useMenuSetting";
import { useGlobSetting } from "/@/hooks/setting";
import { useGo } from "/@/hooks/web/usePage";

import { PageEnum } from "/@/enums/pageEnum";

export default defineComponent({
  name: "AppLogo",
  props: {
    theme: {
      type: String,
      default: "light",
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    alwaysShowTtile: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { prefixCls } = useDesign("app-logo");
    const { getCollapsedShowTitle } = useMenuSetting();
    const { title } = useGlobSetting();
    const go = useGo();

    function handleGoHome() {
      go(PageEnum.BASE_HOME);
    }

    return {
      handleGoHome,
      prefixCls,
      getCollapsedShowTitle,
      title,
    };
  },
});
</script>

<style lang="less" scoped>
</style>