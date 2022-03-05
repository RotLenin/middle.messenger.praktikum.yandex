/** queryStringify
 * Преобразует объект в Get строку
 * @param {object} data
 * @return {string} - преобразованная get строка
 */
export function queryStringify(data : Record<string, any>) {
  const str = [];
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      str.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
  }
  return str.join('&');
}
