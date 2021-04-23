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
  const menuSetting = store.getters['app/getProjectConfig'].menuSetting;

  const getShowSidebar = computed(() => {
    return (
      unref(getSplit) ||
      (unref(getShowMenu) &&
        unref(getMenuMode) !== MenuModeEnum.HORIZONTAL &&
        !unref(fullContent))
    );
  });

  const getCollapsed = computed(() => menuSetting.collapsed);

  const getMenuType = computed(() => menuSetting.type);

  const getMenuMode = computed(() => menuSetting.mode);

  const getMenuFixed = computed(() => menuSetting.fixed);

  const getShowMenu = computed(() => menuSetting.show);

  const getMenuHidden = computed(() => menuSetting.hidden);

  const getMenuWidth = computed(() => menuSetting.menuWidth);

  const getTrigger = computed(() => menuSetting.trigger);

  const getMenuTheme = computed(() => menuSetting.theme);

  const getSplit = computed(() => menuSetting.split);

  const getMenuBgColor = computed(() => menuSetting.bgColor);

  const getMixSideTrigger = computed(() => menuSetting.mixSideTrigger);

  const getCanDrag = computed(() => menuSetting.canDrag);

  const getAccordion = computed(() => menuSetting.accordion);

  const getMixSideFixed = computed(() => menuSetting.mixSideFixed);

  const getTopMenuAlign = computed(() => menuSetting.topMenuAlign);

  const getCloseMixSidebarOnChange = computed(
    () => menuSetting.closeMixSidebarOnChange
  );

  const getIsSidebarType = computed(
    () => unref(getMenuType) === MenuTypeEnum.SIDEBAR
  );

  const getIsTopMenu = computed(
    () => unref(getMenuType) === MenuTypeEnum.TOP_MENU
  );

  const getCollapsedShowTitle = computed(() => menuSetting.collapsedShowTitle);

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
