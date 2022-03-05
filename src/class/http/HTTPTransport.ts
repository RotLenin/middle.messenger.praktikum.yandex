import IhttpTransportOptions from '../../types/interface/IhttpTransportOptions';
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

  /** _request
   * Подготаливаем и отправляем XMLHttpRequest
   * @param {string} url
   * @param {IhttpTransportOptions} options
   * @param {number} timeout
   * @return {XMLHttpRequest}
   */
  _request = (url: string, options: IhttpTransportOptions, timeout = 5000) => {
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
        reject({
            status: 408,
            statusText: 'Client timeout'
        });
      };

      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
            resolve(xhr);
        } else {
            reject(xhr)

            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        }
      };

      xhr.onerror = function() {
        reject({
            status: this.status,
            statusText: xhr.statusText
        });
      };

      if(data){
        // @ts-ignore
        xhr.send(data)
      } else {
        xhr.send()
      }
    });
  };
}
