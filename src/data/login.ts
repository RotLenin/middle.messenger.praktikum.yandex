import IinputWithError from '../types/interface/IinputWithError';
import Ilocals from '../types/interface/Ilocals';
import ISPALink from '../types/interface/ISPALink';

const inputs: IinputWithError[] = [
  {
    name: 'login',
    label: 'Логин',
    placeholder: 'Логин',
    type: 'text',
    errorText: 'Некоректный логин',
  },
  {
    name: 'password',
    label: 'Пароль',
    placeholder: 'Пароль',
    type: 'password',
    errorText: 'Некоректный пароль',
  },
];

const second: ISPALink = {title: 'Нет аккаунта ?', path: 'signup'};

const login: Ilocals = {
  headers: {
    title: 'Логин',
  },
  locals: {
    inputs: inputs,
    title: 'Войти',
    accept: 'Вход',
    second: second,
  },
};

export default login;
