import Router from '../Router';
import DefaultController from './DefaultController';
import ProfileTemplate from '../view/Profile';
import StaticModel from '../model/StaticModel';

import Ivalidate from "../../types/interface/Ivalidate";

import * as ROUTES from '../../constants/routes';

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
  public _template = ProfileTemplate;
  // @ts-ignore
  private _body: Element;

  /** constructor
   *  Создаем экземпляр Profile
   */
  constructor() {
    super();
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
  async profile() {
    const locals = await StaticModel.getProfileLocals().then((res : Record<string, any>) => res.default.profile)
    const profile = await this._renderTemplate(locals)

    if (this._mountTemplate(profile)) {
      this.initSPALinks();
      return true;
    }

    throw new Error('Can\'t mount template');
  }

  /** password
   * Получаем данные для шаблона profile, выставляем обработчики
   */
  async password() {
    const locals = await StaticModel.getProfileLocals().then((res : Record<string, any>) => res.default.password)
    const profile = await this._renderTemplate(locals)

    if (this._mountTemplate(profile)) {
      this._setBody();
      this._setInputValidation(this._body);
      this._setPasswordAction()
      this.initSPALinks();
      return true;
    }

    throw new Error('Can\'t mount template');
  }

  /** change
   * Получаем данные для шаблона profile, выставляем обработчики
   */
  async change() {
    const locals = await StaticModel.getProfileLocals().then((res : Record<string, any>) => res.default.change)
    const profile = await this._renderTemplate(locals)

    if (this._mountTemplate(profile)) {
      this._setBody()
      this._setInputValidation(this._body)
      this._setChangeAction()
      this.initSPALinks()
      return true;
    }

    throw new Error('Can\'t mount template');
  }

  /** _setBody
   *  Выставляем root элемент для последующего использования
   */
  _setBody() {
    const find = document.querySelector('.profile__form');
    if (find instanceof Element) {
      this._body = find;
      return true;
    }

    throw new Error('Can\'t find .profile_form');
  }

  /** _getAcceptBtn
   *  Ищем кнопку для действия
   *  @param {string} selector
   *  @return {HTMLElement}
   *  @throws {string}
   */
  _getAcceptBtn(selector : string) : HTMLElement {
    const find = this._body.querySelector(selector);
    if (find instanceof HTMLElement) {
      return find;
    }
    throw new Error('can\'t find .accept-btn');
  }

  /** _setChangeAction
   *  Выставляем действие на кнопку
   */
  _setChangeAction() {
    if (this._body instanceof HTMLElement) {
      this._getAcceptBtn('.profile-accept-action').addEventListener('click', this._changeAction);
      return true;
    }
    throw new Error('Undefined _body');
  }

  /** _changeAction
   *  Действие при сохранении изменений данных пользователя
   */
  _changeAction() {
    this._validate(this._body)
      .then((res : Ivalidate) => {
        console.log(res)
        if(res.status){
          Router.getInstance().redirect(ROUTES.PROFILE_ROUTE);
        }
      })
      .catch(err => {throw new Error(err)});
  }

  /** _setPasswordAction
   *  Выставляем действие на кнопку
   */
  _setPasswordAction() {
    if (this._body instanceof HTMLElement) {
      this._getAcceptBtn('.profile-accept-action').addEventListener('click', this._passwordAction);
      return true;
    }
    throw new Error('Undefined _body');
  }

  /** _passwordAction
   *  Действие при сохранении изменений пароля
   */
  _passwordAction() {
    this._validate(this._body)
      .then((res : Ivalidate) => {
        console.log(res)
        if(res.status){
          Router.getInstance().redirect(ROUTES.PROFILE_ROUTE);
        }
      })
      .catch(err => {throw new Error(err)});
  }

  /** _imgHandler
   *  открывает модалку по клику на IMG в профиле
   *  TODO: Похоже не успеваю =)
   */
  _imgHandler() {
    // profileImgHandler.ts
  }
}
