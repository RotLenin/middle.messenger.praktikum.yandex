import PageBlock from './PageBlock';
import ChatMenu from '../view/chat/ChatMenu';
import ChatBody from '../view/chat/ChatBody';

import compileChatTemplate from '../../pages/newChat.pug';

import IchatLocals from '../../types/interface/IchatLocals';
import IpageBlock from '../../types/interface/IpageBlock';

import '../../template/chat/chat.css';

/** NewChat
 *  Компонент чата
 */
export default class NewChat extends PageBlock {
  private _locals : IchatLocals;
  private _chatMenuView : ChatMenu;
  private _chatBodyView : ChatBody;

  /** constructor
   *  @param {IpageBlock} locals
   * */
  constructor(locals : IpageBlock) {
    locals.template = compileChatTemplate;
    super('div', locals);
  }

  /** init
   *  @description Переопределяем
   */
  init() {
    this._locals = this.props.locals;
    this._mounted = false;
    this._initMenu();
    this._initBody();
    this._initHeader();
  }

  /** update
   *  @description Переопределяем
   */
  update() {}

  /** _initMenu
   *  @description Инициализация ChatMenu
   */
  _initMenu() {
    const {menu} = this._locals;

    if (!this._chatMenuView) {
      this._chatMenuView = new ChatMenu(menu);
    }
  }

  /** _initBody
   *  @description Инициализация ChatBody
   */
  _initBody() {
    const {body} = this._locals;
    if (!this._chatBodyView) {
      this._chatBodyView = new ChatBody(body);
    }
  }

  /** componentDidUpdate
   * Родителя обновлять будем редко, будем обновлять зависимые компоненты
   * @return {boolean}
   */
  componentDidUpdate() : boolean {
    return false;
  }

  /** render
   * @return {boolean}
   * */
  render() {
    const {template, locals} = this._meta.props;
    const main = this.textToHtml(template(locals));

    if (main === null) {
      throw new Error('Can\'t render main template');
    }

    if (!this._chatMenuView || !this._chatBodyView) {
      throw new Error('Undefined template');
    }

    main.appendChild(this._chatMenuView.render());
    main.appendChild(this._chatBodyView.render());

    this.setMount();
    return main;
  }
}
