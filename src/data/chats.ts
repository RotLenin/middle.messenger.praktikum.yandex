import Ichat from '../types/interface/Ichat';

import {routeParamsReplace} from '../utils/SPALink';

import {CHAT_SELECTED_ROUTE} from '../constants/routes';
import attachmentDropdown from './attachmentDropdown';
import dotDropdown from './dotDropdown';
import messages from './messages';

import man from '../static/img/avatars/man.png';
import man1 from '../static/img/avatars/man1.png';
import man2 from '../static/img/avatars/man2.png';
import woman from '../static/img/avatars/woman.png';
import woman1 from '../static/img/avatars/woman1.png';

import sendImg from '../static/img/send.png';
import attachmentImg from '../static/img/attachment.png';

/**
 * img - пока пустое
 * author - пока будем true/false, т.к. нет состояния текущего пользователя
 * message - будет обрезаться на клиенте/сервере, пока только убрали
 * переполнения, без ...
 * time - крайне неудобно обрабатывать данные в шаблонизаторе
 */
const chats: Ichat[] = [
  {
    id: 1,
    img: man,
    name: 'Андрей',
    path: routeParamsReplace(CHAT_SELECTED_ROUTE, {id: 1}),
    notification: 2,
    lastMessage: {
      type: 'img',
      time: '10:49',
      author: false,
      message: 'Изображение',
    },
  },
  {
    id: 2,
    img: man1,
    name: 'Киноклуб',
    path: routeParamsReplace(CHAT_SELECTED_ROUTE, {id: 2}),
    notification: 0,
    lastMessage: {
      type: 'text',
      time: '12:00',
      author: true,
      message: 'стикер',
    },
  },
  {
    id: 3,
    img: woman,
    name: 'Илья',
    path: routeParamsReplace(CHAT_SELECTED_ROUTE, {id: 3}),
    notification: 4,
    lastMessage: {
      type: 'text',
      time: '15:12',
      author: false,
      message: 'Друзья, у меня для вас особенный выпуск новостей!...Друзья,' +
        ' у меня для вас особенный выпуск новостей!...',
    },
  },
  {
    id: 4,
    img: man2,
    name: 'Вадим',
    path: routeParamsReplace(CHAT_SELECTED_ROUTE, {id: 4}),
    notification: 0,
    lastMessage: {
      type: 'text',
      time: 'Пт',
      author: true,
      message: 'Круто!',
    },
  },
  {
    id: 5,
    img: woman1,
    name: 'тет-а-теты',
    path: routeParamsReplace(CHAT_SELECTED_ROUTE, {id: 5}),
    notification: 0,
    lastMessage: {
      type: 'text',
      time: '1 мая 2020',
      author: true,
      message: 'И Human Interface Guidelines и Material Design рекомендуют' +
        '...И Human Interface Guidelines и Material Design рекомендуют...',
    },
  },
];

const locals = {
  main: {
    headers: {
      title: 'Чат',
    },
    locals: {
      state: 'main',
      chats: chats,
      attachmentDropdown: attachmentDropdown,
      dotDropdown: dotDropdown,
      messages: messages,
      profileLink: 'profile',
    },
  },
  selected: {
    headers: {
      title: 'Чат',
    },
    locals: {
      state: 'selected',
      chats: chats,
      attachmentDropdown: attachmentDropdown,
      dotDropdown: dotDropdown,
      profileLink: 'profile',
      attachmentImg: attachmentImg,
      sendImg: sendImg,
    },
  },
};

export default locals;
