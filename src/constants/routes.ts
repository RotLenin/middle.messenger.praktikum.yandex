import IRoute from '../types/interface/IRoute';

import Auth, {AuthMethods} from '../class/controller/Auth';
import NewChat, {ChatMethods} from '../class/controller/NewChat';
import Profile, {ProfileMethods} from '../class/controller/Profile';
import Error, {ErrorMethods} from '../class/controller/Error';

export const LOGIN_ROUTE = '/login';
export const SIGNUP_ROUTE = '/signup';

export const CHAT_ROUTE = '/chat';
export const CHAT_SELECTED_ROUTE = [CHAT_ROUTE, ':id'].join('/');

export const PROFILE_ROUTE = '/profile';
export const PROFILE_CHANGE_INFO_ROUTE = [PROFILE_ROUTE, 'change'].join('/');
export const PROFILE_PASSWORD_ROUTE = [PROFILE_ROUTE, 'password'].join('/');

export const ERROR_404 = '/404';
export const ERROR_500 = '/500';

export const ROUTES: IRoute[] = [
  {match: LOGIN_ROUTE, controller: Auth, method: AuthMethods.LOGIN},
  {match: SIGNUP_ROUTE, controller: Auth, method: AuthMethods.SIGNUP},
  // {match: CHAT_ROUTE, controller: Chat, method: ChatMethods.CHAT},
  // {match: CHAT_SELECTED_ROUTE, controller: Chat, method: ChatMethods.SELECTED},
  {match: CHAT_ROUTE, controller: NewChat, method: ChatMethods.CHAT},
  {match: CHAT_SELECTED_ROUTE, controller: NewChat, method: ChatMethods.SELECTED},
  {match: PROFILE_ROUTE, controller: Profile, method: ProfileMethods.PROFILE},
  {
    match: PROFILE_CHANGE_INFO_ROUTE,
    controller: Profile,
    method: ProfileMethods.CHANGE,
  },
  {
    match: PROFILE_PASSWORD_ROUTE,
    controller: Profile,
    method: ProfileMethods.PASSWORD,
  },
  {match: ERROR_404, controller: Error, method: ErrorMethods.ERROR_404},
  {match: ERROR_500, controller: Error, method: ErrorMethods.ERROR_500},
];

// По умолчанию кидаем на логин
export const DEFAULT_ROUTE = {
  match: LOGIN_ROUTE,
  controller: Auth, method:
  AuthMethods.LOGIN,
};

export const ERROR_ROUTE = {
  match: ERROR_404,
  controller: Error,
  method: ErrorMethods.ERROR_404,
};

export const NOT_AUTH_ROUTES = [
  '',
  '/',
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
]
