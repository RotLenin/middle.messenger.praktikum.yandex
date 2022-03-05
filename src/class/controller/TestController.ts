import DefaultController from "./DefaultController";
import Ilocals from "../../types/interface/Ilocals";

export enum TEST_CONTROLLER_METHODS {
  LOGIN = 'login',
  ERROR = 'error',
}

export default class TestController extends DefaultController {
  private static instance: TestController;
  public _template : (locals : Ilocals) => string;

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
