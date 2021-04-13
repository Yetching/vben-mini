import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import {viteThemePlugin, mixLighten, mixDarken, tinycolor} from 'vite-plugin-theme'
import {getThemeColors, generateColors} from './build/config/themeConfig.js'
function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteThemePlugin({
      colorVariables: [...getThemeColors(), ...generateColors({mixDarken, mixLighten, tinycolor})]
    })
  ],
  resolve: {
    alias: [
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/',
      },
      {
        find: /\/#\//,
        replacement: pathResolve('types') + '/',
      },
    ],
  },
});
