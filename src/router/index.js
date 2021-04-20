import { createRouter, createWebHashHistory } from 'vue-router';

import { basicRoutes, loginRoute } from './routes';

import { REDIRECT_NAME } from './constant';

const WHITE_NAME_LIST = [loginRoute.name, REDIRECT_NAME];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: basicRoutes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

console.log(router.getRoutes());

export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export function setupRouter(app) {
  app.use(router);
}

export default router;
