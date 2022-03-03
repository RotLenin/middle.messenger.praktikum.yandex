import HTTPTransport from './HTTPTransport'
import {prepareData, TYPES} from '../utils/TransportData';

import Iuser from '../types/interface/Iuser';
import IhttpTransportOptions from '../types/interface/IhttpTransportOptions';
import IuserChangePassword from '../types/interface/IuserChangePassword';

const USER_PATH = '/user/';

enum USER_SUBPATH {
  CHANGE_PROFILE = 'profile',
  CHANGE_PASSWORD = 'password',
  CHANGE_AVATAR = 'profile/avatar',
}

/** changeProfile
 * @description
 * @param {Iuser} data
 * @return {response}
 */
export function changeProfile(data : Iuser) {
  const options : IhttpTransportOptions = prepareData(data, TYPES.JSON);
  return userApi().put(USER_SUBPATH.CHANGE_PROFILE, options)
      .then((res) => {
        return {status: res.status, response: JSON.parse(res.response)}
      })
      .catch((err) => {
        return {status: err.status, response: JSON.parse(err.response)}
      })
}

/** changePassword
 * @description Смена пароля
 * @param {IuserChangePassword} data
 * @return {response}
 */
export function changePassword(data : IuserChangePassword) {
  const options : IhttpTransportOptions = prepareData(data, TYPES.JSON);
  return userApi().put(USER_SUBPATH.CHANGE_PASSWORD, options)
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
  const options : IhttpTransportOptions = prepareData(files, TYPES.FORM);
  return userApi().put(USER_SUBPATH.CHANGE_AVATAR, options)
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
