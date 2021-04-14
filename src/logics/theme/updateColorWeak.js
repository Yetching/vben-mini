import { toggleClass } from './util';

export function updateColorWeak(colorWeak) {
  console.log('是否开启色弱模式:', colorWeak);
  toggleClass(colorWeak, 'color-weak', document.documentElement);
}
