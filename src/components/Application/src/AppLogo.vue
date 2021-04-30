<template>
  <div
    class="anticon"
    @click="handleGoHome"
    :class="[prefixCls, theme, {'collapsed-show-title': getCollapsedShowTtile}]"
  >
    <img
      width="32"
      height="32"
      src="../../../assets/images/logo.jpg"
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
      console.log("gohome");
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
@prefix-cls: ~"@{namespace}-app-logo";

.@{prefix-cls} {
  display: flex;
  align-items: center;
  padding-left: 7px;
  cursor: pointer;
  transition: all 0.2s ease;

  &.light {
    border-bottom: 1px solid #eee;
  }

  &.collapsed-show-title {
    padding-left: 20px;
  }

  &.light &-title {
    color: @primary-color;
  }

  &.dark &-title {
    color: @white;
  }

  &-title {
    font-size: 16px;
    font-weight: 700;
    transition: all 0.5s;
  }
}
</style>