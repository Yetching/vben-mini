import { APP_DARK_MODE_KEY, PROJ_CFG_KEY } from '/@/enums/cacheEnum.js';
import { Persistent } from '/@/utils/cache/persistent.js';
import { deepMerge } from '/@/utils';
import { darkMode } from '/@/settings/designSetting';

const state = () => ({
  pageLoadingState: false,
  projectConfigState: {},
  lockMainScrollState: false,
  beforeMiniState: {},
  darkMode: undefined,
});

const getters = {
  getPageLoading: (state) => {
    return state.pageLoadingState;
  },
  getBeforeMiniState: (state) => {
    return state.beforeMiniState;
  },
  getLockMainScrollState: (state) => {
    return state.lockMainScrollState;
  },
  getProjectConfig: (state) => {
    return state.projectConfigState;
  },
  getDarkMode: (state) => {
    return (
      state.darkMode || localStorage.getItem(APP_DARK_MODE_KEY) || darkMode
    );
  },
};

const mutations = {
  commitPageLoadingState(state, loading) {
    state.pageLoadingState = loading;
  },
  commitBeforeMiniState(state, miniState) {
    state.beforeMiniState = miniState;
  },
  commitLockMainScrollState(state, lock) {
    state.lockMainScrollState = lock;
  },
  commitProjectConfigState(state, proCfg) {
    state.projectConfigState = deepMerge(
      state.projectConfigState || {},
      proCfg
    );
    Persistent.setLocal(PROJ_CFG_KEY, state.projectConfigState);
    console.log(state.projectConfigState);
  },
  setDarkMode(state, mode) {
    state.darkMode = mode;
    localStorage.setItem(APP_DARK_MODE_KEY, mode);
  },
};

const actions = {
  async resumeAllState() {
    resetRouter();
    Persistent.clearAll();
  },
  async setPageLoadingAction({ commit }, loading) {
    if (loading) {
      clearTimeout(timeId);
      timeId = setTimeout(() => {
        commit('commitPageLoadingState', loading);
      }, 50);
    } else {
      commit('commitPageLoadingState', loading);
      clearTimeout(timeId);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
