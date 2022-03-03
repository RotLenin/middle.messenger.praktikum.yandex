import Router from '../Router';
import Stash, {STASH_ENUM} from '../Stash';
import DefaultController from './DefaultController';
import FormTemplate from '../view/Form';
import StaticModel from '../model/StaticModel';

import Ivalidate from '../../types/interface/Ivalidate';
import Isignup from '../../types/interface/Isignup';
import Ilogin from '../../types/interface/Ilogin';

import {signup, login, userInfo} from '../../api/auth';

import * as ROUTES from '../../constants/routes';
import {CHAT_ROUTE, LOGIN_ROUTE} from '../../constants/routes';

export enum AUTH_METHODS {
  LOGIN = 'login',
  SIGNUP = 'signup',
}

/** Auth
 * Контролер для Логина/Авторизации, так как они фактически отличаются
 * только парой входных параметров */
export default class Auth extends DefaultController {
  private _form: HTMLElement;
  private static instance: Auth;
  public _template = FormTemplate;

  /** constructor */
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
    if (await this._checkUser()) {
      console.log('_checkUser');
      return true;
    }

    const locals = await StaticModel.getLoginLocals()
        .then((res: Record<string, any>) => res.default);
    const form = await this._renderTemplate(locals)

    if (!this._mountTemplate(form)) {
      throw new Error('Can\'t mount template');
    }

    this._setForm()
    this._setInputValidation(this._form)
    this._auth()
    this.initSPALinks()

    this.setLastTemplate();
  }

  /** signup
   * Получаем данные для шаблона auth, выставляем обработчики
   */
  async signup() {
    if (await this._checkUser()) {
      return true;
    }

    const locals = await StaticModel.getSignupLocals()
        .then((res : Record<string, any>) => res.default);
    const form = await this._renderTemplate(locals)

    if (!this._mountTemplate(form)) {
      throw new Error('Can\'t mount template');
    }

    this._setForm()
    this._setInputValidation(this._form)
    this._signup()
    this.initSPALinks()

    this.setLastTemplate();
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
   *  @description Ищем кнопку для действия
   *  @throws {string}
   *  @return {HTMLElement}
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
   *  @return {boolean}
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
          if (res.status) {
          // @ts-ignore
            const data : Ilogin = res.data
            login(data)
                .then((res) => {
                  if (res === 'OK') {
                    userInfo()
                        .then((res) => {
                          Stash.getInstance().setState('user', res);
                          Router.getInstance().redirect(ROUTES.CHAT_ROUTE);
                        })
                  }
                })
          }
        })
        .catch((err) => {
          throw new Error(err)
        });
  }

  /** _signup
   *  @description Вешаем событие на кнопку
   *  @return {boolean}
   */
  _signup() {
    if (this._form instanceof HTMLElement) {
      this._getAcceptBtn().addEventListener('click', this._signupAction);
      return true;
    }
    throw new Error('can\'t find .form');
  }

  /** _signupAction
   *  @description Действия при нажатии кнопки регистрация
   */
  _signupAction() {
    this._validate(this._form)
        .then((res : Ivalidate) => {
          if (res.status) {
          // @ts-ignore
            const data : Isignup = res.data
            signup(data)
                .then((res) => {
                  console.log(res);
                  Router.getInstance().redirect(LOGIN_ROUTE)
                })
          }
        })
        .catch((err) => {
          throw new Error(err)
        });
  }

  /** _checkUser
   *  @description Проверяем пользователя
   *  @return {boolean}
   */
  async _checkUser() {
    /** Проверяем пользователя на авторизацию, если уже зашел - кидаем на чат
     *  Проверяем наличие метки о проверки пользователя
     * */
    const user = Stash.getInstance().getState(STASH_ENUM.USER);
    if (user.id) {
      Router.getInstance().redirect(CHAT_ROUTE)
      return true;
    }

    /** TODO: Разобраться что тут и как :D */
    if (user === {}) {
      const user = await this.checkUser();
      if (user.status === 200) {
        Stash.getInstance().setState(STASH_ENUM.USER, user.response)
        Router.getInstance().redirect(CHAT_ROUTE)
        return true;
      } else {
        /** Выставляем метку что, пользователь не авторизован,
         *  чтобы не спамить запросами на проверку
         */
        Stash.getInstance().setState(STASH_ENUM.USER, {});
        return false
      }
    }
    return false;
  }
}
