<script>
import { defineComponent, ref, toRef } from "vue";
import designSetting from "/@/settings/designSetting.js";
import { createBreakPointListen } from "/@/hooks/event/useBreakPoint";
import { createAppProviderContext } from './useAppContext.js'
export default defineComponent({
  name: "AppProvider",
  inheritAttrs: false,
  // props: {
  //   prefixCls: designSetting.prefixCls
  // },
  setup (props, { slots }) {
    const isMobile = ref(false);
    const isSetting = ref(false);
    console.log("appProvider", slots);
    console.log(typeof designSetting);
    createBreakPointListen(({ screenMap, sizeEnum, width }) => {
      const lgWidth = screenMap.get(sizeEnum.LG)
      if (lgWidth) {
        isMobile.value = width.value - 1 < lgWidth
      }
      console.log('是否为移动端尺寸:', isMobile.value)
    })

    const prefixCls = ref(designSetting.prefixCls)
    createAppProviderContext({ prefixCls, isMobile })

    return () => slots.default?.()
  },
});
</script>
