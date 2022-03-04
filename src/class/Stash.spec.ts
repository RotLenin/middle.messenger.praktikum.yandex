import Stash, {STASH_ENUM} from "./Stash";
import {isEqual} from "../utils/myLodash";
import { expect, assert } from "chai";

describe('Тестируем Stash', function() {
  before('Создаем Stash', function() {
    Stash.getInstance().init()
  });

  describe('Stash set state', function() {
    it('Stash set state user', function() {
      const testValue = {id : 4, name : 'test'};
      Stash.getInstance().setState(STASH_ENUM.USER, testValue)
      assert(isEqual(Stash.getInstance().getState(STASH_ENUM.USER), testValue), 'Value not set');
    });
  });
});
