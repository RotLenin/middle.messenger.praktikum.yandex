import Block from '../Block';
import Iblock from '../../../types/interface/Iblock';
import compileSendInput from '../../../components/sendInput/sendInput.pug';

import '../../../components/sendInput/sendInput.css';

/** ChatBodyMessages
 *
 */
export default class ChatBodyMessages extends Block<Iblock> {
  /** constructor
   * @param {object} locals
   */
  constructor(locals : Record<string, any> = {}) {
    locals = {locals: locals};
    locals.template = compileSendInput;
    super('div', locals);
  }

  /** init
   *
   */
  init() {
    console.log(this);
  }

  /** update
   *  @description Переопределяем
   */
  update() {}

  /** render
   *  @return {HTMLElement}
   */
  render() {
    const {template, locals} = this._meta.props;
    const main = this.textToHtml(template(locals));
    if (main === null) {
      throw new Error('Can\'t render main template');
    }
    return main;
  }
}
