<template>
  LayoutHeader
  <Header>
    <div :class="`${prefixCls}-left`">
      <AppLogo
        v-if="getShowHeaderLogo || getIsMobile"
        :class="`${prefixCls}-logo`"
        :theme="getHeaderTheme"
        :style="getLogoWidth"
      />
    </div>
    <div :class="`${prefixCls}-action`">
      <SettingButton :class="`${prefixCls}-action-item`" />
    </div>
  </Header>
</template>

<script>
import { defineComponent } from "vue";

import { Layout } from "ant-design-vue";
import { AppLogo } from "/@/components/Application";

import { useDesign } from "/@/hooks/web/useDesign";
import { useHeaderSetting } from "/@/hooks/setting/useHeaderSetting";
import { useMenuSetting } from "/@/hooks/setting/useMenuSetting";
import { useRootSetting } from "/@/hooks/setting/useRootSetting";

import { MenuModeEnum, MenuSplitTypeEnum } from "/@/enums/menuEnum";
import { SettingButtonPositionEnum } from "/@/enums/appEnum";

import { createAsyncComponent } from "/@/utils/factory/createAsyncComponent";
import { useLocale } from "/@/locales/useLocale";

export default defineComponent({
  name: "LayoutHeader",
  components: {
    Header: Layout.Header,
    AppLogo,
    SettingButton: createAsyncComponent(
      () => import("/@/layouts/default/setting/index.vue"),
      {
        loading: true,
      }
    ),
  },
  props: {
    fixed: {
      type: String,
    },
  },
  setup(props) {
    const { prefixCls } = useDesign("layout-header");
    const {
      getShowTopMenu,
      getShowHeaderTrigger,
      getSplit,
      getIsMixMode,
      getMenuWidth,
      getIsMixSidebar,
    } = useMenuSetting();
    const {
      getUseErrorHandle,
      getShowSettingButton,
      getSettingButtonPosition,
    } = useRootSetting();

    const {
      getHeaderTheme,
      getUseLockPage,
      getShowFullScreen,
      getShowNotice,
      getShowContent,
      getShowBread,
      getShowHeaderLogo,
      getShowHeader,
    } = useHeaderSetting();
  },
});
</script>

<style lang="less" scoped>
</style>