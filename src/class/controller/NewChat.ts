import DefaultController from '../controller/DefaultController';
import NewChatTemplate from '../view/NewChat';
import StaticModel from '../model/StaticModel';
import Stash from '../Stash';
import Router from '../Router';

import ILocals from '../../types/interface/ILocals';
import IChat from '../../types/interface/IChat';
import IPageBlock from '../../types/interface/IPageBlock';

import {prepareChat} from '../model/ChatModel';
import {getChats} from '../../api/chats';
import {empty, cloneDeep} from '../../utils/myLodash';

import {CHAT_ROUTE} from '../../constants/routes';

export enum ChatMethods {
  CHAT = 'chat',
  SELECTED = 'selected',
}

/** NewChat
 *  @description Контроллер чатов
 */
export default class NewChat extends DefaultController {
  private static instance: NewChat;
  public _template = NewChatTemplate;
  private _templateInstance : NewChatTemplate | null = null;

  /** constructor
   *
   */
  constructor() {
    super();
  }

  /** getInstance
   *  Получаем/создаем экземпляр singleton
   *  @return {Chat}
   */
  public static getInstance(): NewChat {
    if (!NewChat.instance) {
      NewChat.instance = new NewChat();
    }
    return NewChat.instance;
  }

  /** chat
   *  @description
   */
  async chat() {
    const chats = await this._getChats();
    const locals = await StaticModel.getNewChatLocals()
        .then((res : Record<string, Record<string, ILocals>>) => cloneDeep(res.default.main))
    locals.locals.menu.chats = this._prepareChat(chats, null);
    this._drowChat(locals);
  }

  /** selected
   * @description
   * @param {string[]} path
   */
  async selected(path: string[]) {
    const [stringId] : string[] = path;
    const id : number = +stringId;
    const chats = await this._getChats();

    const selected = chats.find((el : IChat) => el.id === id);
    if (!selected) {
      Router.getInstance().redirect(CHAT_ROUTE);
    }

    const locals = await StaticModel.getNewChatLocals()
        .then((res : Record<string, Record<string, ILocals>>) => cloneDeep(res.default.main))
    locals.locals.menu.chats = this._prepareChat(chats, selected)
    locals.headers.title += ' - ' + selected.title;
    locals.locals.body.selectedChat = selected;
    this._drowChat(locals);
  }

  /** _drowChat
   * @description Рисуем чат
   * @param {IPageBlock} locals
   */
  _drowChat(locals :IPageBlock) {
    this._templateInstance = new this._template(locals)
    this.mountTemplateAsHTMLElement(this._templateInstance.render());
    this.setLastTemplate();
  }

  /** _prepareChat
   * @description Подготовить чат
   * @param {IChat[]} chats
   * @param {IChat} selected
   * @return {IChat[]}
   */
  public _prepareChat(
      chats : IChat[],
      selected : IChat | null = null
  ) : IChat[] {
    return chats.reduce((acc : IChat[], el : IChat) => {
      el.path = '/chat' + '/' + el.id;
      el.selected = selected === null ? false : el.id === selected.id;
      acc.push(el);
      return acc;
    }, []);
  }

  /** _getChats
   *  @description Получить чаты
   */
  async _getChats() {
    const stash = Stash.getInstance();
    const chats = stash.getChats();

    if (chats === null || empty(chats)) {
      const res = await getChats();
      const chatsRes = JSON.parse(res.response);
      if (res.status !== 200) {
        throw new Error('Can\'t get Chats !');
      }
      for (let ix = 0; ix < chatsRes.length; ix++) {
        const chat = chatsRes[ix];
        stash.addChat(await prepareChat(chat));
      }
      return stash.getChats();
    }
    return chats;
  }
}
