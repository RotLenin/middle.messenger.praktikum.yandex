import PageBlock from './PageBlock';
import compileProfileTemplate from '../../pages/profile.pug';

import '../../template/profile/profile.css';
import '../../components/profileImg/profileImg.css';
import '../../components/acceptBtn/acceptBtn.css';
import '../../components/profileInput/profileInput.css';
import '../../components/modal/modal.css';
import '../../components/backBlock/backBlock.css';
import Iobject from "../../types/interface/Iobject";

/** Profile
 *  Обертка над шаблоном profile.pug
 */
class Profile extends PageBlock {
  /**
   * @param {object} locals
   */
  constructor(locals : Iobject) {
    locals.template = compileProfileTemplate;
    super('div', locals);
  }
}

export default Profile;
