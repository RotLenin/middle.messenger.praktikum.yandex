import Router from '../class/Router';
import {nodeListforEach} from './nodeListHelper';
import Iobject from "../types/interface/Iobject";

/** initAllSPALink
 *  ищет все элементы с data-path и вешает им событие перерисовки с Router
 */
export function initAllSPALink() {
  nodeListforEach(document.querySelectorAll(
      '[data-path]'),
  (el) => el.addEventListener('click', spaLinkElement)
  );
}

/** spaLinkElement
 *  Вытаскивает path из spaLink элемента
 *  Игнорируем this - не понимает что это handler на click
 */
function spaLinkElement() {
  // @ts-ignore
  const {path} = this.dataset;
  spaLink(path);
}

/** spaLink
 *  Вызывает Route.redirect
 *  @param {object} path
 *  @return {void}
 */
export function spaLink(path : string) {
  Router.getInstance().redirect(path);
}

/** Заменяем параметры в путях с параметрами
 *  @param {string} route - маршрут с заменяемыми параметрами : chat/:id
 *  @param {object} replace - обьект формате ключ значение, где :
 *  - ключ - имя изменяемого параметра
 *  - значение - собственно значение =)
 *  {id : 2}
 *  @return {string}
 * */
export function routeParamsReplace(route : string, replace : Iobject): string {
  for (const key in replace) {
    if (Object.prototype.hasOwnProperty.call(replace, key)) {
      const value = replace[key];
      route = route.replace(':'+key, value);
    }
  }
  return route;
}
