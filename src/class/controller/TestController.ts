import DefaultController from './DefaultController';
import ILocals from '../../types/interface/ILocals';

export enum TestControllerMethods {
  LOGIN = 'login',
  ERROR = 'error',
}

/** TestController
 *  @description Контроллер для тестирования Роутера
 */
export default class TestController extends DefaultController {
  private static instance: TestController;
  public _template : (locals : ILocals) => string;

  /**
   *
   */
  constructor() {
    super();
  }

  /** getInstance
   * @description Получаем экземпляр класса
   * @return {TestController}
   */
  public static getInstance(): TestController {
    if (!TestController.instance) {
      TestController.instance = new TestController();
    }
    return TestController.instance;
  }

  /** login
   *
   */
  login() {
    console.log('TestController login');
  }

  /** error
   *
   */
  error() {
    console.log('TestController error');
  }
}
