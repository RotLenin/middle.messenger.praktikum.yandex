import PageBlock from './PageBlock';
import Iobject from "../../types/interface/Iobject";

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
  constructor(locals : Iobject) {
    locals.template = compileFormTemplate;
    super('div', locals);
  }
}

export default Form;
