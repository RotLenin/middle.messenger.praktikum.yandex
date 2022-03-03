import Block from '../Block';
import Stash from '../../Stash';
import ChatMenuItem from './ChatMenuItem';
import Modal from "../../Modal";
import {addChat} from "../../model/ChatModel";
import InputModal from "../modal/InputModal";

import Iblock from '../../../types/interface/Iblock';
import Ichat from '../../../types/interface/Ichat';

import compileChatMenu from '../../../components/newChatMenu/chatMenu.pug';

import {spaLinkElement} from '../../../utils/SPALink'
import {validationInput} from '../../../utils/inputValidation'

import {PROFILE_ROUTE} from '../../../constants/routes';

import '../../../components/chatMenu/chatMenu.css';
import '../../../components/searchFilter/searchFilter.css';
import {validationField} from "../../../utils/inputValidation";

/** ChatMenu
 *
 */
export default class ChatMenu extends Block<Iblock> {
  private _chatList : ChatMenuItem[];
  private _modalRoot : HTMLElement | null;

  /** constructor
   * @param {object} locals
   */
  constructor(locals : Record<string, any>) {
    locals = {locals: locals};
    locals.template = compileChatMenu;
    super('div', locals);
  }

  /** init
   *
   */
  init() {
    this._addChatModal = this._addChatModal.bind(this);
    this._openAddChatModal = this._openAddChatModal.bind(this);
    this._addAction = this._addAction.bind(this);
    this._initChats()

    Stash.getInstance().setChatSubscriber(this);
  }

  /** update
   *  @description Переопределяем
   */
  update() {}

  /** _initChats */
  _initChats() {
    if (!this._chatList) {
      this._chatList = this.props.locals.chats.map((el : Ichat) => {
        return new ChatMenuItem(el);
      })
    }
  }

  /** render
   *  @return {HTMLElement}
   */
  render() {
    const {template, locals} = this._meta.props;
    const main = this.textToHtml(template(locals));

    if (main === null) {
      throw new Error('Can\'t render main template');
    }

    const chatMenuList = main.querySelector('.chat-menu__list');

    if (chatMenuList === null) {
      throw new Error('Can\'t find .chat-menu__list');
    }

    this._chatList.forEach((el) => {
      chatMenuList.appendChild(el.render());
    })

    const profileLink : HTMLElement | null = main.querySelector('.chat-menu__profile-link');
    if (!profileLink) {
      throw new Error('Can\'t find .chat-menu__profile-link');
    }
    profileLink.dataset.path = PROFILE_ROUTE;
    profileLink.addEventListener('click', spaLinkElement);

    const addBtn = main.querySelector('.chat-menu__add-chat');
    if (!addBtn) {
      throw new Error('Can\'t find .chat-menu__profile-link');
    }
    addBtn.addEventListener('click', this._addChatModal);

    return main;
  }

  /** _addChatModal
   *
   */
  _addChatModal() {
    Modal.getInstance().setTemplate(
      InputModal,
      {
        locals: {
          title: 'Добавить чат',
          input: {
            name: 'chat_name',
            label: 'id',
            placeholder: 'Название чата',
            type: 'text',
            errorText: 'Неверное название чата',
          },
          btnText: 'Создать',
        },
      },
      this._openAddChatModal,
      this._closeAddChatModal
    ).show();
  }

  /** _openAddChatModal
   * @param {HTMLElement} root
   * @throws {Error}s
   * @return {boolean}
   */
  _openAddChatModal(root : HTMLElement) {
    console.log('_openAddChatModal')
    this._modalRoot = root;

    const input = this._modalRoot.querySelector('input');
    const btn = this._modalRoot.querySelector('.accept-btn');

    if (!input || !btn) {
      throw new Error('Can\'t find modal elements');
    }

    input.addEventListener('focus', validationField);
    input.addEventListener('blur', validationField);
    btn.addEventListener('click', this._addAction);

    return true;
  }

  /** _closeAddChatModal
   *
   */
  _closeAddChatModal() {
    console.log('_closeDeleteUserModal');
  }

  /** _addAction
   *
   */
  async _addAction() {
    console.log('_deleteChatAction');
    if (!this._modalRoot) {
      throw new Error('Can\'t link modal root');
    }

    const input : HTMLInputElement | null = this._modalRoot.querySelector('input');
    if (!input) {
      throw new Error('Can\'t find modal elements');
    }

    if(!validationInput(input)){
      throw new Error('Bad input value')
    }

    const addRes = await addChat(input.value);

    if (addRes) {
      Modal.getInstance().close();
      return true;
    }
    console.log(addRes);
    /** TODO: Тут надо обработать ошибки при кривых запросах */
  }
}
