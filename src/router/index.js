import { createRouter, createWebHashHistory } from 'vue-router';

import routes from './routes';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export default router;
