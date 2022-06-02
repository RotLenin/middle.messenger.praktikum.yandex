import PageBlock from './PageBlock';
import IPageBlock from '../../types/interface/IPageBlock';

describe('Тестируем Block', function() {
  let block : PageBlock;
  const props : IPageBlock = {
    headers: {
      title: 'test',
    },
    locals: {},
    template: () => '<div>test</div>',
  };

  it('Проверяем возможность создания Block', function() {
    block = new PageBlock('div', props);
    try {
      block.render();
      return true;
    } catch (err) {
      return false;
    }
  });
});
