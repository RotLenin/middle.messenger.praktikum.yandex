import Block from './Block';
import Iblock from '../../types/interface/Iblock';
import Idropdown from '../../types/interface/Idropdown';
import CompiledDropDownMenu from '../../components/dropDownMenu/dropDownMenu.pug';

import '../../components/dropDownMenu/dropDownMenu.css';

/** DropDownMenu
 *  Выпадающее меню
 */
export default class DropDownMenu extends Block<Iblock> {
  /** constructor
   * @param {Record<string, any>} locals
   */
  constructor(locals : Record<string, any>) {
    locals = {locals: locals};
    locals.template = CompiledDropDownMenu;
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

  /** manageDropdown
   * Открытие/закрытие dropdown
   * @param {Element} dropDown
   * @return {function}
   */
  manageDropdown(dropDown : Element) {
    const body = document.querySelector('body');
    /** toggle
     * @param {Event} event
     * @return {void}
     */
    function toggle(event : Event) {
      if (dropDown.classList.contains('hidden')) {
        if (body) {
          body.addEventListener('click', toggle);
        }
      } else {
        if (body) {
          body.removeEventListener('click', toggle);
        }
      }
      dropDown.classList.toggle('hidden');
      event.stopPropagation();
    }
    return toggle;
  }

  /** setDropdown
   * Универсальный помощник для dropDown элементов
   * @param {HTMLElement} root - на что вешаем обработчик клика
   * @param {Element} dropDown - всплывающее меню
   */
  setDropdown(root : Element, dropDown : Element) {
    if (!dropDown) {
      throw new Error('Can\'t find dropdown');
    }

    const toggleFunc = this.manageDropdown(dropDown);

    /** toggleMenu
     * @description открываем, закрываем меню
     * @param {Event} event
     */
    function toggleMenu(event : Event) {
      toggleFunc(event);
      event.stopPropagation();
    }

    root.addEventListener('click', toggleMenu);
  }


  /** render
   * @description render =)
   * @param {HTMLElement} root
   * @return {Element}
   */
  // @ts-ignore
  render(root : Element) : Element {
    const {template, locals} = this._meta.props;
    const {list} = locals;
    const main : Element | null = this.textToHtml(template(locals));
    if (main === null) {
      throw new Error('Null HTML from PUG template DropDownMenu');
    }
    this.setDropdown(root, main);
    list.forEach((item : Idropdown) => {
      const btn = main.querySelector('#' + item.id);
      if (btn && item.action) {
        btn.addEventListener('click', item.action);
      }
    });
    return main;
  }
}
