import { computed, unref } from 'vue';

import store from '/@/store';
import { ContentEnum } from '/@/enums/appEnum';

const getRootSetting = computed(() => store.getters['app/getProjectConfig']);

console.log(9999, getRootSetting.value === unref(getRootSetting));
const getPageLoading = computed(() => store.getters['app/getPageLoading']);

const getOpenKeepAlive = computed(() => unref(getRootSetting).openKeepAlive);

const getSettingButtonPosition = computed(
  () => unref(getRootSetting).settingButtonPosition
);

const getCanEmbedIFramePage = computed(
  () => unref(getRootSetting).canEmbedIFramePage
);

const getPermissionMode = computed(() => unref(getRootSetting).permissionMode);

const getShowLogo = computed(() => unref(getRootSetting).showLogo);

const getContentMode = computed(() => unref(getRootSetting).contentMode);

const getUseOpenBackTop = computed(() => unref(getRootSetting).useOpenBackTop);

const getShowSettingButton = computed(
  () => unref(getRootSetting).showSettingButton
);

const getUseErrorHandle = computed(() => unref(getRootSetting).useErrorHandle);

const getShowFooter = computed(() => unref(getRootSetting).showFooter);

const getShowBreadCrumb = computed(() => unref(getRootSetting).showBreadCrumb);

const getThemeColor = computed(() => unref(getRootSetting).themeColor);

const getShowBreadCrumbIcon = computed(
  () => unref(getRootSetting).showBreadCrumbIcon
);

const getFullContent = computed(() => unref(getRootSetting).fullContent);

const getColorWeak = computed(() => unref(getRootSetting).colorWeak);

const getGrayMode = computed(() => unref(getRootSetting).grayMode);

const getLockTime = computed(() => unref(getRootSetting).lockTime);

const getDarkMode = computed(() => unref(store.getters['app/getDarkMode']));

const getLayoutContentMode = computed(() =>
  unref(getRootSetting).contentType === ContentEnum.FULL
    ? ContentEnum.FULL
    : ContentEnum.FIXED
);

function setRootSetting(setting) {
  store.commit('app/commitProjectConfigState', setting);
}

function setDarkMode(mode) {
  store.commit('app/setDarkMode', mode);
}

export function useRootSetting() {
  return {
    setRootSetting,
    setDarkMode,
    getDarkMode,
    getSettingButtonPosition,
    getFullContent,
    getColorWeak,
    getGrayMode,
    getRootSetting,
    getLayoutContentMode,
    getPageLoading,
    getOpenKeepAlive,
    getCanEmbedIFramePage,
    getPermissionMode,
    getShowLogo,
    getUseErrorHandle,
    getShowBreadCrumb,
    getShowBreadCrumbIcon,
    getUseOpenBackTop,
    getShowSettingButton,
    getShowFooter,
    getContentMode,
    getLockTime,
    getThemeColor,
  };
}
