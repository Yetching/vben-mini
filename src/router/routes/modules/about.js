import { LAYOUT } from '../../constant';
import { t } from '/@/hooks/web/useI18n';

const about = {
  path: '/about',
  name: 'About',
  component: LAYOUT,
  redirect: '/about/index',
  meta: {
    title: t('routes.dashboard.about'),
  },
  children: [
    {
      path: 'index',
      name: 'AboutPage',
      component: () => import('/@/views/sys/about/index.vue'),
      meta: {
        title: t('routes.dashboard.about'),
      },
    },
  ],
};

export default about;
