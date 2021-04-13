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

import { changeTheme } from '/@/logics/theme';

export function initAppConfigStore() {
  let projCfg = Persistent.getLocal(PROJ_CFG_KEY);
  console.log(projCfg);
  projCfg = deepMerge(projectSetting, projCfg || {});
  updateHeaderBgColor('#000');
  console.log(projectSetting);

  try {
    const {
      colorWeak,
      hrayMode,
      themeColor,
      headerSetting: { bgColor: headerBgColor } = {},
      menuSettingg: { bgColor } = {},
    } = projCfg;
    if (themeColor && themeColor !== primaryColor) {
      console.log(8888888888);
      changeTheme(themeColor);
    }
  } catch {}
}
