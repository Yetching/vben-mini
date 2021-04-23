export function isDef(val) {
  return typeof val !== 'undefined';
}

export function is(val, type) {
  return toString.call(val) === `[object ${type}]`;
  //tooString为对象的方法  不是数组等的方法
}

export function isUnDef(val) {
  return !isDef(val);
}

export function isNull(val) {
  return val === null;
}

export function isNullOrUnDef(val) {
  return isUnDef(val) || isNull(val);
}

export function isObject(val) {
  return val !== null && is(val, 'Object');
}

export function isFunction(val) {
  return typeof val === 'function';
}

export function isUrl(path) {
  const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}

export function isString(val) {
  return is(val, 'String');
}
