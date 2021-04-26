import { configSvgIcons } from './svgSprite';

export function createVitePlugins(isBuild) {
  const vitePlugins = [];

  //svg雪碧图
  vitePlugins.push(configSvgIcons(isBuild));

  return vitePlugins;
}
