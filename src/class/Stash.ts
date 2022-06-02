import MessageWS from '../websocket/message';
import IChat from '../types/interface/IChat';
import IMessage from '../types/interface/IMessage';
import Block from './view/Block';

export enum StashEnum {
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
    this._stash[StashEnum.USER] = {};
    this._stash[StashEnum.CHATS] = [];
    this._stash[StashEnum.SUBSCRIBER] = {};
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

  /** getUser
   *
   * @return {any}
   */
  getUser() {
    return this.getState(StashEnum.USER);
  }

  /** getChats
   *
   * @return {any}
   */
  getChats() {
    return this.getState(StashEnum.CHATS);
  }

  /** getChatByChatId
   * @description Отдаем чат по ID
   * @param {number} selectedChatId
   * @throws {Error}
   * @return {IChat}
   */
  getChatByChatId(selectedChatId : number) : IChat {
    const chat = this._stash[StashEnum.CHATS].find((el : IChat) => el.id === selectedChatId);
    if (!chat) {
      throw new Error('Can\'t find chat by id : '+ selectedChatId);
    }
    return chat;
  }

  /** addChat
   *
   * @param {IChat | IChat[]} chat
   * @return {boolean}
   */
  addChat(chat : IChat | IChat[]) {
    const chats = this.getState(StashEnum.CHATS);
    /** Api почему то возвращает список добавленных чатов */
    if (Array.isArray(chat)) {
      chat.forEach((el : IChat) => chats.push(el))
      return true;
    }
    chats.push(chat);
    return true;
  }

  /** deleteChat
   * @description Удаляем чат из хранилища
   * @param {number} chatId
   * @return {boolean}
   */
  deleteChat(chatId : number) {
    const chats = this.getState(StashEnum.CHATS);
    this.setState(StashEnum.CHATS, chats.filter((el : IChat) => el.id !== chatId));
    return true;
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
   * @return {IMessage[]}
   */
  getMessagesByChatId(selectedChatId : number) : IMessage[] {
    const chat = this.getChatByChatId(selectedChatId);
    if (!chat.messages) {
      throw new Error('Undefined propery messages');
    }
    return chat.messages;
  }

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
   * @param {IMessage[]} messages
   */
  pushMessages(chatId : number, messages : IMessage[]) {
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

  /** updateSubscriber
   * @description Обновляем подписчиков
   * @param {string} name
   */
  updateSubscriber(name : string) {
    this._stash[StashEnum.SUBSCRIBER][name].forEach((el : Block<any>) => el.update());
  }

  /** updateChat
   *  @description вызываем когда обновились чаты
   */
  updateChat() {
    this.updateSubscriber(StashEnum.CHATS);
  }

  /** setChatSubscriber
   *  @description Подписываемся на изменения Чатов
   *  @param {Block} subscriber
   */
  setChatSubscriber(subscriber : Block<any>) {
    if (!this._stash[StashEnum.SUBSCRIBER][StashEnum.CHATS]) {
      this._stash[StashEnum.SUBSCRIBER][StashEnum.CHATS] = [];
    }
    this._stash[StashEnum.SUBSCRIBER].chats.push(subscriber);
  }


  /** clearState
   *  Очищаем все данные при выходе пользователя
   */
  clearState() {
    Object.values(StashEnum).forEach((key) => this._stash[key] = {});
  }
}
