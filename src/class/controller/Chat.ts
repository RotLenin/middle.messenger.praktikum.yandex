import DefaultController from './DefaultController';
import ChatTemplate from '../view/Chat';
import StaticModel from '../model/StaticModel';
import Ichat from "../../types/interface/Ichat";
import Ilocals from "../../types/interface/Ilocals";

export enum CHAT_METHODS {
  CHAT = 'chat',
  SELECTED = 'selected',
}

/** Chat
 *  Контроллер для шаблона chat
 */
export default class Chat extends DefaultController {
  private static instance: Chat;

  /** constructor
   *
   */
  constructor() {
    super();
    this._template = ChatTemplate;

    /** Привязываем context */
  }

  /** getInstance
   *  Получаем/создаем экземпляр singleton
   *  @return {Chat}
   */
  public static getInstance(): Chat {
    if (!Chat.instance) {
      Chat.instance = new Chat();
    }
    return Chat.instance;
  }

  /** chat
   * Получаем данные для шаблона chat, выставляем обработчики
   */
  chat() {
    StaticModel.getChatLocals()
        .then((res) => res.default.main)
        .then((locals) => this._renderTemplate(locals))
        .then((render) => this._mountTemplate(render))
        .then(() => this.initSPALinks());
  }

  /** selected
   * Получаем данные для шаблона chat, выставляем обработчики
   * @param {array} path
   */
  selected(path : string[]) {
    let [id] = path;
    StaticModel.getChatLocals()
        .then((res) => res.default.selected)
        .then((locals) => this._prepareSelectedLocals(locals, id))
        .then((locals) => this._renderTemplate(locals))
        .then((render) => this._mountTemplate(render))
        .then(() => this.initSPALinks());
  }

  /** _prepareSelectedLocals
   *  Тут будем выбирать сообщения для чата и собственно выбранный чат
   *  И обьединять это дело со статикой
   *  @param {Ilocals} locals
   *  @param {number} id - chatId
   *  @return {Ilocals}
   *  */
  _prepareSelectedLocals(locals : Ilocals, id : string) {
    // @ts-ignore
    id = 1*id;
    // @ts-ignore
    return StaticModel.getMessagesForChat(id)
        .then((res) => {
          // @ts-ignore
          // @ts-ignore
          locals.locals.messages = res.messages;
          // @ts-ignore
          const selectedChat = locals.locals.chats.find((el : Ichat) => el.id === id);
          // @ts-ignore
          locals.locals.selectedChat = selectedChat;
          locals.headers.title = selectedChat.name;
          return locals;
        });
  }
}
