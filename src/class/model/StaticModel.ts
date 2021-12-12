import DefaultModel from './DefaultModel';

/** StaticModel
 *  Отдает данные со статики, пока нет API
 */
export default class StaticModel extends DefaultModel {
  /** getLoginLocals
   *  Получаем locals для шаблона login
   *  @return {object}
   */
  public static getLoginLocals() {
    return import('../../data/login');
  }

  /** getSignupLocals
   *  Получаем locals для шаблона signup
   *  @return {object}
   */
  public static getSignupLocals() {
    return import('../../data/signup');
  }

  /** getChatLocals
   *  Получаем locals для шаблона chat
   *  @return {object}
   */
  public static getChatLocals() {
    return import('../../data/chats');
  }

  /** getMessages
   *  Получаем messages
   *  @return {object}
   */
  public static getMessages() {
    return import('../../data/messages');
  }

  /** getMessagesForChat
   *  Получаем messages для конкретного чата
   *  @param {number} id
   *  @return {object}
   */
  public static getMessagesForChat(id : number) {
    return this.getMessages()
        .then((res) => {
          return res.default.find((el) => {
            return el.chatId === id;
          });
        });
  }

  /** getProfileLocals
   *  Получаем locals для шаблона profile
   *  @return {object}
   */
  public static getProfileLocals() {
    return import('../../data/profile');
  }
}
