import Block from '../Block';
import Modal from '../../Modal';
import DropDownMenu from '../DropDownMenu';
import InputModal from '../modal/InputModal';
import QuestionModal from '../modal/QuestionModal';

import Iblock from '../../../types/interface/Iblock';
import Idropdown from '../../../types/interface/Idropdown';
import Ichat from '../../../types/interface/Ichat';

import CompiledDotMenu from '../../../components/dotMenu/dotMenu.pug';

import {validationField, validationInput} from '../../../utils/inputValidation';
import {addUserToChat, deleteUserFromChat, deleteChat} from '../../../api/chats';

import '../../../components/dotMenu/dotMenu.css';

import ADD_USER_IMG from '../../../static/img/icons/add.png';
import REMOVE_USER_IMG from '../../../static/img/icons/remove.png';

const CUSTOM_CLASS = 'dot-menu__dropdown hidden';

/** ChatBodyDotMenu
 *
 */
export default class ChatBodyDotMenu extends Block<Iblock> {
  private _dropDownMenu : DropDownMenu;
  private _dotDropdown : Idropdown[];
  private _modalRoot : HTMLElement | null;
  private _selectedChat : Ichat;

  /** constructor
   * @param {Record<string, any>} locals
   */
  constructor(locals : Record<string, any> = {}) {
    locals.template = CompiledDotMenu;
    super('div', locals);
  }

  /** init
   *
   */
  init() {
    this._addUserModal = this._addUserModal.bind(this);
    this._openAddUserModal = this._openAddUserModal.bind(this);
    this._closeAddUserModal = this._closeAddUserModal.bind(this);
    this._addUserAction = this._addUserAction.bind(this);

    this._deleteUserModal = this._deleteUserModal.bind(this);
    this._openDeleteUserModal = this._openDeleteUserModal.bind(this);
    this._closeDeleteUserModal = this._closeDeleteUserModal.bind(this);
    this._deleteUserAction = this._deleteUserAction.bind(this);

    this._deleteChatModal = this._deleteChatModal.bind(this);
    this._openDeleteChatModal = this._openDeleteChatModal.bind(this);
    this._closeDeleteChatModal = this._closeDeleteChatModal.bind(this);
    this._deleteChatAction = this._deleteChatAction.bind(this);

    this._dotDropdown = [
      {
        id: 'addUserBtn',
        icon: ADD_USER_IMG,
        name: 'Добавить пользователя',
        action: this._addUserModal,
      },
      {
        id: 'removeUserBtn',
        icon: REMOVE_USER_IMG,
        name: 'Удалить пользователя',
        action: this._deleteUserModal,
      },
      {
        id: 'deleteChat',
        icon: REMOVE_USER_IMG,
        name: 'Удалить чат',
        action: this._deleteChatModal,
      },
    ];

    this._initDropDownMenu();
  }

  /** update
   *  @description Переопределяем
   */
  update() {}

  /** _initDropDownMenu
   *
   */
  _initDropDownMenu() {
    this._dropDownMenu = new DropDownMenu({
      list: this._dotDropdown,
      customClass: CUSTOM_CLASS,
    });
  }

  /** render
   * @param {Ichat} selectedChat
   */
  // @ts-ignore
  render(selectedChat : Ichat) : Element {
    const {template} = this._meta.props;
    const main = this.textToHtml(template({}));

    this._selectedChat = selectedChat;

    if (main === null) {
      throw new Error('Can\'t render main template');
    }

    const container : HTMLElement | null = main.querySelector('.dot-menu');

    if (container === null) {
      throw new Error('Can\'t find .dot-menu');
    }

    container.appendChild(this._dropDownMenu.render(container));

    return main;
  }

  /** _addUserModal
   *
   */
  _addUserModal() {
    Modal.getInstance().setTemplate(
        InputModal,
        {
          locals: {
            title: 'Добавить пользователя в чат',
            input: {
              name: 'user',
              label: 'id',
              placeholder: 'id пользователя',
              type: 'number',
              errorText: 'Данного пользователя не сущетсвует',
            },
            btnText: 'Добавить',
          },
        },
        this._openAddUserModal,
        this._closeAddUserModal
    ).show();
  }

  /** _openAddUserModal
   * @param {HTMLElement} root
   * @throws {Error}
   * @return {boolean}
   */
  _openAddUserModal(root : HTMLElement) {
    console.log('_openAddUserModal')
    this._modalRoot = root;

    const input = this._modalRoot.querySelector('input');
    const btn = this._modalRoot.querySelector('.accept-btn');

    if (!input || !btn) {
      throw new Error('Can\'t find modal elements');
    }

    input.addEventListener('focus', validationField);
    input.addEventListener('blur', validationField);
    btn.addEventListener('click', this._addUserAction);

    return true;
  }

