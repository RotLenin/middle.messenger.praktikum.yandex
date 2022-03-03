import MessageWS from '../websocket/message';
import Ichat from '../types/interface/Ichat';
import Imessage from '../types/interface/Imessage';
import Block from './view/Block';

export enum STASH_ENUM {
  USER= 'user',
  CHATS= 'chats',
  SUBSCRIBER= 'subscriber'
}

/** Stash
 *  @description Тут храним все данные приложения
 */
export default class Stash {
  private static instance: Stash;
  private _stash : Record<string, any> = {};
  private _lastTemplate : any;

  /** getInstance
   *  Получаем экземпляр singleton
   *  @return {Router}
   */
  public static getInstance(): Stash {
    if (!Stash.instance) {
      Stash.instance = new Stash();
    }
    return Stash.instance;
  }

  /** init
   *  Тут будем вписывать стандартные значения Stash
   */
  public init() {
    this._stash[STASH_ENUM.USER] = {};
    this._stash[STASH_ENUM.CHATS] = [];
    this._stash[STASH_ENUM.SUBSCRIBER] = {};
  }

  /** setState
   * @description Стандартный метод выставления значений
   * @param {string} name
   * @param {any} value
   */
  setState(name : string, value : Record<string, any> | Record<string, any>[]) {
    if (!this._stash[name]) {
      this._stash[name] = {}
    }

    if (Array.isArray(value)) {
      this._stash[name] = value;
    } else {
      this._stash[name] = Object.assign(this._stash[name], value);
    }
  }

  /** getState
   * @description Отдаем значения из хранилища
   * @param {string} name
   * @return {any | null}
   */
  getState(name : string) {
    if (this._stash[name] !== undefined) {
      return this._stash[name];
    }
    return null;
  }

  /** setLastTemplate
   * @param {any} template
   */
  setLastTemplate(template : any) {
    this._lastTemplate = template;
  }

  /** checkTemplate
   * @param {any} template
   * @return {any}
   */
  checkTemplate(template : any) {
    return this._lastTemplate === template
  }

  /** getChatByChatId
   * @description Отдаем чат по ID
   * @param {number} selectedChatId
   * @throws {Error}
   * @return {Ichat}
   */
  getChatByChatId(selectedChatId : number) : Ichat {
    const chat = this._stash[STASH_ENUM.CHATS].find((el : Ichat) => el.id === selectedChatId);
    if (!chat) {
      throw new Error('Can\'t find chat by id : '+ selectedChatId);
    }
    return chat;
  }

  /** getSocketByChatId
   * @description Получаем сокет чата по ID
   * @param {number} selectedChatId
   * @throws {Error}
   * @return {MessageWS}
   */
  getSocketByChatId(selectedChatId : number) : MessageWS {
    const chat = this.getChatByChatId(selectedChatId);
    if (!chat.ws) {
      throw new Error('Undefined propery ws');
    }
    return chat.ws;
  }

  /** getMessagesByChatId
   * @description Получаем сообщения чата по ID
   * @param {number} selectedChatId
   * @throws {Error}
   * @return {Imessage[]}
   */
  getMessagesByChatId(selectedChatId : number) : Imessage[] {
    const chat = this.getChatByChatId(selectedChatId);
    if (!chat.messages) {
      throw new Error('Undefined propery messages');
    }
    return chat.messages;
  }

  /** TODO: Помоему Subscriber будет правильнее но уже реализовано =)  */
  /** setConsumerByChatId
   * @description Подписываем чат на изменения в сообщениях
   * @param {number} chatId
   * @param {Block} consumer
   * @return {boolean}
   */
  setConsumerByChatId(chatId : number, consumer : Block<any>) {
    const chat = this.getChatByChatId(chatId);
    if (!chat.consumers) {
      chat.consumers = [];
    }
    if (chat.consumers.find((el) => el === consumer)) {
      return false;
    }
    chat.consumers.push(consumer);
  }

  /** getConsumerByChatId
   * @description Подписываем чат на изменения в сообщениях
   * @param {number} chatId
   * @return {Block<any>[]}
   */
  getConsumerByChatId(chatId : number) : Block<any>[] {
    const chat = this.getChatByChatId(chatId);
    if (!chat.consumers) {
      return [];
    }
    return chat.consumers;
  }

  /** pushMessages
   * @description Заливаем новые сообщения в хранилище
   * @param {number} chatId
   * @param {Imessage[]} messages
   */
  pushMessages(chatId : number, messages : Imessage[]) {
    const state = this.getMessagesByChatId(chatId);
    messages.forEach((el) => {
      /** Приводим к общему формату */
      el.file = null;
      el.is_read = false;
      el.chat_id = chatId;
      state.push(el)
    });
    const consumers = this.getConsumerByChatId(chatId);
    consumers.forEach((el) => el.update())
  }

  updateSubscriber(name : string){
    this._stash[STASH_ENUM.SUBSCRIBER][name].forEach((el : Block<any>) => el.update());
  }

  /** updateChat
   *  @description вызываем когда обновились чаты
   */
  updateChat(){
    this.updateSubscriber(STASH_ENUM.CHATS);
  }

  /** setChatSubscriber
   *  @description Подписываемся на изменения Чатов
   *  @param {Block} subscriber
   */
  setChatSubscriber(subscriber : Block<any>){
    if(!this._stash[STASH_ENUM.SUBSCRIBER][STASH_ENUM.CHATS]){
      this._stash[STASH_ENUM.SUBSCRIBER][STASH_ENUM.CHATS] = [];
    }
    this._stash[STASH_ENUM.SUBSCRIBER].chat.push(subscriber);
  }


  /** clearState
   *  Очищаем все данные при выходе пользователя
   */
  clearState() {
    Object.values(STASH_ENUM).forEach((key) => this._stash[key] = {});
  }
}
