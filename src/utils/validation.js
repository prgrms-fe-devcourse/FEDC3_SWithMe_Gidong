export function checkAbleSubmit(values) {
  return values.every((value) => value !== 0);
}

export function checkIsEmptyObj(obj) {
  return typeof obj === 'undefined' || (obj.constructor === Object && Object.keys(obj).length === 0);
}
