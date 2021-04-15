import projectSetting from '/@/settings/projectSetting';
import { Persistent } from '/@/utils/cache/persistent';
import { deepMerge } from '/@/utils';

import { PROJ_CFG_KEY } from '/@/enums/cacheEnum.js';
import { primaryColor } from '../../build/config/themeConfig.js';
import { getCommonStoragePrefix, getStorageShortName } from '/@/utils/env.js';
import store from '/@/store';

import {
  updateHeaderBgColor,
  updateSidebarBgColor,
} from '/@/logics/theme/updateBackground.js';
import { updateColorWeak } from '/@/logics/theme/updateColorWeak';
import { updateGrayMode } from '/@/logics/theme/updateGrayMode';

import { changeTheme } from '/@/logics/theme';

export function initAppConfigStore() {
  let projCfg = Persistent.getLocal(PROJ_CFG_KEY);
  console.log(projCfg);
  projCfg = deepMerge(projectSetting, projCfg || {});

  try {
    const {
      colorWeak,
      grayMode,
      themeColor,
      headerSetting: { bgColor: headerBgColor } = {},
      menuSetting: { bgColor } = {},
    } = projCfg;
    console.log(themeColor);
    if (themeColor && themeColor == !primaryColor) {
      console.log(8888888888);
      changeTheme(themeColor);
    }
    headerBgColor && updateHeaderBgColor(headerBgColor);
    bgColor && updateSidebarBgColor(bgColor);
    grayMode && updateGrayMode(grayMode);
    colorWeak && updateColorWeak(colorWeak);
  } catch (error) {
    console.log(error);
  }
  store.commit('app/commitProjectConfigState', projCfg);
  store.dispatch('locale/initLocale');

  setTimeout(() => {
    clearObsoleteStorage();
  }, 16);
}

//清除过时的storage  版本迭代
export function clearObsoleteStorage() {
  const commonPrefix = getCommonStoragePrefix();
  const shortPrefix = getStorageShortName();
  console.log(commonPrefix, shortPrefix);

  [localStorage, sessionStorage].forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key);
      }
    });
  });
}
