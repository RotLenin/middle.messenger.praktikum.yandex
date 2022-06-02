import Block from '../Block';
import IBlock from '../../../types/interface/IBlock';
import compileChatBody from '../../../components/newChatBody/chatBodyHeader.pug';

import ChatBodyDotMenu from './ChatBodyDotMenu';

import '../../../components/chatBody/chatBodyHeader.css';

/** ChatBodyHeader
 *
 */
export default class ChatBodyHeader extends Block<IBlock> {
  private _links : Record<string, any>;
  private _dotMenu : ChatBodyDotMenu;

  /** constructor
   *
   * @param {object} locals
   */
  constructor(locals : Record<string, any> = {}) {
    locals = {locals: locals};
    locals.template = compileChatBody;
    super('div', locals);
  }

  /** init
   *
   */
  init() {
    this._initDotMenu();
  }

  /** _initDotMenu
   *
    */
  _initDotMenu() {
    this._dotMenu = new ChatBodyDotMenu();
  }

  /** componentDidUpdate
   *  @return {boolean}
   */
  componentDidUpdate() {
    return false;
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

    const options = main.querySelector('.chat-body-header__options');

    if (options === null) {
      throw new Error('Can\'t find .chat-body-header__options');
    }

    options.appendChild(this._dotMenu.render(locals))

    this._links = {
      root: main,
      avatar: main.querySelector('.chat-body-header__chat-img'),
      title: main.querySelector('.chat-body-header__chat-name'),
    }

    return main;
  }

  /** update
   *
   * @param {Record<string, any>} newProps
   */
  update(newProps? : Record<string, any>):void {
    if (!newProps) {
      throw new Error('need newProps');
    }
    const srcValue = newProps?.locals?.avatar !== null ? newProps.locals.avatar : '';
    if (!this._links) {
      throw new Error('undefined _links');
    }
    this._links.avatar.setAttribute('src', srcValue);
    this._links.title.innerHTML = newProps.locals.title;
    this.setProps(newProps);
  }
}
