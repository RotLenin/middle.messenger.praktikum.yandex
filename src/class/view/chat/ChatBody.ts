import Block from '../Block';

import ChatBodyHeader from './ChatBodyHeader';
import ChatBodyMessages from './ChatBodyMessages';
import ChatBodySender from './ChatBodySender';

import Iblock from '../../../types/interface/Iblock';

import compileChatBody from '../../../components/newChatBody/chatBody.pug';
import compileClearChatBody from '../../../components/newChatBody/clearChatBody.pug';

import '../../../components/chatBody/chatBody.css';

/** ChatBody
 *
 */
export default class ChatBody extends Block<Iblock> {
  private _body : Record<string, any>;
  private _bodyHeader : null | ChatBodyHeader;
  private _bodyMessages : null | ChatBodyMessages;
  private _bodySender : null | ChatBodySender;
  private _templates : Record<string, any>;

  /** constructor
   * @param { Record<string, any> } locals
   */
  constructor(locals : Record<string, any>) {
    locals = {body: locals};
    super('div', locals);
  }

  /** init
   *
   */
  init() {
    this._templates = {
      clear: compileClearChatBody,
      chat: compileChatBody,
    }
    this._body = this.props.body;
    this._initHeader();
    this._initBody();
    this._initSender();
  }

  /** update
   *  @description Переопределяем
   */
  update() {}

  /** _initHeader
   *
   */
  _initHeader() {
    this._bodyHeader = new ChatBodyHeader();
  }

  /** _initBody
   *
   */
  _initBody() {
    this._bodyMessages = new ChatBodyMessages();
  }

  /** _initSender
   *
   */
  _initSender() {
    this._bodySender = new ChatBodySender();
  }

  /** render
   *  @return {HTMLElement}
   */
  render() : Element {
    const body = this._body;
    const clearBody = body.selectedChat === null;

    let main;

    if (clearBody) {
      main = this.textToHtml(this._templates.clear(body));
      return main;
    }

    main = this.textToHtml(this._templates.chat(body));

    if (main === null) {
      throw new Error('Can\'t render main template');
    }

    if (!this._bodyHeader || !this._bodyMessages || !this._bodySender) {
      throw new Error('Null object properties');
    }

    this._bodyHeader.setProps({locals: body.selectedChat});
    main.appendChild(this._bodyHeader.render());

    this._bodyMessages.setProps({locals: body.selectedChat});
    main.appendChild(this._bodyMessages.render());

    main.appendChild(this._bodySender.render(body.selectedChat));

    return main;
  }
}
