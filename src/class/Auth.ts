import Stash, {STASH_ENUM} from './Stash';
import {userInfo} from '../api/auth';
import Router from './Router';

import {LOGIN_ROUTE} from '../constants/routes';

/** Auth
 *  @description отвечает за login и регистрацию
 */
export default class Auth {
  private static instance: Auth;
  /** Авторизован ли пользователь */
  private _status = false;

  /** getInstance
   *  Получаем экземпляр singleton
   *  @return {Router}
   */
  public static getInstance(): Auth {
    if (!Auth.instance) {
      Auth.instance = new Auth();
    }
    return Auth.instance;
  }

  /** auth
   *  Получаем данные о пользвателе, если не авторизован - кидаем на Logins
   */
  public async auth() {
    if (!this._status) {
      const res = await this.checkUser();
      if (res.status === 200) {
        this._status = true;
        Stash.getInstance().setState(STASH_ENUM.USER, res.response);
        return true;
      } else {
        this._status = false;
        return false;
      }
    }
    return true;
  }

  /** checkout
   *  @description чистим все данные из приложения
   */
  public checkout() {
    Stash.getInstance().clearState();
    this._status = false;
    Router.getInstance().redirect(LOGIN_ROUTE);
  }

  /** checkUser
   *  @description проверяем пользователя
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
}
