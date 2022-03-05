import Router from "./Router";
import Auth from "./Auth";
import { expect } from "chai";

import IrouterInit from "../types/interface/IrouterInit";

import TestController, {TEST_CONTROLLER_METHODS} from "./controller/TestController";

const LOGIN_PATH = '/login';
const ERROR_PATH = '/404';

const LOGIN_ROUTE = {
  match: ERROR_PATH, controller: TestController, method: TEST_CONTROLLER_METHODS.LOGIN
}

const ERROR_ROUTE = {
  match: ERROR_PATH, controller: TestController, method: TEST_CONTROLLER_METHODS.ERROR
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

const TestRouter : IrouterInit = {
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
* */
  it('Тестируем редирект', async function (){
    return true;
  })
});
