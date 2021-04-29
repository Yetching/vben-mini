import { configSvgIcons } from './svgSprite';
import { configWindiCss } from './windiCss';

export function createVitePlugins(isBuild) {
  const vitePlugins = [];

  //svg雪碧图
  vitePlugins.push(configSvgIcons(isBuild));
  //windiCss
  vitePlugins.push(configWindiCss());
  return vitePlugins;
}
