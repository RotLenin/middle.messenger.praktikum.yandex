import * as ROUTES from '../constants/routes';

import IinputWithError from '../types/interface/IinputWithError';
import ISPALink from '../types/interface/ISPALink';

import send from '../static/img/send.png';

const profileFields = [
  {name: 'Почта', value: 'pochta@yandex.ru'},
  {name: 'Логин', value: 'ivanivanov'},
  {name: 'Имя', value: 'Иван'},
  {name: 'Фамилия', value: 'Иванов'},
  {name: 'Имя в чате', value: 'Иван'},
  {name: 'Телефон', value: '+7 (909) 967 30 30'},
];

const profileChangeInfo: IinputWithError[] = [
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

const profileChangePassword: IinputWithError[] = [
  {
    name: 'oldPassword',
    value: '123456',
    label: 'Старый пароль',
    type: 'password',
    errorText: 'Не корректный пароль',
  },
  {
    name: 'newPassword',
    value: '123',
    label: 'Новый пароль',
    type: 'password',
    errorText: 'Не корректный новый пароль',
  },
  {
    name: 'reNewPassword',
    value: '12',
    label: 'Повторите новый пароль',
    type: 'password',
    errorText: 'Пароли не совпадают',
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
// TODO: Когда добавим приложению состояние - будем вызывать выход
const out: ISPALink = {title: 'Выйти', path: ROUTES.LOGIN_ROUTE};
const backBtn = {img: send, path: ROUTES.CHAT_ROUTE};

const profile = {
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
