import Stash from '../Stash';

import ILocals from '../../types/interface/ILocals';
import IValidate from '../../types/interface/IValidate';

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

  /** renderTemplate
   * Рендерим pug шаблон с полученными locals
   * @param {ILocals} locals
   * @return {string}
   */
  public renderTemplate(locals : ILocals) {
    return new this._template(locals).render();
  }

  /** mountTemplate
   * Монтируем сгенерированный HTML в root block
   * @param {string }renderedTemplate
   * @return {boolean}
   */
  public mountTemplate(renderedTemplate : string) {
    if (!this._root) {
      throw new Error('Undefined Root element');
    }
    this._root.innerHTML = renderedTemplate;
    return true;
  }

  /** mountTemplateAsHTMLElement
   * @description Вставляем отрендаренный шаблон как HTML в root элемент
   * @param {Element} renderedTemplate
   */
  public mountTemplateAsHTMLElement(renderedTemplate : Element) {
    if (!this._root) {
      throw new Error('Undefined Root element');
    }
    /** Очищаем старый HTML */
    this._root.innerHTML = '';
    this._root.appendChild(renderedTemplate);
  }

  /** setInputValidation
   * Выставляет валидатор формы на все input form блока
   * @param {HTMLElement} form
   */
  public setInputValidation(form : Element) {
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

  /** validate
   * Проверяет все inputs формы перед отправкой
   * @param {Element} form
   * @return {object}
   */
  validate(form : Element) {
    return new Promise((resolve : (res : IValidate) => void, reject) => {
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
