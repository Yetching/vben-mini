<template>
  LayoutHeader
  <Header :class="getHeaderClass">
    <div :class="`${prefixCls}-left`">
      <AppLogo
        v-if="getShowHeaderLogo || getIsMobile"
        :class="`${prefixCls}-logo`"
        :theme="getHeaderTheme"
        :style="getLogoWidth"
      />
    </div>
    <div :class="`${prefixCls}-action`">
      <AppSearch :class="`${prefixCls}-action-item`" />
      <SettingButton :class="`${prefixCls}-action-item`" />
    </div>
  </Header>
</template>

<script>
import { computed, defineComponent, unref } from "vue";

import { Layout } from "ant-design-vue";
import { AppLogo, AppSearch } from "/@/components/Application";

import { useDesign } from "/@/hooks/web/useDesign";
import { useAppInject } from "/@/hooks/web/useAppInject";

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
    AppSearch,
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

    const { getIsMobile } = useAppInject();

    const getHeaderClass = computed(() => {
      const theme = unref(getHeaderTheme);
      return [
        prefixCls,
        {
          [`${prefixCls}--fixed`]: props.fixed,
          [`${prefixCls}--mobile`]: unref(getIsMobile),
          [`${prefixCls}--${theme}`]: theme,
        },
      ];
    });

    const getLogoWidth = computed(() => {
      if (!unref(getIsMixMode) || unref(getIsMobile)) {
        return {};
      }
      const width = unref(getMenuWidth) < 180 ? 180 : unref(getMenuWidth);
      return { width: `${width}px` };
    });
    return {
      prefixCls,
      getLogoWidth,
      getIsMobile,
      getShowHeaderLogo,
      getHeaderClass,
    };
  },
});
</script>

<style lang="less">
@import "./index.less";
</style>