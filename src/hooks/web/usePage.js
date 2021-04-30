import { isString } from '/@/utils/is';
import { unref } from 'vue';

import { useRouter } from 'vue-router';
import { PageEnum } from '../../enums/pageEnum';

function handleError(e) {
  console.error(e);
}

// 页面切换
export function useGo(_router) {
  let router;
  if (!_router) {
    router = useRouter();
  }

  const { push, replace } = _router || router;
  function go(opt = PageEnum.BASE_HOME, isReplace = false) {
    if (!opt) {
      return;
    }
    if (isString(opt)) {
      isReplace
        ? replace(opt).catch(handleError)
        : push(opt).catch(handleError);
    } else {
      const o = opt;
      isReplace ? replace(o).catch(handleError) : push(o).catch(handleError);
    }
  }
  return go;
}

// 刷新页面
export function useRedo(_router) {
  let router;
  if (!_router) {
    router = useRouter();
  }
  const { push, currentRoute } = _router || router;
  const { query, params } = currentRoute.value;
  function redo() {
    return new Promise((resolve) => {
      push({
        path: '/redirect' + unref(currentRoute).fullPath,
        query,
        params,
      }).then(() => resolve(true));
    });
  }
  return redo;
}
