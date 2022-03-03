import HTTPTransport from './HTTPTransport'

import Isignup from '../types/interface/Isignup';
import Ilogin from '../types/interface/Ilogin';
import IhttpTransportOptions from '../types/interface/IhttpTransportOptions';

import {prepareData, TYPES} from '../utils/TransportData';

const AUTH_PATH = '/auth/'

enum AUTH_SUBPATH {
  SIGNUP = 'signup',
  SIGNIN = 'signin',
  USER = 'user',
  LOGOUT = 'logout',
}

/** signup
 *  Создать пользователя
 *  @param {Isignup} data
 *  @return {response}
 */
export function signup(data : Isignup) {
  const options : IhttpTransportOptions = prepareData(data, TYPES.JSON)
  console.log('signup');
  return authApi().post(AUTH_SUBPATH.SIGNUP, options)
      .then((res) => {
        console.log(res);
        return JSON.parse(res.responseText);
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err)
      })
}

/** userInfo
 * Получаем информацию о пользователе
 * @return {response}
 */
export function userInfo() {
  return authApi().get(AUTH_SUBPATH.USER, {})
      .then((res) => {
        console.log('userInfo');
        console.log(res);
        if (res.status !== 200) {
          throw new Error(res.status);
        }
        return {status: res.status, response: JSON.parse(res.response)};
      })
      .catch((err) => {
        console.log('userInfo');
        console.log(err);
        return err
      })
}

/** login
 * Авторизация
 * @param {Ilogin} data
 * @return {response}
 */
export function login(data : Ilogin) {
  const options : IhttpTransportOptions = prepareData(data, TYPES.JSON)
  return authApi().post(AUTH_SUBPATH.SIGNIN, options)
      .then((res) => {
        console.log('login');
        console.log(res);
        return res.responseText
      })
      .catch((err) => {
        throw new Error(err)
      })
}

/** logout
 *  Выход
 * @return {response}
 */
export function logout() {
  return authApi().post(AUTH_SUBPATH.LOGOUT, {})
}

/** authApi
 * Ручка к API
 * @return {response}
 */
function authApi() {
  return new HTTPTransport(AUTH_PATH);
}
