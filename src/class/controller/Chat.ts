import DefaultController from './DefaultController';
import ChatTemplate from '../view/Chat';
import StaticModel from '../model/StaticModel';
import Ichat from '../../types/interface/Ichat';
import Ilocals from '../../types/interface/Ilocals';
import IchatLocals from '../../types/interface/IchatLocals';
import Imessage from '../../types/interface/Imessage';

export enum CHAT_METHODS {
  CHAT = 'chat',
  SELECTED = 'selected',
}

/** Chat
 *  Контроллер для шаблона chat
 */
export default class Chat extends DefaultController {
  private static instance: Chat;
  public _template = ChatTemplate;

  /** constructor
   *
   */
  constructor() {
    super();
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
  async chat() {
    const locals = await StaticModel.getChatLocals()
        .then((res : Record<string, Record<string, Ilocals>>) => res.default.main)
    const template = await this._renderTemplate(locals);

    if (this._mountTemplate(template)) {
      this.initSPALinks()
      return true
    }

    throw new Error('Can\'t mount template');
  }

  /** selected
   * Получаем данные для шаблона chat, выставляем обработчики
   * @param {array} path
   */
  async selected(path: string[]) {
    const [id] = path;

    let locals = await StaticModel.getChatLocals()
        .then((res : Record<string, Record<string, Ilocals>>) => res.default.selected);
    locals = await this._prepareSelectedLocals(locals, +id)
    const template = await this._renderTemplate(locals);

    if (this._mountTemplate(template)) {
      this.initSPALinks()
      return true
    }

    throw new Error('Can\'t mount template');
  }

  /** _prepareSelectedLocals
   *  Тут будем выбирать сообщения для чата и собственно выбранный чат
   *  И обьединять это дело со статикой
   *  @param {IchatLocals} IchatLocals
   *  @param {number} id - chatId
   *  @return {Ilocals}
   *  */
  _prepareSelectedLocals(IchatLocals: IchatLocals, id: number) {
    return StaticModel.getMessagesForChat(id)
        .then((res: { messages: Imessage[]; }) => {
          IchatLocals.locals.messages = res.messages;

          const selectedChat = IchatLocals.locals.chats.find((el : Ichat) => el.id === id);
          if (selectedChat) {
            IchatLocals.locals.selectedChat = selectedChat;
            IchatLocals.headers.title = selectedChat.name;
            return IchatLocals;
          }
          throw new Error('Can\'t find chat with id : ' + id);
        });
  }
}
