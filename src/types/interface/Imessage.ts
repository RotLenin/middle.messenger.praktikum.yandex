export default interface Imessage{
  // TODO: сверять с возможными типами
  type : string;
  message? : string;
  src? : string;
  // TODO: как дадут api - узнаем в каком формате приходят данные
  time : string;
  // TODO: Пока bool, потом будет ID автора
  author : boolean;
}
