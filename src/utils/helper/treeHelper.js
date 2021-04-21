const DEFAULT_CONFIG = {
  id: 'id',
  children: 'children',
  pid: 'pid',
};

const getConfig = (config) => Object.assign({}, DEFAULT_CONFIG, config);

export function filter(tree, func, config = {}) {
  config = getConfig(config);
  const children = config.children;
  function listFilter(list) {
    return list
      .map((node) => ({ ...node }))
      .filter((node) => {
        node[children] = node[children] && listFilter(node[children]);
        return func(node) || (node[children] && node[children].length);
      });
  }
  return listFilter(tree);
}

export function findPath(tree, func, config) {
  config = getConfig(config);
  const path = [];
  const list = [...tree];
  const visitedSet = new Set();
  const { children } = config;
  while (list.length) {
    const node = list[0];
    if (visitedSet.has(node)) {
      path.pop();
      list.shift();
    } else {
      visitedSet.add(node);
      node[children] && list.unshift(...node[children]);
      path.push(node);
      if (func(node)) {
        return path;
      }
    }
  }
  return null;
}

export function treeMap(treeData, opt) {
  return treeData.map((item) => treeMapEach(item, opt));
}

/**
 * @description: Extract tree specified structure
 */
export function treeMapEach(data, { children = 'children', conversion }) {
  const haveChildren =
    Array.isArray(data[children]) && data[children].length > 0;
  const conversionData = conversion(data) || {};
  if (haveChildren) {
    return {
      ...conversionData,
      [children]: data[children].map((i) =>
        treeMapEach(i, {
          children,
          conversion,
        })
      ),
    };
  } else {
    return {
      ...conversionData,
    };
  }
}
