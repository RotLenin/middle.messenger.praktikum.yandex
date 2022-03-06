import Stash from "../Stash";

import IChat from "../../types/interface/IChat";

import {createChats, getChats, deleteChat, getChatToken} from "../../api/chats";
import MessageWS from "../../websocket/message";

/** addChat
 *
 * @param {string} chatName
 * @return {boolean}
 */
export async function createChatModel(chatName : string){
  const addRes = await createChats(chatName);
  if (addRes.status === 200) {
    let chatRes = await getChats(0, 20, chatName);
    // @ts-ignore
    if(chatRes.code && chatRes.code !== 200){
      throw new Error('Can\'t get added chat !');
    }
    let chat : IChat = JSON.parse(chatRes.response)[0];
    let stash = Stash.getInstance();
    chat = await prepareChat(chat);
    stash.addChat(chat);
    stash.updateChat();
    return true;
  }
  return false;
}

/** prepareChat
 * @description подготавливаем чат
 * @param {IChat} chat
 * @return {Promise<IChat>}
 */
export async function prepareChat(chat : IChat) : Promise<IChat> {
  const tokenRes = await getChatToken(chat.id);
  if (tokenRes.status !== 200) {
    throw new Error('Can\'t get chat token');
  }
  const token = JSON.parse(tokenRes.response).token;
  const socket = new MessageWS(Stash.getInstance().getUser().id, chat.id, token);
  if (!socket) {
    throw new Error('Can\'t create websocket');
  }
  chat.ws = socket;
  chat.messages = [];
  socket.getOldMessages();

  return chat;
}

/** deleteChatModel
 * @description deleteChatModel
 * @param {number} chatId
 * @return {Promise<boolean>}
 */
export async function deleteChatModel(chatId : number){
  const addRes = await deleteChat(chatId);
  if (addRes.status === 200) {
    let stash = Stash.getInstance();
    stash.deleteChat(chatId);
    stash.updateChat();
    return true;
  }
  return false;
}
