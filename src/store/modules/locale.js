import { LOCALE_KEY } from '/@/enums/cacheEnum';

import { createLocalStorage } from '/@/utils/cache/index.js';
import { localeSetting } from '/@/settings/localeSetting';

const ls = createLocalStorage();

const isSetting = ls.get(LOCALE_KEY) || localeSetting;

const state = () => ({
  info: isSetting,
});

const getters = {
  getShowPicker: (state) => {
    return !!state.info?.showPicker;
  },
  getLocale: (state) => {
    return state.info?.locale;
  },
};

const mutations = {
  setLocaleInfo(state, info) {
    state.info = { ...state.info, ...info };
    ls.set(LOCALE_KEY, state.info);
  },
};

const actions = {
  initLocale({ commit, state }) {
    console.log('locale');
    commit('setLocaleInfo', {
      ...localeSetting,
      ...state.info,
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
