import { computed, onUnmounted, unref, watchEffect } from 'vue';
import { useThrottle } from '/@/hooks/core/useThrottle'; //防抖

import store from '/@/store';
import { useRootSetting } from '../setting/useRootSetting';

export function useLockPage() {
  const { getLockTime } = useRootSetting();
  let timeId;

  function clear() {
    window.clearTimeout(timeId);
  }

  function resetCalcLockTimeout() {
    // not login
    if (!store.getters['user/getTokenState']) {
      clear();
      return;
    }
    const lockTime = store.getters['app/getProjectConfig'].lockTime;
    if (!lockTime || lockTime < 1) {
      clear();
      return;
    }
    clear();

    timeId = setTimeout(() => {
      lockPage();
    }, lockTime * 60 * 1000);
  }

  function lockPage() {
    store.commit('lock/commitLockInfoState', {
      isLock: true,
      pwd: undefined,
    });
  }

  watchEffect((onClean) => {
    if (store.getters['user/getTokenState']) {
      resetCalcLockTimeout();
    } else {
      clear();
    }
    onClean(() => {
      clear();
    });
  });

  onUnmounted(() => {
    clear();
  });

  const [keyupFn] = useThrottle(resetCalcLockTimeout, 2000);

  return computed(() => {
    if (unref(getLockTime)) {
      return { onKeyup: keyupFn, onMousemove: keyupFn };
    } else {
      clear();
      return {};
    }
  });
}
