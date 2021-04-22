import router from '/@/router';

import { createPermissonGuard } from './permissionGuard';

export function setupRouterGuard() {
  createPermissonGuard(router);
}
