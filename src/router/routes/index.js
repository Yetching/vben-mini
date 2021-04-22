import { t } from '/@/hooks/web/useI18n';
import { PageEnum } from '/@/enums/pageEnum';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE, ERROR_LOG_ROUTE } from './basic';

import { mainOutRoutes } from './mainOut';

const modules = import.meta.globEager('./modules/**/*.js');

console.log(modules);

const routeModuleList = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

console.log(routeModuleList);

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const rootRoute = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const loginRoute = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};

export const basicRoutes = [
  loginRoute,
  rootRoute,
  ...mainOutRoutes,
  REDIRECT_ROUTE,
  ERROR_LOG_ROUTE,
];
