import {queryStringify} from '../utils/queryString';

import Iroute from '../types/interface/Iroute';

import {ROUTES, DEFAULT_ROUTE} from '../constants/routes';

/**
 *  Трудно заставить parcel вечно смотреть на index.html
 *  Так что будем ходить по get параметрам
 *  TODO: Возможно есть смысл перейти на жэш роутер
 *  */
export default class Router {
  // @ts-ignore
  private _route: Iroute;
  private _origin = location.origin + '/index.html';

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

  /** findRoute
   *  Ищем роут для текущей страницы
   */
  public findRoute() {
    if (location.search === '') {
      this._route = DEFAULT_ROUTE;
      this._runMethod([]);
      return;
    }

    const params = new URLSearchParams(document.location.search);
    const path: string | null = params.get('path');
    /** Если нет пути - то идем на стандартный Роут */
    if (!path) {
      this._route = DEFAULT_ROUTE;
      this._runMethod([]);
      return;
    }
    /** Обходим наши проверки */
    // @ts-ignore
    this._route = ROUTES.find(
        (route) => path.match(this._createRegExp(route.match))
    );
    this._runMethod(this._getMatches(path));
    if (!this._route) {
      console.log('404');
    }
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
        return '(\\d)'
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
    const regex = new RegExp(this._createRegExp(this._route.match), 'g');

    while ((match = regex.exec(path))) {
      matches.push(match[index]);
    }
    return matches;
  }

  /** redirect
   * Вместо оперезагрузки страницы - push-им в историю и запускаем Router
   * @param {string}path
   */
  public redirect(path : string) {
    history.pushState(
        {},
        '',
        this._origin + '?' + queryStringify({path: path})
    );
    this.findRoute();
  }
}
