<script>
import { defineComponent, ref, toRefs, unref, computed } from "vue";
import designSetting from "/@/settings/designSetting.js";
import { createBreakPointListen } from "/@/hooks/event/useBreakPoint";
import { createAppProviderContext } from './useAppContext.js'

// import { appStore } from '/@/store/modules/app.js'
import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum.js'
import store from '/@/store'

export default defineComponent({
  name: "AppProvider",
  inheritAttrs: false,
  props: {
    prefixCls: {
      type: String,
      default: 'vben',
    }
  },
  setup (props, { slots }) {
    const isMobile = ref(false);
    const isSetState = ref(false);
    console.log("appProvider", store.state.app);
    console.log(typeof designSetting.prefixCls);
    createBreakPointListen(({ screenMap, sizeEnum, width }) => {
      const lgWidth = screenMap.get(sizeEnum.LG)
      console.log(lgWidth)
      if (lgWidth) {
        isMobile.value = width.value - 1 < lgWidth
      }
      console.log('是否为移动端尺寸:', isMobile.value)
      handleRestoreState()
    })

    const prefixCls = toRefs(props)
    createAppProviderContext({ prefixCls, isMobile })
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
          } = store.getters['app/getProjectConfig']
          console.log(menuType, menuMode, menuCollapsed, menuSplit)
          store.commit('app/commitProjectConfigState', {
            menuSetting: {
              type: MenuTypeEnum.SIDEBAR,
              mode: MenuModeEnum.INLINE,
              split: false
            }
          })
          store.commit('app/commitBeforeMiniState', { menuMode, menuCollapsed, menuType, menuSplit })
        }
      } else {

        //不知道下面这段判断的作用，永远不会执行
        if (unref(isSetState)) {
          isSetState.value = false
          const { menuMode, menuCollapsed, menuType, menuSplit } = store.getters['app/getBeforeMiniState']
          store.commit('app/commitProjectConfigState', {
            menuSetting: {
              type: menuType,
              mode: menuMode,
              collapsed: menuCollapsed,
              split: menuSplit
            }
          })
        }
      }
    }
    console.log(slots.default)
    return () => slots.default?.()
  },
});
</script>
