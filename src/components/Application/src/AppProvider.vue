<script>
import { defineComponent, ref, toRef, unref, computed } from "vue";
import designSetting from "/@/settings/designSetting.js";
import { createBreakPointListen } from "/@/hooks/event/useBreakPoint";
import { createAppProviderContext } from './useAppContext.js'

// import { appStore } from '/@/store/modules/app.js'
import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum.js'
import { useStore } from 'vuex'

export default defineComponent({
  name: "AppProvider",
  inheritAttrs: false,
  // props: {
  //   prefixCls: designSetting.prefixCls
  // },
  setup (props, { slots }) {
    const store = useStore()
    const isMobile = ref(false);
    const isSetState = ref(false);
    console.log("appProvider", slots);
    console.log(typeof designSetting);
    createBreakPointListen(({ screenMap, sizeEnum, width }) => {
      const lgWidth = screenMap.get(sizeEnum.LG)
      if (lgWidth) {
        isMobile.value = width.value - 1 < lgWidth
      }
      console.log('是否为移动端尺寸:', isMobile.value)
      handleRestoreState()
    })

    const prefixCls = ref(designSetting.prefixCls)
    // createAppProviderContext({ prefixCls, isMobile })

    function handleRestoreState () {
      if (unref(isMobile)) {
        if (!unref(isSetState)) {
          isSetState.value = true
          const {
            menuSetting: {
              type: menuType,
              mode: menuMode,
              collapsed: menuCollapsed,
              split: menuSplit
            }
          } = computed(() => {
            store.state.app.projectConfigState
          })
          store.commit('app/commitProjectConfig', {
            menuSetting: {
              type: MenuTypeEnum.SIDEBAR,
              mode: MenuModeEnum.INLINE,
              split: false
            }
          })
          // appStore.commitBeforeMiniState({ menuMode, menuCollapsed, menuType, menuSplit })
        }
      } else {
        // if (unref(isMobile)) {
        //   isSetState.value = false
        //   const { menuMode, menuCollapsed, menuType, menuSplit } = appStore.getBeforeMiniState
        //   appStore.commitProjectConfigState({
        //     menuSetting: {
        //       type: menuType,
        //       mode: menuMode,
        //       collapsed: menuCollapsed,
        //       split: menuSplit
        //     }
        //   })
        // }
      }
    }
    console.log(slots.default)
    return () => slots.default?.()
  },
});
</script>
