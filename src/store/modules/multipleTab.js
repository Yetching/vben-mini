import { toRaw, unref } from 'vue';
import { useGo, useRedo } from '/@/hooks/web/usePage';

import { Persistent } from '/@/utils/cache/persistent';

import { PageEnum } from '/@/enums/pageEnum';

function handleGotoPage(router) {
  const go = useGo(router);
  go(unref(router.currentRoute).path, true);
}

const cacheTab = projectSetting.multiTabSetting.cache;

const state = () => ({
  cacheTabList: new Set(),
  tabList: cacheTab ? Persistent.getLocal(MULTIPLE_TABS_KEY) || [] : [],
  lastDragEndIndex: 0,
});

const getters = {
  getTabList(state) {
    return state.tabList;
  },
  getCachedTabList(state) {
    return Array.from(state.cacheTabList);
  },
  getLastDragEndIndex(state) {
    return state.lastDragEndIndex;
  },
};

const mutations = {
  clearCacheTabs(state) {
    state.cacheTabList = new Set();
  },
};
