import HTTPTransport from './HTTPTransport'

import ISignup from '../types/interface/ISignup';
import ILogin from '../types/interface/ILogin';
import IHttpTransportOptions from '../types/interface/IHttpTransportOptions';

import {prepareData, Types} from '../utils/TransportData';

const AUTH_PATH = '/auth/'

enum AuthSubpath {
  SIGNUP = 'signup',
  SIGNIN = 'signin',
  USER = 'user',
  LOGOUT = 'logout',
}

/** signup
 *  Создать пользователя
 *  @param {ISignup} data
 *  @return {response}
 */
export function signup(data : ISignup) {
  const options : IHttpTransportOptions = prepareData(data, Types.JSON)
  console.log('signup');
  return authApi().post(AuthSubpath.SIGNUP, options)
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
  return authApi().get(AuthSubpath.USER, {})
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.status);
        }
        return {status: res.status, response: JSON.parse(res.response)};
      })
      .catch((err) => {
        return err
      })
}

/** login
 * Авторизация
 * @param {ILogin} data
 * @return {response}
 */
export function login(data : ILogin) {
  const options : IHttpTransportOptions = prepareData(data, Types.JSON)
  return authApi().post(AuthSubpath.SIGNIN, options)
      .then((res) => {
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
  return authApi().post(AuthSubpath.LOGOUT, {})
}

/** authApi
 * Ручка к API
 * @return {response}
 */
function authApi() {
  return new HTTPTransport(AUTH_PATH);
}
