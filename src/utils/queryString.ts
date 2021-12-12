/** queryStringify
 * Преобразует объект в Get строку
 * @param {object} data
 * @return {string} - преобразованная get строка
 */
import Iobject from "../types/interface/Iobject";

export function queryStringify(data : Iobject) {
  const str = [];
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      str.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
  }
  return str.join('&');
}
