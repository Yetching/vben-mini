import router from '/@/router';

import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
import { PageEnum } from '/@/enums/pageEnum';
// import { RoleEnum } from '/@/enums//roleEnum';

import { useMessage } from '/@/hooks/web/useMessage';

import { loginApi, getUserInfoById } from '/@/api/sys/user';
import { useI18n } from '/@/hooks/web/useI18n';
import { getAuthCache, setAuthCache } from '/@/utils/auth/index';

const state = () => ({
  userInfoState: null,
  tokenState: '',
  roleListState: [],
});

const getters = {
  getUserInfoState: (state) => {
    return state.userInfoState || getAuthCache(USER_INFO_KEY) || {};
  },
  getTokenState: (state) => {
    return state.tokenState || getAuthCache(TOKEN_KEY);
  },
  getRoleListState: (state) => {
    return state.roleListState.length > 0
      ? state.roleListState
      : getAuthCache(ROLES_KEY);
  },
};

const mutations = {
  commitResetState(state) {
    (state.userInfoState = null),
      (state.tokenState = ''),
      (state.roleListState = []);
  },
  commitUserInfoState(state, info) {
    state.userInfoState = info;
    setAuthCache(USER_INFO_KEY, info);
  },
  commitRoleListState(state, roleList) {
    state.roleListState = roleList;
    setAuthCache(ROLES_KEY, roleList);
  },
  commitTokenState(state, info) {
    state.tokenState = info;
    setAuthCache(TOKEN_KEY, info);
  },
};

const actions = {
  async login({ commit, dispatch }, params) {
    try {
      const { goHome = true, mode, ...loginParams } = params;
      const data = await loginApi(loginParams, mode);

      const { token, userId } = data;

      //保存token
      commit('commitTokenState', token);
      //获取用户信息
      const userInfo = await dispatch('getUserInfoAction', { userId });

      goHome && (await router.replace(PageEnum.BASE_HOME));
      return userInfo;
    } catch (error) {
      return null;
    }
  },

  async getUserInfoAction({ commit }, { userId }) {
    const userInfo = await getUserInfoById({ userId });
    const { roles } = userInfo;
    const roleList = roles.map((item) => item.value);
    commit('commitUserInfoState', userInfo);
    commit('commitRoleListState', roleList);
    return userInfo;
  },

  async logout(goLogin = false) {
    goLogin && router.push(PageEnum.BASE_LOGIN);
  },

  async confirmLoginOut({ dispatch }) {
    const { createConfirm } = useMessage();
    const { t } = useI18n();
    createConfirm({
      iconType: 'warning',
      title: t('sys.app.logoutTip'),
      content: t('sys.app.logoutMessage'),
      onOk: async () => {
        await dispatch('logout', true);
      },
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
