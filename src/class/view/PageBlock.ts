import Block from './Block';
import {setTitle} from '../../utils/HeaderHelper';
import Iobject from "../../types/interface/Iobject";

/** PageBlock
 *  Расширяем Block до шаблона страницы
 */
class PageBlock extends Block {
  /**
   * @param {string} tagName
   * @param {object} props
   */
  constructor(tagName : string, props : Iobject) {
    super(tagName, props);
  }

  /** Расширяем INIT будем так же менять header страницы */
  init() {
    this._initHeader();
    super.init();
  }

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
}


export default PageBlock;
