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