  /** _closeAddUserModal
   * @description действия при закрытии модального окна
   */
  _closeAddUserModal() : void {}

  /** _addUserAction
   *  @throws {Error}
   *  @return {boolean}
   */
  async _addUserAction() {
    console.log('_addUserAction');
    if (!this._modalRoot) {
      throw new Error('Can\'t link modal root');
    }

    if (!this._selectedChat) {
      throw new Error('Unknown selected chat');
    }

    const input = this._modalRoot.querySelector('input');
    if (!input) {
      throw new Error('Can\'t find modal input');
    }

    const res = await validationInput(input)
    if (!res) {
      throw new Error('Invalid input value');
    }

    const addRes = await addUserToChat(this._selectedChat.id, [Number(input.value)]);

    if (addRes.status === 200) {
      Modal.getInstance().close();
      return true;
    }
    console.log(addRes);
    /** TODO: Тут надо обработать ошибки при кривых запросах */
  }

  /** _deleteUserModal
   *
   */
  _deleteUserModal() {
    Modal.getInstance().setTemplate(
        InputModal,
        {
          locals: {
            title: 'Удалить пользователя из чата',
            input: {
              name: 'user',
              label: 'id',
              placeholder: 'id пользователя',
              type: 'number',
              errorText: 'Данного пользователя не сущетсвует',
            },
            btnText: 'Удалить',
          },
        },
        this._openDeleteUserModal,
        this._closeDeleteUserModal
    ).show();
  }

  /** _openDeleteUserModal
   * @param {HTMLElement} root
   * @return {boolean}
   */
  _openDeleteUserModal(root : HTMLElement) {
    console.log('_openDeleteUserModal');
    this._modalRoot = root;

    const input = this._modalRoot.querySelector('input');
    const btn = this._modalRoot.querySelector('.accept-btn');

    if (!input || !btn) {
      throw new Error('Can\'t find modal elements');
    }

    input.addEventListener('focus', validationField);
    input.addEventListener('blur', validationField);
    btn.addEventListener('click', this._deleteUserAction);

    return true;
  }

  /** _closeDeleteUserModal
   *
   */
  _closeDeleteUserModal() {
    console.log('_closeDeleteUserModal');
  }

  /** _deleteUserAction
   *
   */
  async _deleteUserAction() {
    if (!this._modalRoot) {
      throw new Error('Can\'t link modal root');
    }

    if (!this._selectedChat) {
      throw new Error('Unknown selected chat');
    }

    const input = this._modalRoot.querySelector('input');
    if (!input) {
      throw new Error('Can\'t find modal input');
    }

    const res = await validationInput(input)
    if (!res) {
      throw new Error('Invalid input value');
    }

    const addRes = await deleteUserFromChat(this._selectedChat.id, [Number(input.value)]);

    if (addRes.status === 200) {
      Modal.getInstance().close();
      return true;
    }
    /** TODO: Тут надо обработать ошибки при кривых запросах */
  }

  /** _deleteChatModal
   *
   */
  _deleteChatModal() {
    Modal.getInstance().setTemplate(
        QuestionModal,
        {
          locals: {
            title: 'Удалить чат ?',
            btnText: 'Удалить',
          },
        },
        this._openDeleteChatModal,
        this._closeDeleteChatModal
    ).show();
  }

  /** _openDeleteChatModal
   * @param {HTMLElement} root
   * @throws {Error}s
   * @return {boolean}
   */
  _openDeleteChatModal(root : HTMLElement) {
    console.log('_openDeleteChatModal');
    this._modalRoot = root;
    const btn = this._modalRoot.querySelector('.accept-btn');
    if (!btn) {
      throw new Error('Can\'t find modal elements');
    }
    btn.addEventListener('click', this._deleteChatAction);
    return true;
  }

  /** _closeDeleteChatModal
   *
   */
  _closeDeleteChatModal() {
    console.log('_closeDeleteUserModal');
  }

  /** _deleteChatAction
   *
   */
  async _deleteChatAction() {
    console.log('_deleteChatAction');
    if (!this._modalRoot) {
      throw new Error('Can\'t link modal root');
    }

    if (!this._selectedChat) {
      throw new Error('Unknown selected chat');
    }

    const addRes = await deleteChat(this._selectedChat.id);

    if (addRes.status === 200) {
      Modal.getInstance().close();
      return true;
    }
    console.log(addRes);
    /** TODO: Тут надо обработать ошибки при кривых запросах */
  }
}
