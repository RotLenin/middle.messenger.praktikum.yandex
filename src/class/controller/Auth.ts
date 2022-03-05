import Router from '../Router';
import DefaultController from './DefaultController';
import FormTemplate from '../view/Form';
import StaticModel from '../model/StaticModel';

import Ivalidate from "../../types/interface/Ivalidate";

import * as ROUTES from '../../constants/routes';

export enum AUTH_METHODS {
  LOGIN = 'login',
  SIGNUP = 'signup',
}

/** Auth
 * Контролер для Логина/Авторизации, так как они фактически отличаются
 * только парой входных параметров */
export default class Auth extends DefaultController {
  // @ts-ignore
  private _form: HTMLElement;
  private static instance: Auth;
  public _template = FormTemplate;

  /**
   *
   */
  constructor() {
    super();
    /** Привязываем context */
    this._authAction = this._authAction.bind(this);
    this._signupAction = this._signupAction.bind(this);
  }

  /** getInstance
   *  Получаем/создаем экземпляр singleton
   *  @return {Auth}
   */
  public static getInstance(): Auth {
    if (!Auth.instance) {
      Auth.instance = new Auth();
    }
    return Auth.instance;
  }

  /** login
   * Получаем данные для шаблона auth, выставляем обработчики
   */
  async login() {
    const locals = await StaticModel.getLoginLocals().then((res: Record<string, any>) => res.default);
    const form = await this._renderTemplate(locals)

    if (this._mountTemplate(form)) {
      this._setForm()
      this._setInputValidation(this._form)
      this._auth()
      this.initSPALinks()
      return true;
    }

    throw new Error('Can\'t mount template');
  }

  /** signup
   * Получаем данные для шаблона auth, выставляем обработчики
   */
  async signup() {
    const locals = await StaticModel.getSignupLocals().then((res : Record<string, any>) => res.default);
    const form = await this._renderTemplate(locals)

    if (this._mountTemplate(form)) {
      this._setForm()
      this._setInputValidation(this._form)
      this._signup()
      this.initSPALinks()
      return true;
    }

    throw new Error('Can\'t mount template');
  }

  /** _setForm
   *  Выставляем корень шаблона
   *  @return {boolean}
   *  @throws {string}
   */
  _setForm() {
    const find = document.querySelector('.form');
    if (find instanceof HTMLElement) {
      this._form = find;
      return true;
    }

    throw new Error('can\'t find .form');
  }

  /** _getAcceptBtn
   *  Ищем кнопку для действия
   *  @return {HTMLElement}
   *  @throws {string}
   */
  _getAcceptBtn() : HTMLElement {
    const find = this._form.querySelector('.accept-btn');
    if (find instanceof HTMLElement) {
      return find;
    }
    throw new Error('can\'t find .accept-btn');
  }

  /** _auth
   *  Вешаем на кнопку действие при авторизации
   */
  _auth() {
    if (this._form instanceof HTMLElement) {
      this._getAcceptBtn().addEventListener('click', this._authAction);
      return true;
    }
    throw new Error('can\'t find .form');
  }

  /** _authAction
   *  Действия при авторизации
   */
  _authAction() {
    this._validate(this._form)
      .then((res : Ivalidate) => {
        console.log(res)
        if(res.status){
          Router.getInstance().redirect(ROUTES.CHAT_ROUTE);
        }
      })
      .catch(err => {throw new Error(err)});
  }

  /** _signup
   *  Вешаем событие на кнопку
   */
  _signup() {
    if (this._form instanceof HTMLElement) {
      this._getAcceptBtn().addEventListener('click', this._signupAction);
      return true;
    }
    throw new Error('can\'t find .form');
  }

  /** _signupAction
   *  Действия при нажатии кнопки регистрация
   */
  _signupAction() {
    this._validate(this._form)
      .then((res : Ivalidate) => {
        console.log(res)
        if(res.status){
          Router.getInstance().redirect(ROUTES.CHAT_ROUTE);
        }
      })
      .catch(err => {throw new Error(err)});
  }
}
