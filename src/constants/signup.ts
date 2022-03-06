import IInputWithError from '../types/interface/IInputWithError';
import ILocals from '../types/interface/ILocals';
import ISPALink from '../types/interface/ISPALink';

import {LOGIN_ROUTE} from './routes';

const inputs: IInputWithError[] = [
  {
    name: 'email',
    label: 'Почта',
    placeholder: 'email@yandex.ru',
    type: 'email',
    errorText: 'Некоректная почта',
  },
  {
    name: 'login',
    label: 'Логин',
    placeholder: 'Логин',
    type: 'text',
    errorText: 'Некоректный логин',
  },
  {
    name: 'first_name',
    label: 'Имя',
    placeholder: 'Имя',
    type: 'text',
    errorText: 'Некоректное имя',
  },
  {
    name: 'second_name',
    label: 'Фамилия',
    placeholder: 'Фамилия',
    type: 'text',
    errorText: 'Некоректная фамилия',
  },
  {
    name: 'phone',
    label: 'Телефон',
    placeholder: '79099673030',
    type: 'tel',
    errorText: 'Некоректный телефон',
  },
  {
    name: 'password',
    label: 'Пароль',
    placeholder: 'Пароль',
    type: 'password',
    errorText: '',
  },
  {
    name: 'repassword',
    label: 'Пароль',
    placeholder: 'Пароль',
    type: 'password',
    errorText: 'Пароли не совпадают',
  },
];

const second: ISPALink = {title: 'Войти', path: LOGIN_ROUTE};

const signup: ILocals = {
  headers: {
    title: 'Регистрация',
  },
  locals: {
    inputs: inputs,
    title: 'Регистрация',
    accept: 'Зарегистрироваться',
    second: second,
  },
};

export default signup;
