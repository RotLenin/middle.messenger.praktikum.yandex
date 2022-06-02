import Stash, {StashEnum} from './Stash';
import {isEqual} from '../utils/myLodash';
import {assert} from 'chai';

describe('Тестируем Stash', function() {
  before('Создаем Stash', function() {
    Stash.getInstance().init()
  });

  describe('Stash set state', function() {
    it('Stash set state user', function() {
      const testValue = {id: 4, name: 'test'};
      Stash.getInstance().setState(StashEnum.USER, testValue)
      assert(isEqual(Stash.getInstance().getState(StashEnum.USER), testValue), 'Value not set');
    });
  });
});
