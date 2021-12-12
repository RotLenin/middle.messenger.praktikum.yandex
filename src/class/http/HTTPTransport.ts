import IhttpTransportOptions from '../../types/interface/IhttpTransportOptions';
import IhttpTransportPrepareData
  from '../../types/interface/IhttpTransportPrepareData';
import Iobject from "../../types/interface/Iobject";
import {queryStringify} from '../../utils/queryString';

const enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

/** HTTPTransport
 *  Класс отвечающий за HTTP запросы
 *  TODO: Возможно сделаем contructor с URL домена, если будет 1 источник
 */
// @ts-ignore
class HTTPTransport {
  /** get
   * GET запрос
   * @param {URL} url
   * @param {IhttpTransportOptions} options
   * @return {XMLHttpRequest}
   */
  get = (url: string, options: IhttpTransportOptions) => {
    if (options['data']) {
      const {data} = options;
      delete options['data'];
      url = url + '?' + queryStringify(data);
    }

    return this._request(url, {
      ...options,
      method: METHODS.GET,
    }, options.timeout);
  };

  /** post
   * POST запрос
   * @param {URL} url
   * @param {IhttpTransportOptions} options
   * @return {XMLHttpRequest}
   */
  post = (url: string, options: IhttpTransportOptions) => {
    return this._request(url, {
      ...options,
      method: METHODS.POST,
    }, options.timeout);
  };

  /** put
   * PUT запрос
   * @param {URL} url
   * @param {IhttpTransportOptions} options
   * @return {XMLHttpRequest}
   */
  put = (url: string, options: IhttpTransportOptions) => {
    return this._request(url, {
      ...options,
      method: METHODS.PUT,
    }, options.timeout);
  };

  /** delete
   * DELETE запрос
   * @param {URL} url
   * @param {IhttpTransportOptions} options
   * @return {XMLHttpRequest}
   */
  delete = (url: string, options: IhttpTransportOptions) => {
    return this._request(url, {
      ...options,
      method: METHODS.DELETE,
    }, options.timeout);
  };

  /** _prepareData
   * Подготавливаем body для POST|PUT|DELETE запросов
   * @param {object} data
   * @param {string} type
   * @return {IhttpTransportPrepareData}
   */
  _prepareData = (data: object, type: string) => {
    let params = {};
    if (type === 'json') {
      params = this._json(data);
    }
    if (type === 'form') {
      params = this._form(data);
    }
    return params;
  };

  /** _form
   * Имитация отправки из формы
   * TODO: добавить функционал отправки файла
   * @param {object} data
   * @return {IhttpTransportPrepareData}
   */
  _form = (data: Iobject) => {
    const formData = new FormData();
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        formData.append(key, data[key]);
      }
    }

    return {
      data: formData,
    };
  };

  /** _json
   * Преобразуем данные в JSON, добавляем соответствующий заголовок
   * @param {object} data
   * @return {IhttpTransportPrepareData}
   */
  _json = (data: object) => {
    return {
      header: {'Content-type': 'application/json;charset=UTF-8'},
      data: JSON.stringify(data),
    };
  };

  /** _request
   * Подготаливаем и отправляем XMLHttpRequest
   * @param {string} url
   * @param {IhttpTransportOptions} options
   * @param {number} timeout
   * @return {XMLHttpRequest}
   */
  _request = (url: string, options: IhttpTransportOptions, timeout = 5000) => {
    if (options.data) {
      const type = options.type || 'json';
      const params: IhttpTransportPrepareData = this._prepareData(
          options.data,
          type
      );
      delete options.type;
      if (!options.headers) {
        options.headers = {};
      }
      options.headers = Object.assign(options.headers, params.header);
      options.data = params.data;
    }

    const {headers, data} = options;

    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open(options.method, url);
      // Заголовки
      for (const key in headers) {
        if (Object.prototype.hasOwnProperty.call(headers, key)) {
          xhr.setRequestHeader(key, headers[key]);
        }
      }
      // Таймаут
      xhr.timeout = timeout;
      xhr.ontimeout = () => {
        reject(xhr);
        /*
        reject({
            status: 408,
            statusText: 'Client timeout'
        });
         */
      };

      xhr.onload = function() {
        resolve(xhr);
        /*
        if (this.status >= 200 && this.status < 300) {
            resolve(xhr);
        } else {
            reject(xhr)

            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        }
         */
      };

      xhr.onerror = function() {
        reject(xhr);
        /*
        reject({
            status: this.status,
            statusText: xhr.statusText
        });
         */
      };

      // @ts-ignore
      data ? xhr.send(data) : xhr.send();
    });
  };
}
