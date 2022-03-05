import Router from './class/Router';
import Stash from './class/Stash';
import Modal from './class/Modal';
import Auth from './class/Auth';

import {
  ERROR_ROUTE, DEFAULT_ROUTE, NOT_AUTH_ROUTES, ROUTES, LOGIN_ROUTE
} from "./constants/routes";

Stash.getInstance().init();
Auth.getInstance().init(LOGIN_ROUTE);
Router.getInstance().init({
  routes : ROUTES,
  defaultRoute : DEFAULT_ROUTE,
  loginRoute : LOGIN_ROUTE,
  noAuthRoute : NOT_AUTH_ROUTES,
  errorRoute : ERROR_ROUTE
});
Router.getInstance().findRoute();
Modal.getInstance().init();
