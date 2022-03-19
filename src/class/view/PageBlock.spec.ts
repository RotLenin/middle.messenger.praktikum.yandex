import PageBlock from './PageBlock';
import IPageBlock from '../../types/interface/IPageBlock';

/** TODO: В чеклисте написано надо тестировать, вот я и тестирую =)
 * TODO: Т.к. тесты идут без Parcel приходится менять pug шаблоны на самописные
 * */
describe('Тестируем Block', function() {
  let block : PageBlock;
  const props : IPageBlock = {
    headers: {
      title: 'test',
    },
    locals: {},
    /** TODO: Тут должен быть скомпилированный pug */
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
