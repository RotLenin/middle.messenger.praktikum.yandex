import Ilocals from '../../types/interface/Ilocals';
import Ivalidate from '../../types/interface/Ivalidate';

import {initAllSPALink} from '../../utils/SPALink';
import {nodeListforEach} from '../../utils/nodeListHelper';
import {validationField, validationForm} from '../../utils/inputValidation';

/** DefaultController
 *  Стандартный контроллер, тут определяем общие методы
 */
export default abstract class DefaultController {
  // Переопределяется у унаследовавшего класса
  public _template : any;
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
    if (this._root) {
      this._root.innerHTML = renderedTemplate;
      return true;
    }
    throw new Error('Undefined Root element');
  }

  /** _setInputValidation
   * Выставляет валидатор формы на все input form блока
   * @param {HTMLElement} form
   */
  public _setInputValidation(form : Element) {
    nodeListforEach(form.querySelectorAll('input'), (el) => {
      el.addEventListener('focus', validationField);
      el.addEventListener('blur', validationField);
    });
  }

  /** _validate
   * Проверяет все inputs формы перед отправкой
   * @param {Element} form
   * @return {object}
   */
  _validate(form : Element){
    return new Promise((resolve : (res : Ivalidate) => void, reject) => {
      if (form instanceof HTMLElement) {
        const inputs = form.querySelectorAll('input');
        const {errors, data} = validationForm(inputs);
        if (errors.length === 0) {
          resolve({errors, data, status : true})
        }
        resolve({errors, data, status : false})
      }
      reject('Undefined _body');
    });
  }
}
