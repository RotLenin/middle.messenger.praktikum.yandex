import DefaultController from "./DefaultController";
import ILocals from "../../types/interface/ILocals";

export enum TestControllerMethods {
  LOGIN = 'login',
  ERROR = 'error',
}

export default class TestController extends DefaultController {
  private static instance: TestController;
  public _template : (locals : ILocals) => string;

  constructor(){
    super();
  }

  public static getInstance(): TestController {
    if (!TestController.instance) {
      TestController.instance = new TestController();
    }
    return TestController.instance;
  }

  login(){
    console.log('TestController login');
  }

  error(){
    console.log('TestController error');
  }
}
