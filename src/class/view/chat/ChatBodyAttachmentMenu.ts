import Block from '../Block';
import DropDownMenu from '../DropDownMenu';

import IBlock from '../../../types/interface/IBlock';
import IDropdown from '../../../types/interface/IDropdown';

import CompiledAttachmentMenu from '../../../components/attachmentMenu/attachmentMenu.pug';

import '../../../components/attachmentMenu/attachmentMenu.css';

import image from '../../../static/img/icons/image.png'
import file from '../../../static/img/icons/file.png'
import location from '../../../static/img/icons/location.png'

import ATTACHMENT_ICON from '../../../static/img/attachment.png';

const attachmentDropdown: IDropdown[] = [
  {id: 'attachmentImg', icon: image, name: 'Фото или Видео'},
  {id: 'attachmentFile', icon: file, name: 'Файл'},
  {id: 'attachmentLocation', icon: location, name: 'Локация'},
];

const ATTACHMENT_ICON_PROPS = {img: ATTACHMENT_ICON, alt: 'Вложения'}

const CUSTOM_CLASS = 'chat-body-sender__attachment-dropdown hidden';

/** ChatBodyDotMenu
 *
 */
export default class ChatBodyDotMenu extends Block<IBlock> {
  private _dropDownMenu : DropDownMenu;

  /** constructor
   * @param {Record<string, any>} locals
   */
  constructor(locals : Record<string, any> = {}) {
    locals.template = CompiledAttachmentMenu;
    super('div', locals);
  }

  /** init
   *
   */
  init() {
    this._initDropDownMenu();
  }

  /** update
   *  @description Переопределяем
   */
  update() {}

  /** _initDropDownMenu
   *
   */
  _initDropDownMenu() {
    this._dropDownMenu = new DropDownMenu({
      list: attachmentDropdown,
      customClass: CUSTOM_CLASS,
    });
  }

  /** render
   *  @return {Element}
   */
  render() : Element {
    const {template} = this._meta.props;
    const main = this.textToHtml(template({}));

    if (main === null) {
      throw new Error('Can\'t render main template');
    }

    const img : HTMLImageElement = document.createElement('img');
    img.src = ATTACHMENT_ICON_PROPS.img;
    img.alt = ATTACHMENT_ICON_PROPS.alt;

    main.appendChild(img);
    main.appendChild(this._dropDownMenu.render(main));

    return main;
  }
}
