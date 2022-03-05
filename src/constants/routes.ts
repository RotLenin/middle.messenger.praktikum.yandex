import Iroute from '../types/interface/Iroute';

import Auth, {AUTH_METHODS} from '../class/controller/Auth';
import Chat, {CHAT_METHODS} from '../class/controller/Chat';
import Profile, {PROFILE_METHODS} from '../class/controller/Profile';

export const LOGIN_ROUTE = 'login';
export const SIGNUP_ROUTE = 'signup';

export const CHAT_ROUTE = 'chat';
export const CHAT_SELECTED_ROUTE = [CHAT_ROUTE, ':id'].join('/');

export const PROFILE_ROUTE = 'profile';
export const PROFILE_CHANGE_INFO_ROUTE = [PROFILE_ROUTE, 'change'].join('/');
export const PROFILE_PASSWORD_ROUTE = [PROFILE_ROUTE, 'password'].join('/');

export const ROUTES: Iroute[] = [
  {match: LOGIN_ROUTE, controller: Auth, method: AUTH_METHODS.LOGIN},
  {match: SIGNUP_ROUTE, controller: Auth, method: AUTH_METHODS.SIGNUP},
  {match: CHAT_ROUTE, controller: Chat, method: CHAT_METHODS.CHAT},
  {match: CHAT_SELECTED_ROUTE, controller: Chat, method: CHAT_METHODS.SELECTED},
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
];

// По умолчанию кидаем на логин
export const DEFAULT_ROUTE = {
  match: LOGIN_ROUTE,
  controller: Auth, method:
  AUTH_METHODS.LOGIN,
};

export const ERROR_ROUTE = {
  match: LOGIN_ROUTE,
  controller: Auth, method:
  AUTH_METHODS.LOGIN,
};
