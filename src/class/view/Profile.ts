import PageBlock from './PageBlock';
import IPageBlock from '../../types/interface/IPageBlock';
import compileProfileTemplate from '../../pages/profile.pug';

import '../../template/profile/profile.css';
import '../../components/profileImg/profileImg.css';
import '../../components/acceptBtn/acceptBtn.css';
import '../../components/profileInput/profileInput.css';
import '../../components/modal/modal.css';
import '../../components/backBlock/backBlock.css';

/** Profile
 *  Обертка над шаблоном profile.pug
 */
class Profile extends PageBlock {
  /**
   * @param {object} locals
   */
  constructor(locals : IPageBlock) {
    locals.template = compileProfileTemplate;
    super('div', locals);
  }

  /** init
   *  @description Переопределяем
   */
  init() {}

  /** update
   *  @description Переопределяем
   */
  update() {}
}

export default Profile;
