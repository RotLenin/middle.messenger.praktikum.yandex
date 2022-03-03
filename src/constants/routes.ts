import Iroute from '../types/interface/Iroute';

import Auth, {AUTH_METHODS} from '../class/controller/Auth';
import NewChat, {CHAT_METHODS} from '../class/controller/NewChat';
import Profile, {PROFILE_METHODS} from '../class/controller/Profile';
import Error, {ERROR_METHODS} from '../class/controller/Error';

export const LOGIN_ROUTE = '/login';
export const SIGNUP_ROUTE = '/signup';

export const CHAT_ROUTE = '/chat';
export const CHAT_SELECTED_ROUTE = [CHAT_ROUTE, ':id'].join('/');

export const PROFILE_ROUTE = '/profile';
export const PROFILE_CHANGE_INFO_ROUTE = [PROFILE_ROUTE, 'change'].join('/');
export const PROFILE_PASSWORD_ROUTE = [PROFILE_ROUTE, 'password'].join('/');

export const ERROR_404 = '/404';
export const ERROR_500 = '/500';

export const ROUTES: Iroute[] = [
  {match: LOGIN_ROUTE, controller: Auth, method: AUTH_METHODS.LOGIN},
  {match: SIGNUP_ROUTE, controller: Auth, method: AUTH_METHODS.SIGNUP},
  // {match: CHAT_ROUTE, controller: Chat, method: CHAT_METHODS.CHAT},
  // {match: CHAT_SELECTED_ROUTE, controller: Chat, method: CHAT_METHODS.SELECTED},
  {match: CHAT_ROUTE, controller: NewChat, method: CHAT_METHODS.CHAT},
  {match: CHAT_SELECTED_ROUTE, controller: NewChat, method: CHAT_METHODS.SELECTED},
  {match: PROFILE_ROUTE, controller: Profile, method: PROFILE_METHODS.PROFILE},
  {
    match: PROFILE_CHANGE_INFO_ROUTE,
    controller: Profile,
    method: PROFILE_METHODS.CHANGE,
  },
  {
    match: PROFILE_PASSWORD_ROUTE,
    controller: Profile,
    method: PROFILE_METHODS.PASSWORD,
  },
  {match: ERROR_404, controller: Error, method: ERROR_METHODS.ERROR_404},
  {match: ERROR_500, controller: Error, method: ERROR_METHODS.ERROR_500},
];

// По умолчанию кидаем на логин
export const DEFAULT_ROUTE = {
  match: LOGIN_ROUTE,
  controller: Auth, method:
  AUTH_METHODS.LOGIN,
};

export const ERROR_ROUTE = {
  match: ERROR_404,
  controller: Error,
  method: ERROR_METHODS.ERROR_404,
};

export const NOT_AUTH_ROUTES = [
  '',
  '/',
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
  /** TODO: по сути тут еще должны быть ошибки, но там возврат в чат... */
]
