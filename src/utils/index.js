import { isObject } from '/@/utils/is.js';

export function deepMerge(src, target) {
  for (let key in target) {
    src[key] = isObject(src[key])
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key]);
  }
  return src;
}
