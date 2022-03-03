import Stash from '../Stash';

import Ilocals from '../../types/interface/Ilocals';
import Ivalidate from '../../types/interface/Ivalidate';

import {initAllSPALink} from '../../utils/SPALink';
import {nodeListforEach} from '../../utils/nodeListHelper';
import {validationField, validationForm} from '../../utils/inputValidation';

import {userInfo} from '../../api/auth';

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
   * @return {boolean}
   */
  public _mountTemplate(renderedTemplate : string) {
    if (!this._root) {
      throw new Error('Undefined Root element');
    }
    this._root.innerHTML = renderedTemplate;
    return true;
  }

  /** _mountTemplateAsHTMLElement
   * @description Вставляем отрендаренный шаблон как HTML в root элемент
   * @param {Element} renderedTemplate
   */
  public _mountTemplateAsHTMLElement(renderedTemplate : Element) {
    if (!this._root) {
      throw new Error('Undefined Root element');
    }
    /** Очищаем старый HTML */
    this._root.innerHTML = '';
    this._root.appendChild(renderedTemplate);
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

  /** checkUser
   *  @description Отправляем запрос на проверку и получение данных
   *  о пользователе
   *  @return {response}
   */
  public async checkUser() {
    return await userInfo()
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err
        })
  }

  /** _validate
   * Проверяет все inputs формы перед отправкой
   * @param {Element} form
   * @return {object}
   */
  _validate(form : Element) {
    return new Promise((resolve : (res : Ivalidate) => void, reject) => {
      if (form instanceof HTMLElement) {
        const inputs = form.querySelectorAll('input');
        const {errors, data} = validationForm(inputs);
        if (errors.length === 0) {
          resolve({errors, data, status: true})
        }
        resolve({errors, data, status: false})
      }
      // @ts-ignore
      reject('Undefined _body');
    });
  }

  /** setLastTemplate
   *  @description Установить последний шаблон
   */
  public setLastTemplate() {
    Stash.getInstance().setLastTemplate(this._template);
  }

  /** checkLastTemplate
   *  @description Проверить последний шаблон
   *  @return {boolean}
   */
  public checkLastTemplate() {
    return Stash.getInstance().checkTemplate(this._template);
  }
}
