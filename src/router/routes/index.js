import { t } from '/@/hooks/web/useI18n';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('/@/views/index.vue'),
    meta: {
      title: t('routes.basic.home'),
    },
  },
];

export default routes;
