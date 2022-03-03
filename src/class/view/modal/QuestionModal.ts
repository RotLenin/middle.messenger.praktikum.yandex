import Modal from '../Modal';

import '../../../components/acceptBtn/acceptBtn.css';
import './QuestionModal.css';

import compileQuestionModal from './QuestionModal.pug';

import IpageBlock from '../../../types/interface/IpageBlock';

/** Chat
 *  Обертка над шаблоном profileImgModal.pug
 */
export default class QuestionModal extends Modal {
  /**
   * @param {object} locals
   */
  constructor(locals : IpageBlock) {
    locals.template = compileQuestionModal;
    super('div', locals);
  }
}
