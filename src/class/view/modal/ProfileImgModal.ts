import Modal from '../Modal';

import '../../../components/acceptBtn/acceptBtn.css'
import '../../../components/customFileUploader/customFileUploader.css'
import IpageBlock from '../../../types/interface/IpageBlock';
import compileProfileImgModal from './profileImgModal.pug';

/** Chat
 *  Обертка над шаблоном profileImgModal.pug
 */
export default class ProfileImgModal extends Modal {
  /**
   * @param {object} locals
   */
  constructor(locals : IpageBlock) {
    locals.template = compileProfileImgModal;
    console.log('ProfileImgModal');
    console.log(locals);
    super('div', locals);
  }
}
