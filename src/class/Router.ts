import Auth from './Auth';
// import {queryStringify} from '../utils/queryString';

import Iroute from '../types/interface/Iroute';

import {ROUTES, DEFAULT_ROUTE, LOGIN_ROUTE, NOT_AUTH_ROUTES, ERROR_ROUTE} from '../constants/routes';

/**
 *  Трудно заставить parcel вечно смотреть на index.html
 *  Так что будем ходить по get параметрам
 *  TODO: Возможно есть смысл перейти на жэш роутер
 *  */
export default class Router {
  private _route: Iroute;
  private static instance: Router;

  /** getInstance
   *  Получаем экземпляр singleton
   *  @return {Router}
   */
  public static getInstance(): Router {
    if (!Router.instance) {
      Router.instance = new Router();
    }
    return Router.instance;
  }

  /** init
   *  @description Вешаем наш роутер на window
   */
  public init() {
    window.onpopstate = this.findRoute.bind(this);
  }

  /** findRoute
   *  Ищем роут для текущей страницы
   */
  public async findRoute() {
    /** Если пользователь не авторизован - кидаем на Login */
    const auth = await Auth.getInstance().auth();
    // console.log('auth', auth);
    /** Редиректим закрытые вкладки на Login */
    if (!auth && !(NOT_AUTH_ROUTES.find((el) => el === location.pathname))) {
      this.redirect(LOGIN_ROUTE);
    }
    /** обрабатываем пустые запросы как стандартный роут Login */
    if (location.pathname === '' || location.pathname === '/') {
      this._route = DEFAULT_ROUTE;
      this._runMethod([]);
      return;
    }

    // const params = new URLSearchParams(document.location.search);
    const path: string | null = location.pathname;
    /** Если нет пути - то идем на стандартный Роут */
    if (!path) {
      this._route = DEFAULT_ROUTE;
      this._runMethod([]);
      return;
    }
    /** Обходим наши проверки */
    // @ts-ignore
    this._route = ROUTES.find(
        // @ts-ignore
        (route) => path.match(this._createRegExp(route.match))
    );
    if (!this._route) {
      this._route = ERROR_ROUTE;
      this._runMethod([]);
    }

    this._runMethod(this._getMatches(path));
  }

  /** _createRegExp
   * Создаем регулярку,
   * TODO : в идеале доработать =)
   * @param {string} match
   * @return {string}
   */
  private _createRegExp(match : string) {
    return '^' + match.split('/').map((el) => {
      if (el.includes(':')) {
        return '(\\d+)'
      }
      return el
    }).join('/') + '$';
  }

  /** _runMethod
   * Запускаем метод маршрута
   * @param {string} path
   */
  private _runMethod(path : string[]) {
    const {controller, method} = this._route;
    controller.getInstance()[method](path);
  }

  /** _getMatches
   * Вытаскиваем из пути группы RegExp
   * @param {string} path
   * @return {array}
   */
  private _getMatches(path : string) {
    const index = 1;
    const matches = [];
    let match;
    // @ts-ignore
    const regex = new RegExp(this._createRegExp(this._route.match), 'g');
    while ((match = regex.exec(path))) {
      matches.push(match[index]);
    }
    return matches;
  }

  /** redirect
   * Вместо перезагрузки страницы - push-им в историю и запускаем Router
   * @param {string}path
   */
  public redirect(path : string) {
    history.pushState(
        {},
        '',
        location.origin + path
    );
    this.findRoute();
  }
}
