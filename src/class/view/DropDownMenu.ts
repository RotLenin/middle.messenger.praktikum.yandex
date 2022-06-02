import Block from './Block';
import IBlock from '../../types/interface/IBlock';
import IDropdown from '../../types/interface/IDropdown';
import CompiledDropDownMenu from '../../components/dropDownMenu/dropDownMenu.pug';

import '../../components/dropDownMenu/dropDownMenu.css';

/** DropDownMenu
 *  Выпадающее меню
 */
export default class DropDownMenu extends Block<IBlock> {
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
      console.log('manageDropdown toggle');
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
    root.addEventListener('click', toggleFunc);
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
    list.forEach((item : IDropdown) => {
      const btn = main.querySelector('#' + item.id);
      if (btn && item.action) {
        btn.addEventListener('click', item.action);
      }
    });
    return main;
  }
}
