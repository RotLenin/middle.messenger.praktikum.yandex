/** empty
 * Проверяет на пустоту
 * @param {*} val - проверяемое значение
 * @return {boolean}
 */
export function empty( val : unknown ) {
  if (val === undefined) {
    return true;
  }

  if (typeof (val) == 'function' || typeof (val) == 'number' ||
    typeof (val) == 'boolean' ||
    Object.prototype.toString.call(val) === '[object Date]'
  ) {
    return false;
  }

  // @ts-ignore
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

/** isEqual
 * Глубокое сравнение
 * @param {object} x
 * @param {object} y
 * @return {boolean}
 */
export function isEqual(x : object, y : object) : boolean {
  if (x === y) {
    return true;
  } else if (
    (typeof x == 'object' && x != null) &&
    (typeof y == 'object' && y != null)
  ) {
    if (Object.keys(x).length != Object.keys(y).length) {
      return false;
    }

    for (const prop in x) {
      // @ts-ignore
      if (y.hasOwnProperty(prop)) {
        // @ts-ignore
        if (! isEqual(x[prop], y[prop])) {
          return false;
        }
      } else {
        return false;
      }
    }

    return true;
  } else {
    return false;
  }
}

/** cloneDeep
 * @description Глубокое копирование объекта
 * @param {any} aObject
 * @return {any}
 */
export function cloneDeep<T extends object = object>(aObject: T) {
  if (!aObject) {
    return aObject;
  }
  let v;
  const bObject = Array.isArray(aObject) ? [] : {};
  for (const k in aObject) {
    if (aObject.hasOwnProperty(k)) {
      v = aObject[k];
      // @ts-ignore
      bObject[k] = (typeof v === 'object') ? cloneDeep(v) : v;
    }
  }
  return bObject;
}
