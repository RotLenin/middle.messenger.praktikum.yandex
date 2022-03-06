import {login, userInfo, logout} from "./auth";
import { expect } from "chai";
import IUser from "../types/interface/IUser";

describe('Тестируем auth Api', function() {
  const realUser : IUser = {
    avatar: '/3ba579cf-6629-4990-9338-0cc7501d5889/82077cd0-e08d-42a8-be8b-f1ae15de79cb_logo512.png',
    id : 182482,
    email : 'rotlenintest6@yandex.ru',
    login : 'rotlenintest6',
    first_name : 'Vladimir',
    second_name : 'Ilich',
    display_name : 'Ilich',
    phone : '+79000000006',
    password : 'P@ssw0rd123',
  };

  const fakeUser : IUser = {
    avatar: null,
    id : 1111111111111111,
    email : 'aa123213213aaa@aa123213213aaa.ru',
    login : 'aa123213213aaa',
    first_name : 'aa123213213aaa',
    second_name : 'aa123213213aaa',
    display_name : 'aa123213213aaa',
    phone : '+79000000006',
    password : 'P@ssw0rd123',
  };

  describe('Тестируем login', function() {
    it('Логин с не корректными данными', async function (){
      let res = await login({login : fakeUser.login, password : fakeUser.password});
      expect(res, '{"reason":"Login or password is incorrect"}');
    });

    it('Логин с корректными данными', async function (){
      let res = await login({login : realUser.login, password : realUser.password});
      expect(res, 'OK');
    });
  });

  describe('Тестируем logout', function (){
    before(async function(){
      await login({login : fakeUser.login, password : fakeUser.password});
    })

    it('Logout после успешного login', async function() {
      let res = await logout();
      expect(res.response, 'OK')
    })

    it('Logout без авторизации', async function() {
      let res = await logout();
      expect(res, '{"reason":"Cookie is not valid"}')
    })
  });

  describe('Тестируем userInfo', function (){
    it('userInfo без авторизации', async function (){
      try {
        await userInfo();
        return false;
      } catch (err){
        return true;
      }
    });

    it('userInfo c авторизацией', async function (){
      await login({login : realUser.login, password : realUser.password});
      let res = await userInfo();
      expect(res.status, '200');
    });
  });


  /** TODO Регистрацию не тестирую, т.к. нет доступа к удалению пользователя */
});
