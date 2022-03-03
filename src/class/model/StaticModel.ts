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
    return import('../../constants/login');
  }

  /** getSignupLocals
   *  Получаем locals для шаблона signup
   *  @return {object}
   */
  public static getSignupLocals() : Record<string, any> {
    return import('../../constants/signup');
  }

  /** getNewChatLocals
   *  Получаем locals для шаблона chat
   *  @return {object}
   */
  public static getNewChatLocals() : Record<string, any> {
    return import('../../constants/newChats');
  }

  /** getProfileLocals
   *  Получаем locals для шаблона profile
   *  @return {object}
   */
  public static getProfileLocals() : Record<string, any> {
    return import('../../constants/profile');
  }

  /** getProfileLocals
   *  Получаем locals для шаблона profile
   *  @return {object}
   */
  public static getError() : Record<string, any> {
    return import('../../constants/errors');
  }
}
