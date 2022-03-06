import {MessageTypes} from '../../constants/messageTypes';

export default interface IMessage{
  id : number;
  user_id : number;
  chat_id? : number;
  type : MessageTypes;
  content : string;
  time : string;
  formatDate? : string;
  is_read : boolean;
  file : null;
}
