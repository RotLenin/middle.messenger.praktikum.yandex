import Stash, {StashEnum} from './Stash';
import Router from './Router';

import {userInfo} from '../api/auth';

/** Auth
 *  @description отвечает за login и регистрацию
 */
export default class Auth {
  private static instance: Auth;
  /** Авторизован ли пользователь */
  private _status = false;
  private _loginPath : string;

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

  public init(loginPath : string){
    this._loginPath = loginPath;
  }

  /** auth
   *  Получаем данные о пользвателе, если не авторизован - кидаем на Logins
   */
  public async auth() {
    if (!this._status) {
      const res = await this.checkUser();
      if (res.status === 200) {
        this._status = true;
        Stash.getInstance().setState(StashEnum.USER, res.response);
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
    Router.getInstance().redirect(this._loginPath);
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
