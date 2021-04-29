import { computed, unref, ref } from 'vue';

import store from '/@/store';
import {
  SIDE_BAR_MINI_WIDTH,
  SIDE_BAR_SHOW_TIT_MINI_WIDTH,
} from '/@/enums/appEnum';
import { MenuModeEnum, MenuTypeEnum, TriggerEnum } from '/@/enums/menuEnum';
import { useFullContent } from '/@/hooks/web/useFullContent';

const mixSideHasChildren = ref(false);

export function useMenuSetting() {
  const { getFullContent: fullContent } = useFullContent();
  const menuSetting = unref(store.getters['app/getProjectConfig']).menuSetting;
  console.log(8888, menuSetting.type);
  const getShowSidebar = computed(() => {
    return (
      unref(getSplit) ||
      (unref(getShowMenu) &&
        unref(getMenuMode) !== MenuModeEnum.HORIZONTAL &&
        !unref(fullContent))
    );
  });

  const getCollapsed = computed(() => unref(menuSetting).collapsed);

  const getMenuType = computed(() => unref(menuSetting).type);

  const getMenuMode = computed(() => unref(menuSetting).mode);

  const getMenuFixed = computed(() => unref(menuSetting).fixed);

  const getShowMenu = computed(() => unref(menuSetting).show);

  const getMenuHidden = computed(() => unref(menuSetting).hidden);

  const getMenuWidth = computed(() => unref(menuSetting).menuWidth);

  const getTrigger = computed(() => unref(menuSetting).trigger);

  const getMenuTheme = computed(() => unref(menuSetting).theme);

  const getSplit = computed(() => unref(menuSetting).split);

  const getMenuBgColor = computed(() => unref(menuSetting).bgColor);

  const getMixSideTrigger = computed(() => unref(menuSetting).mixSideTrigger);

  const getCanDrag = computed(() => unref(menuSetting).canDrag);

  const getAccordion = computed(() => unref(menuSetting).accordion);

  const getMixSideFixed = computed(() => unref(menuSetting).mixSideFixed);

  const getTopMenuAlign = computed(() => unref(menuSetting).topMenuAlign);

  const getCloseMixSidebarOnChange = computed(
    () => unref(menuSetting).closeMixSidebarOnChange
  );

  const getIsSidebarType = computed(
    () => unref(getMenuType) === MenuTypeEnum.SIDEBAR
  );

  const getIsTopMenu = computed(
    () => unref(getMenuType) === MenuTypeEnum.TOP_MENU
  );

  const getCollapsedShowTitle = computed(
    () => unref(menuSetting).collapsedShowTitle
  );

  const getShowTopMenu = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.HORIZONTAL || unref(getSplit);
  });

  const getShowHeaderTrigger = computed(() => {
    if (
      unref(getMenuType) === MenuTypeEnum.TOP_MENU ||
      !unref(getShowMenu) ||
      unref(getMenuHidden)
    ) {
      return false;
    }

    return unref(getTrigger) === TriggerEnum.HEADER;
  });

  const getIsHorizontal = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.HORIZONTAL;
  });

  const getIsMixSidebar = computed(() => {
    return unref(getMenuType) === MenuTypeEnum.MIX_SIDEBAR;
  });

  const getIsMixMode = computed(() => {
    return (
      unref(getMenuMode) === MenuModeEnum.INLINE &&
      unref(getMenuType) === MenuTypeEnum.MIX
    );
  });

  const getRealWidth = computed(() => {
    if (unref(getIsMixSidebar)) {
      return unref(getCollapsed) && !unref(getMixSideFixed)
        ? unref(getMiniWidthNumber)
        : unref(getMenuWidth);
    }
    return unref(getCollapsed)
      ? unref(getMiniWidthNumber)
      : unref(getMenuWidth);
  });

  const getMiniWidthNumber = computed(() => {
    const { collapsedShowTitle } = menuSetting;
    return collapsedShowTitle
      ? SIDE_BAR_SHOW_TIT_MINI_WIDTH
      : SIDE_BAR_MINI_WIDTH;
  });

  const getCalcContentWidth = computed(() => {
    const width =
      unref(getIsTopMenu) ||
      !unref(getShowMenu) ||
      (unref(getSplit) && unref(getMenuHidden))
        ? 0
        : unref(getIsMixSidebar)
        ? (unref(getCollapsed)
            ? SIDE_BAR_MINI_WIDTH
            : SIDE_BAR_SHOW_TIT_MINI_WIDTH) +
          (unref(getMixSideFixed) && unref(mixSideHasChildren)
            ? unref(getRealWidth)
            : 0)
        : unref(getRealWidth);

    return `calc(100% - ${unref(width)}px)`;
  });

  // Set menu configuration
  function setMenuSetting(menuSetting) {
    store.commit('app/commitProjectConfigState', { menuSetting });
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    });
  }
  return {
    setMenuSetting,

    toggleCollapsed,

    getMenuFixed,
    getRealWidth,
    getMenuType,
    getMenuMode,
    getShowMenu,
    getCollapsed,
    getMiniWidthNumber,
    getCalcContentWidth,
    getMenuWidth,
    getTrigger,
    getSplit,
    getMenuTheme,
    getCanDrag,
    getCollapsedShowTitle,
    getIsHorizontal,
    getIsSidebarType,
    getAccordion,
    getShowTopMenu,
    getShowHeaderTrigger,
    getTopMenuAlign,
    getMenuHidden,
    getIsTopMenu,
    getMenuBgColor,
    getShowSidebar,
    getIsMixMode,
    getIsMixSidebar,
    getCloseMixSidebarOnChange,
    getMixSideTrigger,
    getMixSideFixed,
    mixSideHasChildren,
  };
}
