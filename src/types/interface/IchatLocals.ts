import Ilocals from './Ilocals';
import Ichat from './Ichat';
import Imessage from './Imessage';

// TODO: Скорее всего будем декомпозировать
import Idropdown from './Idropdown';

export default interface IchatLocals extends Ilocals{
  locals : {
    chats : Ichat[]
    attachmentDropdown : Idropdown[],
    dotDropdown : Idropdown[],
    messages : Imessage[],
    profileLink? : string,
    selectedChat? : any,
  }
}
