import IChat from './IChat';

export default interface IChatLocals{
    menu : {
      addChatImg : string,
      chats : IChat[]
    },
    body : {
      selectedChat : IChat | null
    }
    template? : any
}
