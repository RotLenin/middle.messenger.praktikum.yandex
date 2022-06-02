import * as ROUTES from './routes';

import IInputWithError from '../types/interface/IInputWithError';
import ISPALink from '../types/interface/ISPALink';

import send from '../static/img/send.png';
import ILocals from '../types/interface/ILocals';

const profileFields = [
  {name: 'email', title: 'Почта', value: null},
  {name: 'login', title: 'Логин', value: null},
  {name: 'first_name', title: 'Имя', value: null},
  {name: 'second_name', title: 'Фамилия', value: null},
  {name: 'display_name', title: 'Имя в чате', value: null},
  {name: 'phone', title: 'Телефон', value: null},
];

const profileChangeInfo: IInputWithError[] = [
  {
    name: 'email',
    value: 'pochta@yandex.ru',
    label: 'Почта',
    type: 'email',
    errorText: 'Не корректный email',
  },
  {
    name: 'login',
    value: 'ivanivanov',
    label: 'Логин',
    type: 'text',
    errorText: 'Не корректный login',
  },
  {
    name: 'first_name',
    value: 'Иван',
    label: 'Имя',
    type: 'text',
    errorText: 'Не корректное имя',
  },
  {
    name: 'second_name',
    value: 'Иванов',
    label: 'Фамилия',
    type: 'text',
    errorText: 'Не корректная фамилия',
  },
  {
    name: 'display_name',
    value: 'Иван',
    label: 'Имя в чате',
    type: 'text',
    errorText: 'Не корректный login',
  },
  {
    name: 'phone',
    value: '7 (909) 967 30 30',
    label: 'Телефон',
    type: 'tel',
    errorText: 'Не корректный телефон',
  },
];

const profileChangePassword: IInputWithError[] = [
  {
    name: 'oldPassword',
    value: null,
    label: 'Старый пароль',
    type: 'password',
    errorText: 'Не корректный пароль',
  },
  {
    name: 'newPassword',
    value: null,
    label: 'Новый пароль',
    type: 'password',
    errorText: 'Не корректный новый пароль',
  },
  {
    name: 'reNewPassword',
    value: null,
    label: 'Повторите новый пароль',
    type: 'password',
    errorText: 'Не корректный новый пароль',
  },
];

const profileLink: ISPALink = {title: 'Назад', path: ROUTES.PROFILE_ROUTE};
const change: ISPALink = {
  title: 'Изменить данные',
  path: ROUTES.PROFILE_CHANGE_INFO_ROUTE,
};
const password: ISPALink = {
  title: 'Изменить пароль',
  path: ROUTES.PROFILE_PASSWORD_ROUTE,
};

const out = {title: 'Выйти', id: 'logout'};
const backBtn = {img: send, path: ROUTES.CHAT_ROUTE};

const profile : Record<string, ILocals> = {
  profile: {
    headers: {
      title: 'Профиль',
    },
    locals: {
      state: 'main',
      change: change,
      password: password,
      out: out,
      profile: profileFields,
      backBtn: backBtn,
    },
  },
  change: {
    headers: {
      title: 'Профиль - изменить данные',
    },
    locals: {
      state: 'change',
      profile: profileChangeInfo,
      back: profileLink,
      backBtn: backBtn,
    },
  },
  password: {
    headers: {
      title: 'Профиль - изменить данные',
    },
    locals: {
      state: 'password',
      profile: profileChangePassword,
      back: profileLink,
      backBtn: backBtn,
    },

  },
};

export default profile;
