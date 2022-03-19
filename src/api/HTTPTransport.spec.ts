import HTTPTransport from "./HTTPTransport";
import { expect } from "chai";

describe('Тестируем HTTPtransport', function (){
  describe('Создаем экземпляер HTTPtransport', function (){
    let transport : HTTPTransport;

    beforeEach(() => {
      transport = new HTTPTransport('/test');
    })

    /** TODO: Честно говоря не очень понимаю как тестировать транспорт
     *  без реализации. Т.к. Транспорт сразу обрабатывает ответ
     * */
    it('Тестируем get запрос', async function (){
        let res = await transport.get('', {});
        expect(res.status, '404');
    });

    it('Тестируем post запрос', async function (){
      let res = await transport.post('', {});
      expect(res.status, '404');
    });

    it('Тестируем put запрос', async function (){
      let res = await transport.put('', {});
      expect(res.status, '404');
    });

    it('Тестируем delete запрос', async function (){
      let res = await transport.delete('', {});
      expect(res.status, '404');
    });
  });
});
