import Block from '../Block';
import Stash, {STASH_ENUM} from '../../Stash';
import compileChatMenuItem from '../../../components/newChatMenu/chatMenuItem.pug';

import {formaDate} from '../../../utils/dateHelper';
import {spaLinkElement} from '../../../utils/SPALink';

import '../../../components/chatMenu/chatMenuItem.css'
import Ichat from '../../../types/interface/Ichat';

/** ChatMenuItem
 *
 */
export default class ChatMenuItem extends Block<Record<string, any>> {
  /** constructor
   * @param {Ichat} chat
   */
  constructor(chat : Ichat) {
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

  /** update
   *  @description Переопределяем
   */
  update() {}

  /** render
   *  @return {HTMLElement}
   */
  render() {
    const {template, chat} = this._meta.props;
    const user = Stash.getInstance().getState(STASH_ENUM.USER);
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
    return main;
  }
}
