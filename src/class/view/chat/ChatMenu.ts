import Block from '../Block';
import Stash, {StashEnum} from '../../Stash';
import ChatMenuItem from './ChatMenuItem';
import Modal from "../../Modal";
import {createChatModel} from "../../model/ChatModel";
import InputModal from "../modal/InputModal";

import IBlock from '../../../types/interface/IBlock';
import IChat from '../../../types/interface/IChat';

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
export default class ChatMenu extends Block<IBlock> {
  private _chatList : ChatMenuItem[];
  private _chatListRoot : Element;
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
  update() {
    let chats = Stash.getInstance().getState(StashEnum.CHATS);
    let renderedChat : number[] = [];

    /** Обновляем уже отрисованные чаты */
    this._chatList.forEach((el : ChatMenuItem, ix) => {
      let oldProps = el.getProps();
      let chat = chats.find((el : IChat) => el.id === oldProps.id);
      if(!chat){
        let deleteChat = this._chatListRoot.querySelector('#chat'+oldProps.id);
        if(deleteChat){
          this._chatListRoot.removeChild(deleteChat);
        }
        this._chatList.slice(ix, 1);
        return false;
      }
      renderedChat.push(oldProps.id);
      el.componentDidUpdate(oldProps, chat);
    });
    /** Проверяем не появились ли новые чаты */
    chats.forEach((el : IChat) => {
      /** Если чат не отрисован */
      if(!renderedChat.includes(el.id)){
        console.log('render new chat');
        // @ts-ignore
        let ChatItem : ChatMenuItem = new ChatMenuItem(el);
        this._chatList.push(ChatItem);
        this._chatListRoot.appendChild(ChatItem.render())
      }
    })
  }

  /** _initChats */
  _initChats() {
    if (!this._chatList) {
      this._chatList = this.props.locals.chats.map((el : IChat) => {
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
    this._chatListRoot = chatMenuList;

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

    const addRes = await createChatModel(input.value);

    if (addRes) {
      Modal.getInstance().close();
      return true;
    }
    console.log(addRes);
    /** TODO: Тут надо обработать ошибки при кривых запросах */
  }
}
