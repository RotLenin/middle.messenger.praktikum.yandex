import Block from './Block';
import Iblock from '../../types/interface/Iblock';

import '../../template/modal/modal.css';

/** Modal
 *  @description Модалка
 */
export default class Modal extends Block<Iblock> {
  /**
   * @param {string} tagName
   * @param {object} props
   */
  constructor(tagName : string, props : Iblock) {
    super(tagName, props);
  }

  /** render
   *  @return {string}
   * */
  render() {
    const {template, locals} = this._meta.props;
    return template(locals);
  }

  /** init
   *  @description Переопределяем
   */
  init() {}

  /** update
   *  @description Переопределяем
   */
  update() {}
}
