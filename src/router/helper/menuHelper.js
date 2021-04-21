import { findPath, treeMap } from '/@/utils/helper/treeHelper';
import { cloneDeep, join } from 'lodash-es';
import { isUrl } from '/@/utils/is';

export function getAllParentPath(treeData, path) {
  const menuList = findPath(treeData, (n) => n.path === path);
  return (menuList || []).map((item) => item.path);
}

function joinParentPath(menus, parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index];
    //以/开头的嵌套路径将会视为根路径
    //这样你就可以使用路由嵌套而不必使用URL嵌套

    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      menu.path = `${parentPath}/${menu.path}`;
    }
    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.path);
    }
  }
}

//解析菜单模块
export function transformMenuModule(menuModule) {
  const { menu } = menuModule;
  const menuList = [menu];

  joinParentPath(menuList);
  return menuList[0];
}

export function transformRouteToMenu(routeModList) {
  const cloneRouteModList = cloneDeep(routeModList);
  const routeList = [];

  cloneRouteModList.forEach((item) => {
    if (item.meta?.single) {
      const realItem = item?.children?.[0];
      realItem && routeList.push(realItem);
    } else {
      routeList.push(item);
    }
  });

  const list = treeMap(routeList, {
    conversion: (node) => {
      const { meta: { title, hideMenu = false } = {} } = node;

      return {
        ...(node.meta || {}),
        meta: node.meta,
        name: title,
        hideMenu,
        path: node.path,
      };
    },
  });
  joinParentPath(list);
  return cloneDeep(list);
}
