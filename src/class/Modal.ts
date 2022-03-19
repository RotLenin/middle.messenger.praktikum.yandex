import {isEqual} from '../utils/myLodash';

/** Modal
 *  @description Родительский класс для всех модалок
 */
export default class Modal {
  private static instance: Modal;

  private _rootSelector = '.modal';
  private _root: HTMLElement | null = null;

  private _templateClass : any;
  private _template : any;
  private _locals : Record<string, any> = {};

  public _showAction : (root : HTMLElement) => void;
  public _closeAction : () => void;

  /** getInstance
   *  Получаем экземпляр singleton
   *  @return {Router}
   */
  public static getInstance(): Modal {
    if (!Modal.instance) {
      Modal.instance = new Modal();
    }
    return Modal.instance;
  }

  /** init
   *
   */
  public init() {
    this._root = document.querySelector(this._rootSelector);

    this.toggle = this.toggle.bind(this);
    this.show = this.show.bind(this);
    this.closeFromWrap = this.closeFromWrap.bind(this);
    this.close = this.close.bind(this);
  }

  /** toggle
   *  @description Меняем значение отображения модалки
   *  @throws {Error}
   */
  public toggle() {
    if (this._root === null) {
      throw new Error('Can\'t find .modal');
    }
    this._root.classList.toggle('modal_not_show');
  }

  /** show
   *  @description Отобразить модальное окно
   *  @return {boolean}
   *  @throws {Error}
   */
  public show() {
    if (this._root === null) {
      throw new Error('Can\'t find .modal');
    }
    this._root.classList.remove('modal_not_show');
    this._showAction(this._root);
    return true;
  }

  /** closeFromWrap
   *  @description Закрываем только если кликнули на wrap
   *  @param {Event} event
   */
  public closeFromWrap(event : Event) {
    if (event.target === this._root) {
      this.close();
    }
  }

  /** close
   *  @description скрыть модальное окно
   *  @return {boolean}
   *  @throws {Error}
   */
  public close() {
    this._closeAction();
    if (this._root !== null) {
      this._root.classList.add('modal_not_show');
      return true;
    }
    throw new Error('Can\'t find .modal');
  }

  /** setTemplate
   * @description выставляем шаблон
   * @param {any} template
   * @param {Record<string, any>} locals
   * @param {function} showAction
   * @param {function} closeAction
   * @return {Modal}
   */
  public setTemplate(
      template : any,
      locals : Record<string, any>,
      showAction : (root : HTMLElement) => void,
      closeAction : () => void
  ) {
    this._showAction = showAction;
    this._closeAction = closeAction;

    if (this._templateClass === undefined || this._templateClass !== template) {
      this._templateClass = template;
      this._initTemplate(locals);
      this.render(locals);
    } else if (!isEqual(this._locals, locals)) {
      this._template.setProps(locals);
      this.render(locals);
    }
    return this;
  }

  /** _initTemplate
   * @description Инициализируем шаблон
   * @param {Record<string, any>} locals
   * @private
   */
  private _initTemplate(locals : Record<string, any>) {
    this._template = new this._templateClass(locals);
  }

  /** render
   * @param {Record<string, any>} locals
   * @throws {Error}
   * @return {boolean}
   */
  public render(locals : Record<string, any>) {
    if (this._root !== null) {
      this._root.innerHTML = this._template.render(locals);
      this._root.addEventListener('click', this.closeFromWrap);
      return true;
    }
    throw new Error('Can\'t find .modal');
  }
}
