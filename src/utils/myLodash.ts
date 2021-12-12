/** empty
 * Проверяет на пустоту
 * @param {*} val - проверяемое значение
 * @return {boolean}
 */
export function empty( val : any ) {
  if (val === undefined) {
    return true;
  }

  if (typeof (val) == 'function' || typeof (val) == 'number' ||
    typeof (val) == 'boolean' ||
    Object.prototype.toString.call(val) === '[object Date]'
  ) {
    return false;
  }

  if (val == null || val.length === 0) {
    return true;
  }

  if (typeof (val) == 'object') {
    for (const f in val) {
      if (Object.prototype.hasOwnProperty.call(val, f)) {
        return false;
      }
    }
    return true;
  }

  return false;
}
