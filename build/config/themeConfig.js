import { generate } from '@ant-design/colors';
<<<<<<< HEAD
=======

>>>>>>> 7b19ffbd13b541c2d1af2119cd02be849e36811e
import { getThemeVariables } from 'ant-design-vue/dist/theme';
// import { resolve } from 'path';

export const primaryColor = '#0960bd';

export const borderColorBase = '#d9d9d9';

export const themeMode = 'light';

export function generateAntColors(color, mode) {
  return generate(color, {
    theme: mode == 'dark' ? 'dark' : 'default',
  });
}

export function getThemeColors(color, theme) {
  const tc = color || primaryColor;
  const tm = theme || themeMode;
  const colors = generateAntColors(tc, tm); //产生十个颜色，五个浅色，五个深色，一个本色
  const primary = colors[5];
  const modeColors = generateAntColors(
    primary,
    tm === 'dark' ? 'light' : 'dark'
  );
  //生成相反模式的颜色

  return [...colors, ...modeColors];
}

export function generateColors({
  color = primaryColor,
  mixLighten,
  mixDarken,
  tinycolor,
}) {
  const arr = new Array(19).fill(0);
  const lightens = arr.map((_t, i) => {
    return mixLighten(color, i / 5);
  });
  const darkens = arr.map((_t, i) => {
    return mixDarken(color, i / 5);
  });
  const alphaColors = arr.map((_t, i) => {
    return tinycolor(color)
      .setAlpha(i / 20)
      .toRgbString();
  });

  const tinycolorLightens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .lighten(i * 5)
        .toHexString();
    })
    .filter((item) => item !== '#ffffff');

  const tinycolorDarkens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .darken(i * 5)
        .toHexString();
    })
    .filter((item) => item !== '#000000');
  return [
    ...lightens,
    ...darkens,
    ...alphaColors,
    ...tinycolorDarkens,
    ...tinycolorLightens,
  ];
}

/**
 * less global variable
 */
export function generateModifyVars(dark = false) {
  const palettes = generateAntColors(primaryColor, themeMode);
  const primary = palettes[5];

  const primaryColorObj = {};

  for (let index = 0; index < 10; index++) {
    primaryColorObj[`primary-${index + 1}`] = palettes[index];
  }

  const modifyVars = getThemeVariables({ dark });

  return {
    ...modifyVars,
    hack: `true;@import (reference) "/src/design/config.less"`,
    'primary-color': primary,
    ...primaryColorObj,
    'info-color': primary,
    'processing-color': primary,
    'success-color': '#55D187', //  Success color
    'error-color': '#ED6F6F', //  False color
    'warning-color': '#EFBD47', //   Warning color
    'disabled-color': 'rgba(0, 0, 0, 0.25)', //  Failure color
    'heading-color': 'rgba(0, 0, 0, 0.85)', //  Title color
    'text-color': 'rgba(0, 0, 0, 0.85)', //  Main text color
    'text-color-secondary': 'rgba(0, 0, 0, 0.45)', // Subtext color
    'font-size-base': '14px', //  Main font size
    'box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)', //  Floating shadow
    'border-color-base': borderColorBase, //  Border color,
    'border-radius-base': '2px', //  Component/float fillet
    'link-color': primary, //   Link color
  };
}
