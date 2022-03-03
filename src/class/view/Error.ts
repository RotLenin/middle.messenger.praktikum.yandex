import PageBlock from './PageBlock';
import IpageBlock from '../../types/interface/IpageBlock';
import compileErrorTemplate from '../../pages/error.pug';

import '../../template/error/error.css';
import '../../components/acceptBtn/acceptBtn.css';
import '../../components/defaultLink/defaultLink.css';
import '../../components/formInput/formInput.css';

/** Error
 *  Обертка над шаблоном error.pug
 */
class Error extends PageBlock {
  /**
   * @param {object} locals
   */
  constructor(locals : IpageBlock) {
    locals.template = compileErrorTemplate;
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

export default Error;
