import { t } from '/@/hooks/web/useI18n';

export const basicRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('/@/views/index.vue'),
    meta: {
      title: t('routes.basic.home'),
    },
  },
];

export const loginRoutes = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};
