import DefaultController from '../controller/DefaultController';
import NewChatTemplate from '../view/NewChat';
import StaticModel from '../model/StaticModel';
import Stash, {STASH_ENUM} from '../Stash';
import Router from '../Router';
import MessageWS from '../../websocket/message';

import Ilocals from '../../types/interface/Ilocals';
import Ichat from '../../types/interface/Ichat';
import IpageBlock from '../../types/interface/IpageBlock';

import {getChats, getChatToken} from '../../api/chats';
import {empty, cloneDeep} from '../../utils/myLodash';

import {CHAT_ROUTE} from "../../constants/routes";

export enum CHAT_METHODS {
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
        .then((res : Record<string, Record<string, Ilocals>>) => cloneDeep(res.default.main))
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

    const selected = chats.find((el : Ichat) => el.id === id);
    if(!selected){
      Router.getInstance().redirect(CHAT_ROUTE);
    }

    const locals = await StaticModel.getNewChatLocals()
        .then((res : Record<string, Record<string, Ilocals>>) => cloneDeep(res.default.main))
    locals.locals.menu.chats = this._prepareChat(chats, selected)
    locals.headers.title += ' - ' + selected.title;
    locals.locals.body.selectedChat = selected;
    this._drowChat(locals);
  }

  /** _drowChat
   * @description Рисуем чат
   * @param {IpageBlock} locals
   */
  _drowChat(locals :IpageBlock) {
    /*
    if(this._templateInstance !== null){
      console.log('_templateInstance !== null')
      this._templateInstance.setNewState(locals);
      if(!this.checkLastTemplate()){
        this._mountTemplateAsHTMLElement(this._templateInstance.render());
      }
    } else {
      this._templateInstance = new this._template(locals)
      this._mountTemplateAsHTMLElement(this._templateInstance.render());
    }
    this.setLastTemplate();
     */
    /** TODO : хотелось бы умного обновления, но пока будем всегда перерисовывать */
    this._templateInstance = new this._template(locals)
    this._mountTemplateAsHTMLElement(this._templateInstance.render());
    this.setLastTemplate();
  }

  /** _prepareChat
   * @description Подготовить чат
   * @param {Ichat[]} chats
   * @param {Ichat} selected
   * @return {Ichat[]}
   */
  public _prepareChat(
      chats : Ichat[],
      selected : Ichat | null = null
  ) : Ichat[] {
    return chats.reduce((acc : Ichat[], el : Ichat) => {
      // TODO: Константа с слешом, ломается навешивание редиректов
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
    const stash = Stash.getInstance().getState(STASH_ENUM.CHATS);

    if (stash === null || empty(stash)) {
      const res = await getChats();
      const chats = JSON.parse(res.response);
      if (res.status !== 200) {
        throw new Error('Can\'t get Chats !');
      }
      const user = Stash.getInstance().getState(STASH_ENUM.USER);
      for (let ix = 0; ix < chats.length; ix++) {
        const chat = chats[ix];
        const tokenRes = await getChatToken(chat.id);
        if (tokenRes.status !== 200) {
          throw new Error('Can\'t get chat token');
        }
        const token = JSON.parse(tokenRes.response).token;
        const socket = new MessageWS(user.id, chat.id, token);
        if (!socket) {
          throw new Error('Can\'t create websocket');
        }
        chat.ws = socket;
        chat.messages = [];
        socket.getOldMessages();
      }
      Stash.getInstance().setState(STASH_ENUM.CHATS, chats)
      return chats;
    }
    return stash;
  }
}
