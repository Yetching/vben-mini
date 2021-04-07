const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('/@/views/index.vue'),
    meta: {
      titleL: '透你猴子',
    },
  },
];

export default routes;
