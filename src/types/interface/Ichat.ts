import Imessage from './Imessage';

export default interface Ichat {
  id : number,
  img : string,
  name : string,
  path : string,
  notification : number,
  // TODO: В целом просто будет список сообщений, и будем брать последнее
  lastMessage : Imessage
}
