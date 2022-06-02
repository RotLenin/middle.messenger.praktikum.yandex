import Block from '../Block';
import Stash, {StashEnum} from '../../Stash';
import compileChatMenuItem from '../../../components/newChatMenu/chatMenuItem.pug';

import {isEqual} from '../../../utils/myLodash';
import {formaDate} from '../../../utils/dateHelper';
import {spaLinkElement} from '../../../utils/SPALink';

import '../../../components/chatMenu/chatMenuItem.css'
import IChat from '../../../types/interface/IChat';

/** ChatMenuItem
 *
 */
export default class ChatMenuItem extends Block<Record<string, any>> {
  private _root : Element;
  /** constructor
   * @param {IChat} chat
   */
  constructor(chat : IChat) {
    chat.path = '/chat' + '/' + chat.id;
    const locals = {chat: chat};
    // @ts-ignore
    locals.template = compileChatMenuItem;
    super('div', locals);
  }

  /** init
   *
   */
  init() {}

  /** componentDidUpdate
   * Проверяем необходимо ли обновить компонент
   * @param oldProps
   * @param newProps
   * @return {boolean}
   */
  componentDidUpdate(oldProps: any, newProps: any): boolean {
    return !isEqual(oldProps, newProps);
  }

  /** update
   *  @description Переопределяем
   */
  update() {
    console.log('ChatMenuItem Update');
    console.log(this._root);
  }

  getProps() {
    return this._meta.props.chat;
  }

  /** render
   *  @return {HTMLElement}
   */
  render() {
    const {template, chat} = this._meta.props;
    const user = Stash.getInstance().getState(StashEnum.USER);
    if (chat.last_message) {
      chat.last_message.formatDate = formaDate(chat.last_message.time);
    }

    const locals = {
      user: user,
      chat: chat,
    };

    const main = this.textToHtml(template(locals));
    if (main === null) {
      throw new Error('Can\'t render main template');
    }
    main.addEventListener('click', spaLinkElement);

    this._root = main;
    main.id = 'chat'+chat.id;
    return main;
  }
}
