import { ThemeEnum } from '/@/enums/appEnum.js';
import { isHexColor, colorIsDark, lighten, darken } from '/@/utils/color.js';

import { setCssVar } from './util.js';
import store from '/@/store';

const HEADER_BG_COLOR_VAR = '--header-bg-color';
const HEADER_BG_HOVER_COLOR_VAR = '--header-bg-hover-color';
const HEADER_MENU_ACTIVE_BG_COLOR_VAR = '--header-active-menu-bg-color';

const SIDER_DARK_BG_COLOR = '--sider-dark-bg-color';
const SIDER_DARK_DARKEN_BG_COLOR = '--sider-dark-darken-bg-color';
const SIDER_LIGHTEN_1_BG_COLOR = '--sider-dark-lighten-1-bg-color';
const SIDER_LIGHTEN_2_BG_COLOR = '--sider-dark-lighten-2-bg-color';

console.log(store);

export function updateHeaderBgColor(color) {
<<<<<<< HEAD
  const darkMode = store.getters['app/getDarkMode'] === 'dark';
=======
  const darkMode = store.getters['app/getDarkMode'] === ThemeEnum.DARK;
>>>>>>> 7b19ffbd13b541c2d1af2119cd02be849e36811e
  if (!isHexColor(color)) {
    if (darkMode) {
      color = '#151515';
    } else {
      color = store.getters['app/getProjectConfig'].headerSetting.bgColor;
    }
  }
  setCssVar(HEADER_BG_COLOR_VAR, color);

  const hoverColor = lighten(color, 6);
  setCssVar(HEADER_BG_HOVER_COLOR_VAR, hoverColor);
  setCssVar(HEADER_MENU_ACTIVE_BG_COLOR_VAR, hoverColor);

  const isDark = colorIsDark(color);

  console.log('是否为暗黑主题:' + isDark);

  store.commit('app/commitProjectConfigState', {
    headerSetting: {
      theme: isDark || darkMode ? ThemeEnum.DARK : ThemeEnum.LIGHT,
    },
  });
}

export function updateSidebarBgColor(color) {
  const darkMode = store.getters['app/getDarkMode'];

  if (!isHexColor(color)) {
    if (darkMode) {
      color = '#212121';
    } else {
      color = store.getters['app/getProjectConfig'].menuSetting.bgColor;
    }
  }

  setCssVar(SIDER_DARK_BG_COLOR, color);
  setCssVar(SIDER_DARK_DARKEN_BG_COLOR, darken(color, 6));
  setCssVar(SIDER_LIGHTEN_1_BG_COLOR, lighten(color, 5));
  setCssVar(SIDER_LIGHTEN_2_BG_COLOR, lighten(color, 8));

  // const isLight = ['#fff', '#ffffff'].includes(color.toLowerCase());

  // console.log('是否为明亮主题:' + isLight);
}
