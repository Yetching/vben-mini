import { toggleClass } from './util';

export function updateGrayMode(gray) {
  console.log('是否开启灰度模式:', gray);
  toggleClass(gray, 'gray-mode', document.documentElement);
}
