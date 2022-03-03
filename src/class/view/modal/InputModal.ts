import Modal from '../Modal';

import '../../../components/acceptBtn/acceptBtn.css';
import '../../../components/formInput/formInput.css';
import './InputModal.css';

import compileInputModal from './inputModal.pug';

import IpageBlock from '../../../types/interface/IpageBlock';

/** Chat
 *  Обертка над шаблоном profileImgModal.pug
 */
export default class InputModal extends Modal {
  /**
   * @param {object} locals
   */
  constructor(locals : IpageBlock) {
    locals.template = compileInputModal;
    super('div', locals);
  }
}
