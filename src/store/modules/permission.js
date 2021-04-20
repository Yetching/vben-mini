import { toRaw } from 'vue';
import store from '/@/store';
import { useI18n } from '../../hooks/web/useI18n';
import { useMessage } from '../../hooks/web/useMessage';
import { asyncRoutes } from '../../router/routes';
import {
  ERROR_LOG_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
} from '../../router/routes/basic';

import {
  transformObjToRoute,
  flatMultiLevelRoutes,
} from '/@/router/helper/routeHelper';
import { transformRouteToMenu } from '/@/router/helper/menuHelper';

import projectSetting from '/@/settings/projectSetting';

import { PermissionModeEnum } from '/@/enums/appEnum';

import filter from '/@/utils/helper/treeHelper';

import { getMenuListById } from '/@/api/sys/menu';
import { getPermCodeByUserId } from '/@/api/sys/user';

const state = () => ({
  permCodeList: [],
  isDynamicAddedRoute: false,
  lastBuildMenuTime: 0,
  backMenuList: [],
});

const getters = {
  getPermCodeList: (state) => {
    return state.permCodeList;
  },
  getBackMenuList: (state) => {
    return state.backMenuList;
  },
  getLastBuildMenuTime: (state) => {
    return state.lastBuildMenuTime;
  },
  getIsDynamicAddedRoute: (state) => {
    return state.isDynamicAddedRoute;
  },
};

const mutations = {
  setPermCodeList(state, codeList) {
    state.permCodeList = codeList;
  },
  setBackMenuList(state, list) {
    state.backMenuList = list;
  },
  setLastBuildMenuTime(state) {
    state.lastBuildMenuTime = new Date().getTime();
  },
  setDynamicAddedRoute(state, added) {
    state.isDynamicAddedRoute = added;
  },
  resetState(state) {
    state.permCodeList = [];
    state.backMenuList = [];
    state.isDynamicAddedRoute = false;
    state.lastBuildMenuTime = 0;
  },
};

const actions = {
  async changePermissionCode({ commit }, userId) {
    const codeList = await getPermCodeByUserId({ userId });
    commit('setPermCodeList', codeList);
  },
  async buildRoutesAction({ state, commit, dispatch }, id) {
    const { t } = useI18n();

    let routes = [];
    const roleList = toRaw(store.getters['user/getRoleListState']);
    const { permissionMode = projectSetting.permissionMode } = store.getters[
      'app/getProjectConfig'
    ];

    //角色 访问模式
    if (permissionMode === PermissionModeEnum.ROLE) {
      const routeFilter = (route) => {
        const { meta } = route;
        const { roles } = meta || {};
        if (!roles) return true;
        return roleList.some((role) => roles.includes(role));
      };
      routes = filter(asyncRoutes, routeFilter);
      routes = routes.filter(routeFilter);
      //多级路由变换为二级路由
      routes = flatMultiLevelRoutes(routes);
      //后台动态权限
    } else if (permissionMode === PermissionModeEnum.BACK) {
      const { createMessage } = useMessage();

      createMessage.loading({
        content: t('sys.app.menuLoading'),
        duration: 1,
      });
      //根据后台路由菜单逻辑修改
      const paramId = id || store.getters['user/getUserInfoState']?.userId;

      //模拟请求后台获取访问，该函数可在实际中用于正确的时机使用一次
      try {
        dispatch('changePermissionCode', '1');
      } catch (e) {}

      if (!paramId) {
        throw new Error('paramId is undefined!!!');
      }

      let routeList = await getMenuListById({ id: paramId });

      //动态引入路由组件
      routeList = transformObjToRoute(routeList);

      //后台路由转化菜单结构
      const backMenuList = transformRouteToMenu(routeList);
      commit('setBackMenuList', backMenuList);

      routeList = flatMultiLevelRoutes(routeList);
      routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];
    }
    routes.push(ERROR_LOG_ROUTE);
    return routes;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
