export function isDef(val) {
  return typeof val !== 'undefined';
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
