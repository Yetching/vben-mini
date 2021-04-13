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
