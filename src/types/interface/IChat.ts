import IMessage from './IMessage';
import MessageWS from '../../websocket/message';
import Block from '../../class/view/Block';

export default interface IChat {
  id : number,
  img : string,
  name : string,
  notification : number,
  lastMessage : IMessage,
  path? : string,
  selected? : boolean,
  messages? : IMessage[],
  ws? : MessageWS,
  consumers? : Block<any>[],
}
