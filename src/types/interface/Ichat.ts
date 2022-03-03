import Imessage from './Imessage';
import MessageWS from '../../websocket/message';
import Block from '../../class/view/Block';

export default interface Ichat {
  id : number,
  img : string,
  name : string,
  notification : number,
  // TODO: В целом просто будет список сообщений, и будем брать последнее
  lastMessage : Imessage,
  path? : string,
  selected? : boolean,
  messages? : Imessage[],
  ws? : MessageWS,
  consumers? : Block<any>[],
}
