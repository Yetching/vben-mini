import { configSvgIcons } from './svgSprite';
import { configWindiCss } from './windiCss';
import { configThemePlugin } from './theme';

export function createVitePlugins(isBuild) {
  const vitePlugins = [];

  //svg雪碧图
  vitePlugins.push(configSvgIcons(isBuild));
  //windiCss
  vitePlugins.push(configWindiCss());

  vitePlugins.push(configThemePlugin());

  return vitePlugins;
}
