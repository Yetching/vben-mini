<template>
  LayoutMultipleHeader
  <div
    :style="getWrapStyle"
    :class="getClass"
  >
    <LayoutHeader v-if="getShowInsetHeaderRef" />
  </div>
</template>

<script>
import { computed, defineComponent, unref } from "vue";
import LayoutHeader from "./index.vue";

import { useDesign } from "/@/hooks/web/useDesign";
import { useHeaderSetting } from "/@/hooks/setting/useHeaderSetting";

export default defineComponent({
  name: "LayoutMultipleHeader",
  components: {
    LayoutHeader,
  },
  setup() {
    const { prefixCls } = useDesign("layout-multiple-header");

    const {
      getFixed,
      getShowInsetHeaderRef,
      getHeaderTheme,
    } = useHeaderSetting();

    const getIsFixed = computed(() => {
      return unref(getFixed) || unref(getShowInsetHeaderRef);
    });

    const getClass = computed(() => {
      return [
        prefixCls,
        `${prefixCls}--${unref(getHeaderTheme)}`,
        { [`${prefixCls}--fixed`]: unref(getIsFixed) },
      ];
    });

    return {
      getClass,
      getShowInsetHeaderRef,
    };
  },
});
</script>

<style lang="less" scoped>
</style>