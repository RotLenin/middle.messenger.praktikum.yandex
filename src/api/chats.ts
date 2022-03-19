import HTTPTransport from './HTTPTransport'
import {prepareData, Types} from '../utils/TransportData';
import IHttpTransportOptions from '../types/interface/IHttpTransportOptions';

const CHATS_PATH = '/chats';

enum ChatsSubpath {
  GET_CHATS = '',
  CREATE_CHAT = '',
  DELETE_CHAT = '',
  CHAT_TOKEN = '/token',
  CHAT_ADD_USER = '/users',
  CHAT_DELETE_USER = '/users',
}

/** getChats
 * @description Получение чатов пользователя
 * @param {number} offset - отступ
 * @param {number} limit - количество
 * @param {string} title - сортировка по названию
 * @return {response}
 */
export function getChats(offset = 0, limit = 20, title = '') {
  const options : IHttpTransportOptions = {
    data: {
      offset: offset,
      limit: limit,
      title: title,
    },
  };
  return chatsApi().get(ChatsSubpath.GET_CHATS, options)
      .then((res) => {
        return {status: res.status, response: res.response}
      })
      .catch((err) => {
        return {status: err.status, response: err.response}
      })
}

/** createChats
 * @description Создание чата
 * @param {string} title - заголовок чата
 * @return {response}
 */
export function createChats(title : string) {
  const options : IHttpTransportOptions = prepareData(
      {title: title},
      Types.JSON
  );
  return chatsApi().post(ChatsSubpath.CREATE_CHAT, options)
      .then((res) => {
        return {status: res.status, response: res.response}
      })
      .catch((err) => {
        return {status: err.status, response: err.response}
      })
}

/** addUserToChat
 * @description Добавить пользователя к чату
 * @param {number} chatId - id чата
 * @param {number[]} users - список пользователей
 * @return {response}
 */
export function addUserToChat(chatId : number, users : number[]) {
  const options : IHttpTransportOptions = prepareData(
      {
        users: users,
        chatId: chatId,
      },
      Types.JSON
  );
  return chatsApi().put(ChatsSubpath.CHAT_ADD_USER, options)
      .then((res) => {
        console.log(res);
        return {status: res.status, response: res.response}
      })
      .catch((err) => {
        return {status: err.status, response: err.response}
      })
}

/** getChatToken
 * @description получаем уникальный токен чата
 * @param {number} chatId - id чата
 * @return {response}
 */
export function getChatToken(chatId : number) {
  const options : IHttpTransportOptions = {};
  const url = ChatsSubpath.CHAT_TOKEN + '/' + chatId;

  return chatsApi().post(url, options)
      .then((res) => {
        return {status: res.status, response: res.response}
      })
      .catch((err) => {
        return {status: err.status, response: err.response}
      })
}

/** deleteUserFromChat
 * @description Удаляем пользователя из чата
 * @param {number} chatId
 * @param {number[]} users
 * @return {response}
 */
export function deleteUserFromChat(chatId : number, users : number[]) {
  const options : IHttpTransportOptions = prepareData(
      {
        users: users,
        chatId: chatId,
      },
      Types.JSON
  );
  return chatsApi().delete(ChatsSubpath.CHAT_DELETE_USER, options)
      .then((res) => {
        return {status: res.status, response: res.response}
      })
      .catch((err) => {
        return {status: err.status, response: err.response}
      })
}

/** deleteChat
 * @description Удаляем чат
 * @param {number} chatId
 * @return {response}
 */
export function deleteChat(chatId : number) {
  const options : IHttpTransportOptions = prepareData(
      {
        chatId: chatId,
      },
      Types.JSON
  );
  return chatsApi().delete(ChatsSubpath.DELETE_CHAT, options)
      .then((res) => {
        console.log(res);
        return {status: res.status, response: res.response}
      })
      .catch((err) => {
        return {status: err.status, response: err.response}
      })
}

/** chatsApi
 *  @description Ручка чатов
 *  @return {HTTPTransport}
 */
function chatsApi() {
  return new HTTPTransport(CHATS_PATH);
}
