import { PageEnum } from '/@/enums/pageEnum';

import store from '/@/store';

import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';

const LOGIN_PATH = PageEnum.BASE_LOGIN;

const whitePathList = [LOGIN_PATH];

export function createPermissonGuard(router) {
  console.log(router);
  router.beforeEach(async (to, from, next) => {
    console.log(to);
    //404
    if (from.path === LOGIN_PATH && to.name === PAGE_NOT_FOUND_ROUTE.name) {
      console.log(1111111);
      next(PageEnum.BASE_HOME);
      return;
    }
    // 白名单直接访问
    if (whitePathList.includes(to.path)) {
      console.log(111111);
      next();
      return;
    }
    const token = store.getters['user/getTokenState'];

    if (!token) {
      if (to.meta.ignoreAuth) {
        next();
        return;
      }
      const redirectData = {
        path: LOGIN_PATH,
        replace: true,
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        };
      }
      next(redirectData);
      return;
    }
    if (store.getters['permission/getIsDynamicAddedRoute']) {
      next();
      return;
    }

    const routes = await store.dispatch('permission/buildRoutesAction');
    routes.forEach((route) => {
      router.addRoute(route);
    });

    const redirectPath = from.query.redirect || to.path;
    const redirect = decodeURIComponent(redirectPath);
    const nextData =
      to.path === redirect ? { ...to, replace: true } : { path: redirect };
    store.commit('permission/setDynamicAddedRoute', true);
    next(nextData);
  });
}
