import viteSvgIcons from 'vite-plugin-svg-icons';
import path from 'path';

export function configSvgIcons(isBuild) {
  const svgIconsPlugin = viteSvgIcons({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    symbolId: 'icon-[dir]-[name]',
    //svg压缩配置 默认true
    svgoOptions: isBuild,
  });
  return svgIconsPlugin;
}
