import Modal from '../Modal';

import '../../../components/acceptBtn/acceptBtn.css';
import './QuestionModal.css';

import compileQuestionModal from './QuestionModal.pug';

import IPageBlock from '../../../types/interface/IPageBlock';

/** Chat
 *  Обертка над шаблоном profileImgModal.pug
 */
export default class QuestionModal extends Modal {
  /**
   * @param {object} locals
   */
  constructor(locals : IPageBlock) {
    locals.template = compileQuestionModal;
    super('div', locals);
  }
}
