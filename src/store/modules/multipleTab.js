import { toRaw, unref } from 'vue';
import { useGo, useRedo } from '/@/hooks/web/usePage';

import { Persistent } from '/@/utils/cache/persistent';

import { PageEnum } from '/@/enums/pageEnum';
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic';
import { getRawRoute } from '/@/utils';
import { MULTIPLE_TABS_KEY } from '/@/enums/cacheEnum';
import projectSetting from '/@/settings/projectSetting';

function handleGotoPage(router) {
  const go = useGo(router);
  go(unref(router.currentRoute).path, true);
}

const cacheTab = projectSetting.multiTabsSetting.cache;

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
  resetState({ state, commit }) {
    state.tabList = [];
    commit('clearCacheTabs');
  },
};

const actions = {
  //根据当前打开的选项卡更新缓存
  async updateCacheTab({ state }) {
    const cacheMap = new Set();

    for (const tab of state.tabList) {
      const item = getRawRoute(tab);
      //忽略缓存
      const needCache = !item.meta?.ignoreKeepAlive;
      if (!needCache) {
        return;
      }
      const name = item.name;
      cacheMap.add(name);
    }
    state.cacheTabList = cacheMap;
  },

  //刷新选项页
  async refreshPage({ state, getters }, router) {
    const { currentRoute } = router;
    const route = unref(currentRoute);
    const name = route.name;

    const findTab = getters['getCacheTabList'].find((item) => item === name);

    if (findTab) {
      state.cacheTabList.delete(findTab);
    }

    const redo = useRedo(router);
    await redo();
  },

  goToPage({ state }, router) {
    const go = useGo(router);
    const len = state.tabList.length;
    const { path } = unref(router.currentRoute);

    let toPath = PageEnum.BASE_HOME;

    if (len > 0) {
      const page = state.tabList[len - 1];
      const p = page.fullPath || page.path;
      if (p) {
        toPath = p;
      }
    }

    path !== toPath && go(toPath, true);
  },

  async addTab({ state, dispatch }, route) {
    const { path, name, fullPath, params, query } = getRawRoute(route);
    //404不需要
    if (
      path === PageEnum.ERROR_PAGE ||
      !name ||
      [REDIRECT_ROUTE.name, PAGE_NOT_FOUND_ROUTE.name].includes(name)
    ) {
      return;
    }

    let updateIndex = -1;
    //现有页面，不再添加重复选项卡
    const tabHasExits = state.tabList.some((tab, index) => {
      updateIndex = index;
      return (tab.fullPath || tab.path) === (fullPath || path);
    });

    //如果页面已存在，执行更新操作
    if (tabHasExits) {
      const curTab = toRaw(state.tabList)[updateIndex];
      if (!curTab) {
        return;
      }

      curTab.params = params || curTab.params;
      curTab.query = query || curTab.query;
      curTab.fullPath = fullPath || curTab.fullPath;
      state.tabList.splice(updateIndex, 1, curTab);
      return;
    }

    //添加选项卡
    state.tabList.push(route);
    dispatch('updateCacheTab');
    cacheTab && Persistent.setLocal(MULTIPLE_TABS_KEY, state.tabList);
  },

  async closeTab({ state }, tab, router) {
    const getToTarget = (tabItem) => {
      const { params, path, query } = tabItem;
      return {
        params: params || {},
        path,
        query: query || {},
      };
    };

    const close = (route) => {
      const { fullPath, meta: { affix } = {} } = route;
      if (affix) {
        return;
      }
      const index = state.tabList.findIndex(
        (item) => item.fullPath === fullPath
      );
      index !== -1 && state.tabList.splice(index, 1);
    };

    const { currentRoute, replace } = router;

    const { path } = unref(currentRoute);
    if (path !== tab.path) {
      //关闭的不是激活选项卡
      close(tab);
      return;
    }

    //关闭激活选项卡
    let toTarget = {};

    const index = state.tabList.findIndex((item) => item.path === path);

    //如果当前为最左边选项卡
    if (index === 0) {
      //只有一个选项卡跳转至主页，否则跳转至右边选项卡
      if (state.tabList.length === 1) {
        toTarget = PageEnum.BASE_HOME;
      } else {
        const page = state.tabList[index + 1];
        toTarget = getToTarget(page);
      }
    } else {
      //关闭当前选项卡
      const page = state.tabList[index - 1];
      toTarget = getToTarget(page);
    }
    close(currentRoute.value);
    replace(toTarget);
  },

  //根据key关闭

  async closeTabByKey({ state, dispatch }, key, router) {
    const index = state.tabList.findIndex(
      (item) => (item.fullPath || item.path) === key
    );
    index !== -1 && dispatch('closeTab', state.tabList[index], router);
  },

  //排序选项卡

  async sortTabs({ state }, oldIndex, newIndex) {
    const currentTab = state.tabList[oldIndex];
    state.tabList.splice(oldIndex, 1);
    state.tabList.splice(newIndex, 0, currentTab);
    state.lastDragEndIndex = state.lastDragEndIndex + 1;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
