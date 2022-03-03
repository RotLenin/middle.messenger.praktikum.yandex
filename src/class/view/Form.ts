import PageBlock from './PageBlock';
import IpageBlock from '../../types/interface/IpageBlock';
import compileFormTemplate from '../../pages/form.pug';

import '../../template/form/form.css';
import '../../components/acceptBtn/acceptBtn.css';
import '../../components/defaultLink/defaultLink.css';
import '../../components/formInput/formInput.css';

/** Profile
 *  Обертка над шаблоном form.pug
 */
class Form extends PageBlock {
  /**
   * @param {object} locals
   */
  constructor(locals : IpageBlock) {
    locals.template = compileFormTemplate;
    super('div', locals);
  }

  /** init
   *  @description Переопределяем
   */
  init() {
  }

  /** update
   *  @description Переопределяем
   */
  update() {}
}

export default Form;
