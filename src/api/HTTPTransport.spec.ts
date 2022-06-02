import HTTPTransport from './HTTPTransport';
import {expect} from 'chai';

describe('Тестируем HTTPtransport', function() {
  describe('Создаем экземпляер HTTPtransport', function() {
    let transport : HTTPTransport;

    beforeEach(() => {
      transport = new HTTPTransport('/test');
    })

    it('Тестируем get запрос', async function() {
      const res = await transport.get('', {});
      expect(res.status, '404');
    });

    it('Тестируем post запрос', async function() {
      const res = await transport.post('', {});
      expect(res.status, '404');
    });

    it('Тестируем put запрос', async function() {
      const res = await transport.put('', {});
      expect(res.status, '404');
    });

    it('Тестируем delete запрос', async function() {
      const res = await transport.delete('', {});
      expect(res.status, '404');
    });
  });
});
