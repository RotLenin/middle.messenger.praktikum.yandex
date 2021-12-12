import PageBlock from './PageBlock';
import compileErrorTemplate from '../../pages/error.pug';

import '../../template/form/form.css';
import '../../components/acceptBtn/acceptBtn.css';
import '../../components/defaultLink/defaultLink.css';
import '../../components/formInput/formInput.css';
import Iobject from "../../types/interface/Iobject";

/** Error
 *  Обертка над шаблоном error.pug
 */
class Error extends PageBlock {
  /**
   * @param {object} locals
   */
  constructor(locals : Iobject) {
    locals.template = compileErrorTemplate;
    super('div', locals);
  }
}

export default Error;
