import { computed, unref } from 'vue';

import store from '/@/store';

import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { useFullContent } from '/@/hooks/web/useFullContent';
import { MenuModeEnum } from '/@/enums/menuEnum';

export function useHeaderSetting() {
  const { getFullContent } = useFullContent();

  const headerSetting = store.getters['app/getProjectConfig'].headerSetting;

  console.log(headerSetting);

  const getShowFullHeaderRef = computed(() => {
    return (
      !unref(getFullContent) &&
      unref(getShowMixHeaderRef) &&
      unref(getShowHeader) &&
      !unref(getIsTopMenu) &&
      !unref(getIsMixSidebar)
    );
  });

  const getUnFixedAndFull = computed(
    () => !unref(getFixed) && !unref(getShowFullHeaderRef)
  );

  const getShowInsetHeaderRef = computed(() => {
    const need = !unref(getFullContent) && unref(getShowHeader);
    return (
      (need && !unref(getShowMixHeaderRef)) ||
      (need && unref(getIsTopMenu)) ||
      (need && unref(getIsMixSidebar))
    );
  });

  const {
    getMenuMode,
    getSplit,
    getShowHeaderTrigger,
    getIsSidebarType,
    getIsMixSidebar,
    getIsTopMenu,
  } = useMenuSetting();
  const { getShowBreadCrumb, getShowLogo } = useRootSetting();

  const getShowMixHeaderRef = computed(
    () => !unref(getIsSidebarType) && unref(getShowHeader)
  );

  const getShowDoc = computed(() => headerSetting.showDoc);

  const getHeaderTheme = computed(() => headerSetting.theme);

  const getShowHeader = computed(() => headerSetting.show);

  const getFixed = computed(() => headerSetting.fixed);

  const getHeaderBgColor = computed(() => headerSetting.bgColor);

  const getShowSearch = computed(() => headerSetting.showSearch);

  const getUseLockPage = computed(() => headerSetting.useLockPage);

  const getShowFullScreen = computed(() => headerSetting.showFullScreen);

  const getShowNotice = computed(() => headerSetting.showNotice);

  const getShowBread = computed(() => {
    return (
      unref(getMenuMode) !== MenuModeEnum.HORIZONTAL &&
      unref(getShowBreadCrumb) &&
      !unref(getSplit)
    );
  });

  const getShowHeaderLogo = computed(() => {
    return (
      unref(getShowLogo) && !unref(getIsSidebarType) && !unref(getIsMixSidebar)
    );
  });

  const getShowContent = computed(() => {
    return unref(getShowBread) || unref(getShowHeaderTrigger);
  });

  // Set header configuration
  function setHeaderSetting(headerSetting) {
    store.commit('app/commitProjectConfigState', { headerSetting });
  }
  return {
    setHeaderSetting,

    getShowDoc,
    getShowSearch,
    getHeaderTheme,
    getUseLockPage,
    getShowFullScreen,
    getShowNotice,
    getShowBread,
    getShowContent,
    getShowHeaderLogo,
    getShowHeader,
    getFixed,
    getShowMixHeaderRef,
    getShowFullHeaderRef,
    getShowInsetHeaderRef,
    getUnFixedAndFull,
    getHeaderBgColor,
  };
}
