import HTTPTransport from './HTTPTransport'
import {prepareData, Types} from '../utils/TransportData';

import IUser from '../types/interface/IUser';
import IHttpTransportOptions from '../types/interface/IHttpTransportOptions';
import IUserChangePassword from '../types/interface/IUserChangePassword';

const USER_PATH = '/user/';

enum UserSubpath {
  CHANGE_PROFILE = 'profile',
  CHANGE_PASSWORD = 'password',
  CHANGE_AVATAR = 'profile/avatar',
}

/** changeProfile
 * @description
 * @param {IUser} data
 * @return {response}
 */
export function changeProfile(data : IUser) {
  const options : IHttpTransportOptions = prepareData(data, Types.JSON);
  return userApi().put(UserSubpath.CHANGE_PROFILE, options)
      .then((res) => {
        return {status: res.status, response: JSON.parse(res.response)}
      })
      .catch((err) => {
        return {status: err.status, response: JSON.parse(err.response)}
      })
}

/** changePassword
 * @description Смена пароля
 * @param {IUserChangePassword} data
 * @return {response}
 */
export function changePassword(data : IUserChangePassword) {
  const options : IHttpTransportOptions = prepareData(data, Types.JSON);
  return userApi().put(UserSubpath.CHANGE_PASSWORD, options)
      .then((res) => {
        return {status: res.status, response: res.response}
      })
      .catch((err) => {
        return {status: err.status, response: err.response}
      })
}

/** uploadProfileImg
 * @description Загрузить аватарку
 * @param {Record<string, File>} files
 * @return {response}
 */
export function uploadProfileImg(files : Record<string, File>) {
  const options : IHttpTransportOptions = prepareData(files, Types.FORM);
  return userApi().put(UserSubpath.CHANGE_AVATAR, options)
      .then((res) => {
        return {status: res.status, response: res.response}
      })
      .catch((err) => {
        return {status: err.status, response: err.response}
      })
}

/** userApi
 *  @description Ручка пользователя
 *  @return {HTTPTransport}
 */
function userApi() : HTTPTransport {
  return new HTTPTransport(USER_PATH);
}
