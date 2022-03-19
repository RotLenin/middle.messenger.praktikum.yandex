import Block from './Block';
import IPageBlock from '../../types/interface/IPageBlock';
import {setTitle} from '../../utils/HeaderHelper';

/** PageBlock
 *  Расширяем Block до шаблона страницы
 */
class PageBlock extends Block<IPageBlock> {
  public _mounted = true;
  /**
   * @param {string} tagName
   * @param {object} props
   */
  constructor(tagName : string, props : IPageBlock) {
    super(tagName, props);
  }

  /** Расширяем INIT будем так же менять header страницы */
  init() {
    this._initHeader();
    super.init();
  }

  /** update
   *  @description Переопределяем
   */
  update() {}

  /** _initHeader
   *  Выставляем настройки Head блока html
   *  Пока достаточно title
   */
  _initHeader() {
    const {headers} = this._meta.props;
    if (headers.title) {
      setTitle(headers.title);
    }
  }

  /** render
   *  рендерим шаблон pug
   *  @return {html}
   */
  render() {
    const {template, locals} = this._meta.props;
    return template(locals);
  }

  /** setMount
   *  @description Выставить положительный флаг монтирования
   */
  setMount() {
    this._mounted = true;
  }

  /** setUnmount
   *  @description Выставить отрицательный флаг монтирования
   */
  setUnmount() {
    this._mounted = false;
  }
}


export default PageBlock;
