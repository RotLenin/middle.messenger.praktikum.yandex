import Stash, {STASH_ENUM} from "../Stash";

import Ichat from "../../types/interface/Ichat";

import {createChats, getChats} from "../../api/chats";

/** addChat
 *
 * @param {string} chatName
 * @return {boolean}
 */
export async function addChat(chatName : string){
  const addRes = await createChats(chatName);
  if (addRes.status === 200) {
    let chatRes = await getChats(0, 20, chatName);
    // @ts-ignore
    if(chatRes.code && chatRes.code !== 200){
      throw new Error('Can\'t get added chat !');
    }
    let chat : Ichat = JSON.parse(chatRes.response);
    Stash.getInstance().setState(STASH_ENUM.CHATS, chat);
    Stash.getInstance().updateChat();
    return true;
  }
  return false;
}
