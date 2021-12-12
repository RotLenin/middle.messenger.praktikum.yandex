import EventBus from './EventBus';
import Iobject from "../../types/interface/Iobject";

/** Block
 *  Класс для создания компонентов
 */
class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  // @ts-ignore
  _element;
  _meta : Iobject = {};
  eventBus : any;
  props;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @return {void}
   */
  constructor(tagName: string = 'div', props: Iobject) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  /** _registerEvents
   *  Регистрируем все события шины eventBus
   *  @param {EventBus} eventBus
   */
  _registerEvents(eventBus : EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  /** _createResources
   *  Создаем root для Block
   */
  _createResources() {
    const {tagName} = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  /** init
   *  Действие создания Block
   */
  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    // this.eventBus.emit(Block.EVENTS.FLOW_CDM)
  }

  /** componentDidMount
   *  Действия перед монтированием Block
   *  Вызывает унаследованный потомками метод componentDidMount
   */
  _componentDidMount() {
    this.componentDidMount();
  }

  /** componentDidMount
   *  Действия перед монтированием Block
   */
  componentDidMount() {}

  /**
   *
   */
  dispatchComponentDidMount() {}

  /** _componentDidUpdate
   * Проверка - необходимо ли перерисовывать Block
   * Вызывает изменяемый метод componentDidUpdate
   * @param {object} oldProps
   * @param {object} newProps
   */
  _componentDidUpdate(oldProps : any, newProps : any) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  /** componentDidUpdate
   * Проверка - необходимо ли перерисовывать Block
   * Изменяется потомками
   * @return {boolean}
   */
  componentDidUpdate(oldProps : any, newProps : any) {
    console.log(oldProps, newProps);
    return true;
  }

  /** setProps
   * Обьединяем новые свойства со старыми
   * @param {object} nextProps
   */
  setProps = (nextProps : Iobject) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  /** element
   *  Получаем element
   *  @return {HTMLElement}
   */
  get element() {
    return this._element;
  }

  /** _render
   *  Монтируем результат render в корень
   *  TODO: было требование заменить innerHTML
   *  для этого пришлось бы отказаться от PUG
   *  либо как то его оборачивать, на что не хватило времени =)
   */
  _render() {
    if(this._element){
      // @ts-ignore
      this._element.innerHTML = this.render();
    }
  }

  /** render
   *  Изменяемый унаследованными блоками метод
   */
  render() {
  }

  /** getContent
   *  Отдает содержимое элемента
   *  @return {HTMLElement}
   */
  getContent() {
    return this.element;
  }

  /** _makePropsProxy
   * Создает proxy отслеживающий свойства Блока
   * @param {object} props
   * @return {Proxy}
   */
  _makePropsProxy(props : Iobject) {
    const handler = {
      get(target : Iobject, prop : string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target : Iobject, prop : string, value : any) {
        target[prop] = value;
        // @ts-ignore
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    };

    return new Proxy(props, handler);
  }

  /** _createDocumentElement
   * Создает document element
   * @param {string} tagName
   * @return {HTMLElement}
   */
  _createDocumentElement(tagName : string) {
    return document.createElement(tagName);
  }

  /** show
   *  Отображает элемент
   */
  show() {
    this.element.style.display = 'block';
  }

  /** hide
   *  Скрывает элемент
   */
  hide() {
    this.element.style.display = 'none';
  }
}

export default Block;
