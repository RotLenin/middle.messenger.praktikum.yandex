import Router from "./Router";
import { expect } from "chai";

describe('Тестируем Роутер', function() {
  before('Создаем Роутер', function() {
    Router.getInstance()
  });

  describe('Router find route', function() {
    it('should return -1 when the value is not present', function() {
      expect(console.log('123'), '123');
    });
  });
});
