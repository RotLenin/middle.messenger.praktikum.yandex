import Block from '../Block';
import Stash from '../../Stash';
import messageWS from '../../../websocket/message';
import IBlock from '../../../types/interface/IBlock';
import IChat from '../../../types/interface/IChat';
import compileChatBodySender from '../../../components/newChatBody/chatBodySender.pug';

import ChatBodyAttachmentMenu from './ChatBodyAttachmentMenu';
import ChatBodySendInput from './ChatBodySendInput';

import {validationInput} from '../../../utils/inputValidation';

import SEND_ICON from '../../../static/img/send.png';

import '../../../components/chatBody/chatBodySender.css';

const ATTACHMENT_ROOT_QUERY = '.chat-body-sender__attachment';
const MESSAGE_ROOT_QUERY = '.chat-body-sender__message';
const SEND_ROOT_QUERY = '.chat-body-sender__send';

const SEND_ICON_PROPS = {img: SEND_ICON, alt: 'Отправить'}

/** ChatBodySender
 *
 */
export default class ChatBodySender extends Block<IBlock> {
  private _attachmentMenu : ChatBodyAttachmentMenu;
  private _sendInput : ChatBodySendInput;
  private _selectedChat : IChat | null;

  /** constructor
   *
   * @param {object} locals
   */
  constructor(locals : Record<string, any> = {}) {
    locals = {locals: locals};
    locals.template = compileChatBodySender;
    super('div', locals);
  }

  /** init
   *
   */
  init() {
    this._initAttachmentMenu();
    this._initSendInput();
  }

  /** _initAttachmentMenu
   *
   */
  _initAttachmentMenu() {
    this._attachmentMenu = new ChatBodyAttachmentMenu();
  }

  /** _initSendInput
   *
   */
  _initSendInput() {
    this._sendInput = new ChatBodySendInput();
  }

  /** update
   *  @description Переопределяем
   */
  update() {}

  /** _sendMessage
   * @description
   * @param {HTMLElement} messageRoot
   * @throws {Error}
   * @return {boolean}
   */
  _sendMessage(messageRoot : HTMLElement) {
    const input : HTMLInputElement | null = messageRoot.querySelector('.send-input')
    if (input === null) {
      throw new Error('Can\'t find message input');
    }
    const res = validationInput(input);
    if (!res) {
      return false;
    }

    const value = input.value;
    if (!this._selectedChat) {
      throw new Error('Undefined selected chat');
    }
    const ws : messageWS = Stash.getInstance().getSocketByChatId(this._selectedChat.id)
    if (!ws) {
      throw new Error('Can\'t get socket by chatId');
    }

    ws.send({
      content: value,
      type: 'message',
    });
  }

  /** render
   * @description
   * @param {IChat | null} selectedChat
   * @return {HTMLElement}
   */
  render(selectedChat : IChat | null = null) {
    const {template, locals} = this._meta.props;
    const main = this.textToHtml(template(locals));

    this._selectedChat = selectedChat;

    if (main === null) {
      throw new Error('Can\'t render main template');
    }

    const attachmentRoot : HTMLElement | null = main.querySelector(ATTACHMENT_ROOT_QUERY);
    if (!attachmentRoot) {
      throw new Error('Can\'t query ' + ATTACHMENT_ROOT_QUERY);
    }
    attachmentRoot.appendChild(this._attachmentMenu.render())

    const messageRoot : HTMLElement | null = main.querySelector(MESSAGE_ROOT_QUERY);
    if (!messageRoot) {
      throw new Error('Can\'t query ' + MESSAGE_ROOT_QUERY);
    }
    messageRoot.appendChild(this._sendInput.render());

    const sendRoot : HTMLElement | null = main.querySelector(SEND_ROOT_QUERY);
    if (!sendRoot) {
      throw new Error('Can\'t query ' + SEND_ROOT_QUERY);
    }

    const img : HTMLImageElement = document.createElement('img');
    img.src = SEND_ICON_PROPS.img;
    img.alt = SEND_ICON_PROPS.alt;

    sendRoot.appendChild(img)
    sendRoot.addEventListener('click', () => this._sendMessage(messageRoot));

    return main;
  }
}
