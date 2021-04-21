import { getParentLayout, LAYOUT } from '/@/router/constant';
import { cloneDeep } from 'lodash-es';
import { warn } from '/@/utils/log';
import { createRouter, createWebHashHistory } from 'vue-router';

const LayoutMap = new Map();

let dynamicViewModules;

function asyncImportRoute(routes) {
  dynamicViewModules =
    dynamicViewModules || import.meta.glob('../../views/**/*.{vue,tsx}');
  if (!routes) return;
  routes.forEach((item) => {
    const { component, name } = item;
    const { children } = item;
    if (component) {
      item.component = dynamicImport(dynamicViewModules, component);
    } else if (name) {
      item.component = getParentLayout();
    }
    children && asyncImportRoute(children);
  });
}

function dynamicImport(dynamicViewModules, component) {
  const keys = Object.keys(dynamicViewModules);
  const matchKeys = keys.filter((key) => {
    let k = key.replace('../../views', '');
    const lastIndex = k.lastIndexOf('.');
    k = k.substring(0, lastIndex);
    return k === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return dynamicViewModules[matchKey];
  }
  if (matchKeys?.length > 1) {
    warn(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure'
    );
    return;
  }
}

export function transformObjToRoute(routeList) {
  LayoutMap.set('LAYOUT', LAYOUT);

  routeList.forEach((route) => {
    if (route.component) {
      if (route.component.toUpperCase() === 'LAYOUT') {
        route.component = LayoutMap.get(route.component.toUpperCase());
      } else {
        route.children = [cloneDeep(route)];
        route.component = LAYOUT;
        route.name = `${route.name}Parent`;
        route.path = '';
        const meta = route.meta || {};
        meta.single = true;
        meta.affix = false;
        route.meta = meta;
      }
    }
    route.children && asyncImportRoute(route.children);
  });
  return routeList;
}

//多级路由变二级路由
export function flatMultiLevelRoutes(routeModules) {
  const modules = cloneDeep(routeModules);
  for (let index = 0; index < modules.length; index++) {
    const routeModule = modules[index];
    if (!isMultipleRoute(routeModule)) {
      continue;
    }
    promoteRouteLevel(routeModule);
  }
  return modules;
}

function promoteRouteLevel(routeModule) {
  let router = createRouter({
    routes: [routeModule],
    history: createWebHashHistory(),
  });

  const routes = router.getRoutes();
  addToChildren(routes, routeModule.children || [], routeModule);
  router = null;

  routeModule.children = routeModule.children?.filter(
    (item) => !item.children?.length
  );
}

function addToChildren(routes, children, routeModule) {
  for (let index = 0; index < children; index++) {
    const child = children[index];
    const route = routes.find((item) => item.name === child.name);
    if (!route) {
      continue;
    }
    routeModule.children = routeModule.children || [];
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children?.push(route);
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule);
    }
  }
}

//判断是否为多级路由 及路由层数大于2
function isMultipleRoute(routeModule) {
  if (
    !routeModule ||
    !Reflect.has(routeModule, 'children') ||
    !routeModule.children?.length
  ) {
    return false;
  }
  const children = routeModule.children;
  let flag = false;
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    if (child.children?.length) {
      flag = true;
      break;
    }
  }
  return flag;
}
