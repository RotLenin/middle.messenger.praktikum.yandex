import Ichat from './Ichat';

export default interface IchatLocals{
    menu : {
      addChatImg : string,
      chats : Ichat[]
    },
    body : {
      selectedChat : Ichat | null
    }
    template? : any
}
