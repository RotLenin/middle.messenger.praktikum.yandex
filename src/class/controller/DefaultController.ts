import Ilocals from '../../types/interface/Ilocals';

import {initAllSPALink} from '../../utils/SPALink';
import {nodeListforEach} from '../../utils/nodeListHelper';
import {validationField} from '../../utils/inputValidation';

/** DefaultController
 *  Стандартный контроллер, тут определяем общие методы
 */
export default class DefaultController {
  // @ts-ignore
  public _template;
  public _root = document.querySelector('.container');

  /** initSPALinks
   * Вешаем обработчики на все spaLink
   * */
  public initSPALinks() {
    initAllSPALink();
  }

  /** _renderTemplate
   * Рендерим pug шаблон с полученными locals
   * @param {Ilocals} locals
   * @return {string}
   */
  public _renderTemplate(locals : Ilocals) {
    return new this._template(locals).render();
  }

  /** _mountTemplate
   * Монтируем сгенерированный HTML в root block
   * @param {string }renderedTemplate
   */
  public _mountTemplate(renderedTemplate : string) {
    if(this._root){
      this._root.innerHTML = renderedTemplate;
    }
  }

  /** _setInputValidation
   * Выставляет валидатор формы на все input form блока
   * @param {HTMLElement} form
   */
  public _setInputValidation(form : HTMLElement) {
    nodeListforEach(form.querySelectorAll('input'), (el) => {
      el.addEventListener('focus', validationField);
      el.addEventListener('blur', validationField);
    });
  }
}
