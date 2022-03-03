import Ilocals from '../types/interface/Ilocals';
import ISPALink from '../types/interface/ISPALink';

import {CHAT_ROUTE} from './routes';

const backBtn : ISPALink = {title: 'Назад к чатам', path: CHAT_ROUTE}

export const ERROR_404 : Ilocals = {
  headers: {
    title: 'Ошибка - 404',
  },
  locals: {
    code: '404',
    infoText: 'Не туда попали',
    backBtn: backBtn,
  },
}

export const ERROR_500 : Ilocals = {
  headers: {
    title: 'Ошибка - 500',
  },
  locals: {
    code: '500',
    infoText: 'Мы уже фиксим',
    backBtn: backBtn,
  },
}
