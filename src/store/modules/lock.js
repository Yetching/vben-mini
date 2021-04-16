import { LOCK_INFO_KEY } from '/@/enums/cacheEnum';

import { Persistent } from '/@/utils/cache/persistent';

import store from '/@/store';

const state = () => ({
  lockInfoState: Persistent.getLocal(LOCK_INFO_KEY),
});

const getters = {
  getLockInfo: (state) => {
    return state.lockInfoState || {};
  },
};

const mutations = {
  commitLockInfoState(state, info) {
    state.lockInfoState = Object.assign({}, state.lockInfoState, info);
    Persistent.setLocal(LOCK_INFO_KEY, state.lockInfoState);
  },
  resetLockInfo(state) {
    Persistent.removeLocal(LOCK_INFO_KEY);
    state.lockInfoState = null;
  },
};

const actions = {
  async unLockAction({ commit, state, getters }, { password }) {
    const tryLogin = async () => {
      try {
        const username = store.getters['user/getUserInfoState'].username;
        const res = await store.dispacth('user/login', {
          username,
          password,
          goHome: false,
          mode: 'none',
        });
        if (res) {
          commit('resetLockInfo');
        }
        return res;
      } catch (error) {
        return false;
      }
    };
    if (getters['getLockInfo']?.pwd === password) {
      commit('resetLockInfo');
      return true;
    }
    return await tryLogin();
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
