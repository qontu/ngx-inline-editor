import { BasicPage } from './app.po';

describe('basic App', function() {
  let page: BasicPage;

  beforeEach(() => {
    page = new BasicPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
