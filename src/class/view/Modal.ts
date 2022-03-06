import Block from './Block';
import IBlock from '../../types/interface/IBlock';

import '../../template/modal/modal.css';

/** Modal
 *  @description Модалка
 */
export default class Modal extends Block<IBlock> {
  /**
   * @param {string} tagName
   * @param {object} props
   */
  constructor(tagName : string, props : IBlock) {
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
