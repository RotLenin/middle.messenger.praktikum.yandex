import PageBlock from './PageBlock';
import compileChatTemplate from '../../pages/chat.pug';
import Iobject from "../../types/interface/Iobject";

import '../../template/chat/chat.css';
import '../../components/chatMenu/chatMenu.css';
import '../../components/chatMenu/chatMenuItem.css'
import '../../components/searchFilter/searchFilter.css';
import '../../components/chatBody/chatBody.css';
import '../../components/chatBody/chatBodyMessages.css';
import '../../components/chatBody/chatBodySender.css';
import '../../components/chatBody/chatBodyHeader.css';
import '../../components/attachmentMenu/attachmentMenu.css';
import '../../components/dropDownMenu/dropDownMenu.css';
import '../../components/sendInput/sendInput.css';
import '../../components/dotMenu/dotMenu.css';

/** Chat
 *  Обертка над шаблоном chat.pug
 */
class Chat extends PageBlock {
  /**
   * @param {object} locals
   */
  constructor(locals : Iobject) {
    locals.template = compileChatTemplate;
    super('div', locals);
  }
}

export default Chat;
