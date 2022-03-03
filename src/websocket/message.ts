import DefaultSocket from './defaultSocket';
import Stash, {STASH_ENUM} from '../class/Stash';

import Imessage from '../types/interface/Imessage';

import {MESSAGE_TYPES} from '../constants/messageTypes';
import Ichat from '../types/interface/Ichat';

const SUB_PATH = 'chats';
const INTERVAL_TIME = 15000;

/** MessageWS
 *  @description Сокет для сообщений
 */
export default class MessageWS extends DefaultSocket {
  private _URL = this.SOCKET_URL + SUB_PATH;
  private _interval;
  private _chatId : number;

  /** constructor
   * @param {number} userId
   * @param {number} chatId
   * @param {string} token
   */
  constructor(userId : number, chatId : number, token : string) {
    super();
    this._chatId = chatId;
    this._URL = [this.SOCKET_URL, SUB_PATH, userId, chatId, token].join('/');
    const socket = new WebSocket(this._URL);

    socket.addEventListener('open', () => {
      console.log('Соединение установлено');
      /*
      socket.send(JSON.stringify({
        content: 'Моё первое сообщение миру!',
        type: 'message',
      }));
       */
    });

    socket.addEventListener('error', (event : Event) => {
      console.log(event);
      // @ts-ignore
      console.log('Ошибка', event.message);
    });

    this._socket = socket;

    this.ping = this.ping.bind(this);
    this.close = this.close.bind(this);
    this.message = this.message.bind(this);

    socket.addEventListener('close', this.close);
    socket.addEventListener('message', this.message);
    this._interval = setInterval(this.ping, INTERVAL_TIME);
  }

  /** ping
   * @description Периодически шлем серверу сигнал на поддержание сокета
   * @private
   */
  private ping() {
    if (this._socket === null) {
      throw new Error('Bad socket');
    }
    this._socket.send(JSON.stringify({
      type: 'ping',
    }))
  }

  /** close
   * @description Закрываем сокет
   * @param {CloseEvent} event
   */
  public close(event : CloseEvent) {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }
    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    console.log('Чистим интервал');
    clearInterval(this._interval);
  }

  /** message
   * @description Обработка сообщения
   * @param {MessageEvent} event
   * @private
   * @return {boolean}
   */
  private message(event : MessageEvent) {
    console.log(event);
    let {data} = event;
    data = JSON.parse(data);
    console.log(data);
    // На пинги не реагируем
    if (data.type === MESSAGE_TYPES.PONG) {
      return true;
    }
    // Информация что пользователь зашел
    if (data.type === MESSAGE_TYPES.USER_CONNECTED) {
      return true;
    }
    // Сообщение
    if (data.type === MESSAGE_TYPES.MESSAGE) {
      Stash.getInstance().pushMessages(this._chatId, [data]);
      return true;
    }
    // File
    if (data.type === MESSAGE_TYPES.FILE) {
      return true;
    }
    // Sticker
    if (data.type === MESSAGE_TYPES.STICKER) {
      return true;
    }
    // Массив сообщений
    if (Array.isArray(data)) {
      if (data.length === 0) {
        return true;
      }
      const chats = Stash.getInstance().getState(STASH_ENUM.CHATS);
      const currentChat = chats.find((el : Ichat) => el.id === data[0].chat_id);
      if(!currentChat){
        throw new Error('Can\'t find currect chat');
      }
      currentChat.messages = data.sort(
          (a : Imessage, b : Imessage) => a.time.localeCompare(b.time)
      );
      Stash.getInstance().setState(STASH_ENUM.CHATS, chats);
      /** TODO: Вызываем консумеры, пока костылем ) */
      Stash.getInstance().pushMessages(currentChat.id, []);
      return true;
    }
    /** Если нет обработчика */
    console.log('MessageWS no have handler for message');
    return false;
  }

  /** getOldMessages
   * @description Получаем старые сообщения
   * @param {number} offset
   */
  public getOldMessages(offset = 0) {
    this.send({
      content: offset,
      type: 'get old',
    })
  }

  /** send
   * @description Отправляем сообщения в сокет
   * @param {Record<string, any>} message
   */
  public send(message : Record<string, any>) {
    if (this._socket === null) {
      throw new Error('Bad socket');
    }

    const socket = this._socket;

    this.waitSocketConnection(
        () => {
          socket.send(JSON.stringify(message));
        }
    );
  }
}
