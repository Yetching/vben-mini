import store from '/@/store';
import {
  updateSidebarBgColor,
  updateHeaderBgColor,
} from '/@/logics/theme/updateBackground';
import { updateColorWeak } from '/@/logics/theme/updateColorWeak';
import { updateGrayMode } from '/@/logics/theme/updateGrayMode';

import { changeTheme } from '/@/logics/theme';
import { updateDarkTheme } from '/@/logics/theme/dark';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';

import { HandlerEnum } from './enum';

export function baseHandler(event, value) {
  const config = handler(event, value);
  store.commit('app/commitProjectConfigState', config);
  if (event === HandlerEnum.CHANGE_THEME) {
    updateHeaderBgColor();
    updateSidebarBgColor();
  }
}

export function handler(event, value) {
  const { getThemeColor, getDarkMode } = useRootSetting();
  switch (event) {
    case HandlerEnum.CHANGE_LAYOUT:
      const { mode, type, split } = value;
      const splitOpt = split === undefined ? { split } : {};

      return {
        menuSetting: {
          mode,
          type,
          collapsed: false,
          show: true,
          hidden: false,
          ...splitOpt,
        },
      };
    case HandlerEnum.CHANGE_THEME:
      if (getDarkMode.value === value) {
        return {};
      }
      updateDarkTheme(value);

      return {};
  }
}
