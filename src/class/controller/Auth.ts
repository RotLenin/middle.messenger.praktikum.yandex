import Router from '../Router';
import DefaultController from './DefaultController';
import FormTemplate from '../view/Form';
import StaticModel from '../model/StaticModel';

import * as ROUTES from '../../constants/routes';

import {validationForm} from '../../utils/inputValidation';

export enum AUTH_METHODS {
  LOGIN = 'login',
  SIGNUP = 'signup',
}

/** Auth
 * Контролер для Логина/Авторизации, так как они фактически отличаются
 * только парой входных параметров */
export default class Auth extends DefaultController {
  private _form: any;
  private static instance: Auth;

  /**
   *
   */
  constructor() {
    super();
    this._template = FormTemplate;

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
  login() {
    StaticModel.getLoginLocals()
        .then((res) => res.default)
        .then((locals) => this._renderTemplate(locals))
        .then((form) => this._mountTemplate(form))
        .then(() => this._setForm())
        .then(() => this._setInputValidation(this._form))
        .then(() => this._auth())
        .then(() => this.initSPALinks());
  }

  /** signup
   * Получаем данные для шаблона auth, выставляем обработчики
   */
  signup() {
    StaticModel.getSignupLocals()
        .then((res) => res.default)
        .then((locals) => this._renderTemplate(locals))
        .then((template) => this._mountTemplate(template))
        .then(() => this._setForm())
        .then(() => this._setInputValidation(this._form))
        .then(() => this._signup())
        .then(() => this.initSPALinks());
  }

  /** _setForm
   *  Выставляем корень шаблона
   */
  _setForm() {
    this._form = document.querySelector('.form');
  }

  /** _auth
   *  Вешаем на кнопку действие при авторизации
   */
  _auth() {
    this._form.querySelector('.accept-btn')
        .addEventListener('click', this._authAction);
  }

  /** _authAction
   *  Действия при авторизации
   */
  _authAction() {
    const inputs = this._form.querySelectorAll('input');
    // @ts-ignore
    const {errors, data} = validationForm(inputs);
    if (errors.length === 0) {
      Router.getInstance().redirect(ROUTES.CHAT_ROUTE);
    }
  }

  /** _signup
   *  Вешаем событие на кнопку
   */
  _signup() {
    this._form.querySelector('.accept-btn')
        .addEventListener('click', this._signupAction);
  }

  /** _signupAction
   *  Действия при нажатии кнопки регистрация
   */
  _signupAction() {
    const inputs = this._form.querySelectorAll('input');
    // @ts-ignore
    const {errors, data} = validationForm(inputs);
    if (errors.length === 0) {
      Router.getInstance().redirect(ROUTES.CHAT_ROUTE);
    }
  }
}
