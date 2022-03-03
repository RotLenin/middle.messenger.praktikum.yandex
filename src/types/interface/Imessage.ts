import {MESSAGE_TYPES} from '../../constants/messageTypes';

export default interface Imessage{
  id : number;
  user_id : number;
  chat_id? : number;
  type : MESSAGE_TYPES;
  content : string;
  time : string;
  formatDate? : string;
  is_read : boolean;
  file : null;
}
