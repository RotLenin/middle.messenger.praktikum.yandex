import Stash, {STASH_ENUM} from '../../Stash';
import Block from '../Block';

import Iblock from '../../../types/interface/Iblock';
import Imessage from '../../../types/interface/Imessage';
import Iuser from '../../../types/interface/Iuser';

import {formaDate} from '../../../utils/dateHelper';

import compileChatBodyMessages from '../../../components/newChatBody/chatBodyMessages.pug';
import compileChatBodyMessage from '../../../components/newChatBody/chatBodyMessage.pug';

import '../../../components/newChatBody/chatBodyMessages.css';

/** ChatBodyMessages
 *
 */
export default class ChatBodyMessages extends Block<Iblock> {
  private _messages : Imessage[];
  private _wrapper : HTMLElement;

  /** constructor
   *
   * @param {Record<string, any>} locals
   */
  constructor(locals : Record<string, any> = {}) {
    locals = {locals: locals};
    locals.template = compileChatBodyMessages;
    locals.messageTemplate = compileChatBodyMessage;

    super('div', locals);
  }

  /** init
   *
   */
  init() {}

  /** chatBodyMessage
   * @description
   * @param {Imessage} message
   * @param {Iuser} user
   * @throw {Error}
   * @return {HTMLElement}
   */
  chatBodyMessage(message : Imessage, user : Iuser) : HTMLElement {
    console.log('chatBodyMessage');
    const div = document.createElement('div');

    div.className = user.id === message.user_id ?
      'chat-body-message chat-body-message_right' :
      'chat-body-message chat-body-message_left';
    message.formatDate = formaDate(message.time);

    const {messageTemplate} = this._meta.props;
    const messageRender = this.textToHtml(messageTemplate({message: message}));

    if (messageRender === null) {
      throw new Error('Can\'t render template');
    }
    div.appendChild(messageRender);

    return div;
  }

  /** render
   *  @return {HTMLElement}
   */
  render() {
    const {template, locals} = this._meta.props;
    const user = Stash.getInstance().getState(STASH_ENUM.USER);
    this._messages = Stash.getInstance().getMessagesByChatId(locals.id);
    Stash.getInstance().setConsumerByChatId(locals.id, this);

    console.log('ChatBodyMessages');
    console.log('ChatBodyMessages chat id : ' + locals.id);

    const main = this.textToHtml(template(locals));

    if (main === null) {
      throw new Error('Can\'t render main template');
    }

    const wrapper : HTMLElement | null = main.querySelector('.chat-body-messages__wrapper');
    if (!wrapper) {
      throw new Error('Can\'t find wrapper');
    }
    this._wrapper = wrapper;

    this._messages.forEach((message) => {
      this._wrapper.appendChild(this.chatBodyMessage(message, user));
    })

    return main;
  }

  /** update
   *
   */
  update() {
    const {locals} = this._meta.props;
    const user = Stash.getInstance().getState(STASH_ENUM.USER);
    this._messages = Stash.getInstance().getMessagesByChatId(locals.id);

    this._wrapper.innerHTML = '';

    this._messages.forEach((message) => {
      this._wrapper.appendChild(this.chatBodyMessage(message, user));
    })
  }
}
