/** _form
 * Имитация отправки из формы
 * TODO: добавить функционал отправки файла
 * @param {object} data
 * @return {IhttpTransportPrepareData}
 */
function _form(data: Record<string, any>){
  const formData = new FormData();
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      formData.append(key, data[key]);
    }
  }

  return {
    data : formData
  };
}

/** _json
 * Преобразуем данные в JSON, добавляем соответствующий заголовок
 * @param {object} data
 * @return {IhttpTransportPrepareData}
 */
function _json(data : Record<string, any>){
  return {
    header: {'Content-type': 'application/json;charset=UTF-8'},
    data: JSON.stringify(data),
  };
}

/** _prepareData
 * Подготавливаем body для POST|PUT|DELETE запросов
 * @param {object} data
 * @param {string} type
 * @return {IhttpTransportPrepareData}
 */
export function prepareData(data: Record<string, any>, type: string){
  let params = {};
  if (type === 'json') {
    params = _json(data);
  }
  if (type === 'form') {
    params = _form(data);
  }
  return params;
}
