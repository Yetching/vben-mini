import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path';
import {viteThemePlugin, mixLighten, mixDarken, tinycolor} from 'vite-plugin-theme'
import {getThemeColors, generateColors, generateModifyVars} from './build/config/themeConfig.js'

import {createVitePlugins} from './build/vite/plugin/index'

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir);
}

console.log(process.env.NODE_ENV)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    viteThemePlugin({
      colorVariables: [...getThemeColors(), ...generateColors({mixDarken, mixLighten, tinycolor})]
    }),
    ...createVitePlugins(false)

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
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: generateModifyVars(),
        javascriptEnabled: true
      }
    }
  }
});
