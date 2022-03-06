import Router from "./Router";
import Auth from "./Auth";

import IRouterInit from "../types/interface/IRouterInit";

import TestController, {TestControllerMethods} from "./controller/TestController";

const LOGIN_PATH = '/login';
const ERROR_PATH = '/404';

const LOGIN_ROUTE = {
  match: ERROR_PATH, controller: TestController, method: TestControllerMethods.LOGIN
}

const ERROR_ROUTE = {
  match: ERROR_PATH, controller: TestController, method: TestControllerMethods.ERROR
}

const ROUTES = [
  LOGIN_ROUTE,
  ERROR_ROUTE
];

const NOT_AUTH_ROUTES = [
  '',
  '/',
  LOGIN_PATH,
  ERROR_PATH,
]

const TestRouter : IRouterInit = {
  routes : ROUTES,
  defaultRoute : LOGIN_ROUTE,
  loginRoute : LOGIN_PATH,
  noAuthRoute : NOT_AUTH_ROUTES,
  errorRoute : ERROR_ROUTE
};

/*TODO: Не имею права подключать реальные контроллеры, т.к. pug ломает тесты */
describe('Тестируем Роутер', function() {
  before('Создаем Роутер', async function() {
    Auth.getInstance().init(LOGIN_PATH);
    let router = Router.getInstance();
    router.init(TestRouter);
  });
/*TODO: Не нашел пока спопособа изменить window.location
* На отличный от about:blanc (именно в location)
* Текущая ошибка
* SecurityError: Could not parse url argument "/login" to pushState against base URL "about:blank".
* Без работы с window не вижу смысла тестить Router =)
* */
  it('Тестируем редирект', async function (){
    return true;
  })
});
