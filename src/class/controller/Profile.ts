import Router from '../Router';
import DefaultController from './DefaultController';
import ProfileTemplate from '../view/Profile';
import StaticModel from '../model/StaticModel';

import * as ROUTES from '../../constants/routes';

import {validationForm} from '../../utils/inputValidation';

export enum PROFILE_METHODS {
  PROFILE = 'profile',
  PASSWORD = 'password',
  CHANGE = 'change',
}

/** Profile
 *  Контроллер для шаблона profile
 */
export default class Profile extends DefaultController {
  private static instance: Profile;
  public _body: HTMLElement | null = null;

  /** constructor
   *  Создаем экземпляр Profile
   */
  constructor() {
    super();
    this._template = ProfileTemplate;

    /** Привязываем context */
    this._changeAction = this._changeAction.bind(this);
    this._passwordAction = this._passwordAction.bind(this);
  }

  /** getInstance
   *  Получаем/создаем экземпляр singleton
   *  @return {Profile}
   */
  public static getInstance(): Profile {
    if (!Profile.instance) {
      Profile.instance = new Profile();
    }
    return Profile.instance;
  }

  /** profile
   * Получаем данные для шаблона profile, выставляем обработчики
   */
  profile() {
    StaticModel.getProfileLocals()
        .then((res) => res.default.profile)
        .then((locals) => this._renderTemplate(locals))
        .then((render) => this._mountTemplate(render))
        .then(() => this.initSPALinks());
  }

  /** password
   * Получаем данные для шаблона profile, выставляем обработчики
   */
  password() {
    StaticModel.getProfileLocals()
        .then((res) => res.default.password)
        .then((locals) => this._renderTemplate(locals))
        .then((render) => this._mountTemplate(render))
        .then(() => this._setBody())
      // @ts-ignore
        .then(() => this._setInputValidation(this._body))
        .then(() => this._setPasswordAction())
        .then(() => this.initSPALinks());
  }

  /** change
   * Получаем данные для шаблона profile, выставляем обработчики
   */
  change() {
    StaticModel.getProfileLocals()
        .then((res) => res.default.change)
        .then((locals) => this._renderTemplate(locals))
        .then((render) => this._mountTemplate(render))
        .then(() => this._setBody())
      // @ts-ignore
        .then(() => this._setInputValidation(this._body))
        .then(() => this._setChangeAction())
        .then(() => this.initSPALinks());
  }

  /** _setBody
   *  Выставляем root элемент для последующего использования
   */
  _setBody() {
    this._body = document.querySelector('.profile__form');
  }

  /** _setChangeAction
   *  Выставляем действие на кнопку
   */
  _setChangeAction() {
    // @ts-ignore
    this._body.querySelector('.profile-accept-action')
        .addEventListener('click', this._changeAction);
  }

  /** _changeAction
   *  Действие при сохранении изменений данных пользователя
   */
  _changeAction() {
    // @ts-ignore
    const inputs = this._body.querySelectorAll('input');
    // @ts-ignore
    const {errors, data} = validationForm(inputs);
    if (errors.length === 0) {
      Router.getInstance().redirect(ROUTES.PROFILE_ROUTE);
    }
  }

  /** _setPasswordAction
   *  Выставляем действие на кнопку
   */
  _setPasswordAction() {
    // @ts-ignore
    this._body.querySelector('.profile-accept-action')
        .addEventListener('click', this._passwordAction);
  }

  /** _passwordAction
   *  Действие при сохранении изменений пароля
   */
  _passwordAction() {
    // @ts-ignore
    const inputs = this._body.querySelectorAll('input');
    // @ts-ignore
    const {errors, data} = validationForm(inputs);
    if (errors.length === 0) {
      Router.getInstance().redirect(ROUTES.PROFILE_ROUTE);
    }
  }

  /** _imgHandler
   *  открывает модалку по клику на IMG в профиле
   *  TODO: Похоже не успеваю =)
   */
  _imgHandler() {
    // profileImgHandler.ts
  }
}
