import DefaultController from './DefaultController';
import ErrorTemplate from '../view/Error';
import StaticModel from '../model/StaticModel';

export enum ErrorMethods {
  ERROR_404 = 'error404',
  ERROR_500 = 'error500',
}

/** ErrorController
 *  @description Рисовалка страниц с ошибками
 */
export default class ErrorController extends DefaultController {
  private static instance: ErrorController;
  public _template = ErrorTemplate;

  /** constructor
   *
   */
  constructor() {
    super();
  }

  /** getInstance
   *  Получаем/создаем экземпляр singleton
   *  @return {Profile}
   */
  public static getInstance(): ErrorController {
    if (!ErrorController.instance) {
      ErrorController.instance = new ErrorController();
    }
    return ErrorController.instance;
  }

  /** error404
   *  @description Ошибка 404
   */
  async error404() {
    const locals = await StaticModel.getError()
        .then((res : Record<string, any>) => res.ERROR_404);
    const error = await this.renderTemplate(locals)
    if (!this.mountTemplate(error)) {
      throw new Error('Can\'t mount template');
    }
    this.setLastTemplate();
  }

  /** error500
   *  @description Ошибка 500
   */
  async error500() {
    const locals = await StaticModel.getError()
        .then((res : Record<string, any>) => res.ERROR_500);
    const error = await this.renderTemplate(locals)
    if (!this.mountTemplate(error)) {
      throw new Error('Can\'t mount template');
    }
    this.setLastTemplate();
  }
}
