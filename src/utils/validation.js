export function checkAbleSubmit(values) {
  return values.every((value) => value !== 0);
}

export function checkIsEmptyObj(obj) {
  return obj.constructor === Object && Object.keys(obj).length === 0;
}
