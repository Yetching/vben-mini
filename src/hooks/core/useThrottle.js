import { debounce, once } from 'lodash';
import { isFunction } from '/@/utils/is';

// immediate: Boolean; //立即执行
// debounce: Boolean; //是否为debounce
// once: Boolean; //只执行一次

export function throttle(handle, wait, options = {}) {
  if (!isFunction(handle)) {
    throw new Error('handle is not Function!!!');
  }
  let { immediate = false } = options;
  const { once = false, debounce = false } = options;
  let timeoutId;
  let cancelled = false;

  function clearTimer() {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

  function cancel() {
    clearTimer();
    cancelled = true;
  }

  function cancelExec() {
    once && cancel();
  }

  function fn(th, ...args) {
    if (cancelled) {
      return;
    }
    const exec = () => {
      !debounce && clearTimer();
      handle.apply(th, args);
      cancelExec();
    };
    if (immediate) {
      immediate = false;
      const callNow = !timeoutId;
      if (callNow) {
        exec();
        timeoutId = null;
      }
    } else {
      debounce && clearTimer();
      if (!timeoutId || debounce) {
        timeoutId = setTimeout(exec, wait);
      }
    }
  }
  return [fn, cancel];
}

export function useThrottle(handle, wait, options = {}) {
  return throttle(handle, wait, options);
}
