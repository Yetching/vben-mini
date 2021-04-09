const state = () => ({
  pageLoadingState: false,
  projectConfigState: {},
  lockMainScrollState: false,
  beforeMiniState: {},
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
  commitProjectConfig(state, proCfg) {
    // state.projectConfigState = deepMerge(
    //   state.projectConfigState || {},
    //   proCfg
    // );
    // Persistent.setLocal(PROJ_CFG_KEY, state.projectConfigState);
    console.log(proCfg);
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
