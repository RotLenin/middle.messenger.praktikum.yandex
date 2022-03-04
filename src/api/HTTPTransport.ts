import IhttpTransportOptions from '../types/interface/IhttpTransportOptions';
import {queryStringify} from '../utils/queryString';

const enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

export const API_URL = 'https://ya-praktikum.tech/api/v2';

/** HTTPTransport
 *  Класс отвечающий за HTTP запросы
 */
export default class HTTPTransport {
  private URL : string = API_URL;
  private DEFAULT_HEADERS = {
    credentials: 'include', // Нужно подставлять куки
    mode: 'cors', // Работаем с CORS
  }

  /** constructor
   * @param {string} subpath
   */
  constructor(subpath : string) {
    this.URL += subpath;
  }

  /** get
   * GET запрос
   * @param {URL} url
   * @param {IhttpTransportOptions} options
   * @return {AwaitPromiseReturnType}
   */
  get = (
      url: string,
      options: IhttpTransportOptions
  ) : Promise<Record<string, any>> => {
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

  /** _request
   * Подготаливаем и отправляем XMLHttpRequest
   * @param {string} url
   * @param {IhttpTransportOptions} options
   * @param {number} timeout
   * @return {AwaitPromiseReturnType}
   */
  _request = (
      url: string,
      options: IhttpTransportOptions,
      timeout = 5000
  ) : Promise<Record<string, any>> => {
    let {headers, data} = options;

    if (!headers) {
      headers = {}
    }
    Object.assign(headers, this.DEFAULT_HEADERS);
    const URL = this.URL

    return new Promise(function(resolve) {
      const xhr = new XMLHttpRequest();
      if (!options.method) {
        throw new Error('Undefined request Method')
      }
      xhr.open(options.method, URL + url);
      xhr.withCredentials = true;
      // Заголовки
      for (const key in headers) {
        if (Object.prototype.hasOwnProperty.call(headers, key)) {
          xhr.setRequestHeader(key, headers[key]);
        }
      }
      // Таймаут
      xhr.timeout = timeout;
      xhr.ontimeout = () => {
        resolve({
          status: 408,
          statusText: 'Client timeout',
        });
      };

      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr);
        } else {
          resolve({
            status: this.status,
            responseText: xhr.responseText,
          });
        }
      };

      xhr.onerror = function() {
        resolve({
          status: this.status,
          statusText: xhr.statusText,
        });
      };

      if (data) {
        // @ts-ignore
        xhr.send(data)
      } else {
        xhr.send()
      }
    });
  };
}
