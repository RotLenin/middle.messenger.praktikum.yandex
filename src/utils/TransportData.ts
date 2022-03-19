import IHttpTransportOptions from '../types/interface/IHttpTransportOptions';

export enum Types {
  JSON = 'json',
  FORM = 'form',
}

/** _form
 * Имитация отправки из формы
 * @param {object} data
 * @return {IhttpTransportPrepareData}
 */
function _form(data: Record<string, any>) {
  const formData = new FormData();
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      formData.append(key, data[key]);
    }
  }

  return {
    data: formData,
  };
}

/** _json
 * Преобразуем данные в JSON, добавляем соответствующий заголовок
 * @param {object} data
 * @return {IhttpTransportPrepareData}
 */
function _json(data : Record<string, any>) {
  return {
    headers: {'Content-type': 'application/json;charset=UTF-8'},
    data: JSON.stringify(data),
  };
}

/** _prepareData
 * Подготавливаем body для POST|PUT|DELETE запросов
 * @param {object} data
 * @param {string} type
 * @return {IhttpTransportPrepareData}
 */
export function prepareData(data: Record<string, any>, type: string) : IHttpTransportOptions {
  let params = {};
  if (type === Types.JSON) {
    params = _json(data);
  }
  if (type === Types.FORM) {
    params = _form(data);
  }
  return params;
}
