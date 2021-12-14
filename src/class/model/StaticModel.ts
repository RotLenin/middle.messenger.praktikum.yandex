import DefaultModel from './DefaultModel';

/** StaticModel
 *  Отдает данные со статики, пока нет API
 */
export default class StaticModel extends DefaultModel {
  /** getLoginLocals
   *  Получаем locals для шаблона login
   *  @return {object}
   */
  public static getLoginLocals() : Record<string, any> {
    return import('../../data/login');
  }

  /** getSignupLocals
   *  Получаем locals для шаблона signup
   *  @return {object}
   */
  public static getSignupLocals() : Record<string, any> {
    return import('../../data/signup');
  }

  /** getChatLocals
   *  Получаем locals для шаблона chat
   *  @return {object}
   */
  public static getChatLocals() : Record<string, any> {
    return import('../../data/chats');
  }

  /** getMessages
   *  Получаем messages
   *  @return {object}
   */
  public static getMessages() : Record<string, any> {
    return import('../../data/messages');
  }

  /** getMessagesForChat
   *  Получаем messages для конкретного чата
   *  @param {number} id
   *  @return {object}
   */
  public static getMessagesForChat(id : number) : Record<string, any> {
    return this.getMessages()
        .then((res: { default: any[]; }) => {
          return res.default.find((el) => {
            return el.chatId === id;
          });
        });
  }

  /** getProfileLocals
   *  Получаем locals для шаблона profile
   *  @return {object}
   */
  public static getProfileLocals() : Record<string, any> {
    return import('../../data/profile');
  }
}
