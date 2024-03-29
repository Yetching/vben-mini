import {
  getThemeColors,
  generateColors,
} from '../../../build/config/themeConfig';

import { replaceStyleVariables } from 'vite-plugin-theme/es/client';
import {
  mixLighten,
  mixDarken,
  tinycolor,
} from 'vite-plugin-theme/es/colorUtils';

export async function changeTheme(color, theme) {
  const colors = generateColors({
    mixDarken,
    mixLighten,
    tinycolor,
    color,
  });
  console.log([...getThemeColors(color, theme), ...colors]);
  return await replaceStyleVariables({
    colorVariables: [...getThemeColors(color, theme), ...colors],
  });
}
