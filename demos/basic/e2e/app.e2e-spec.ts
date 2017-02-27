import { Basic2Page } from './app.po';

describe('basic2 App', () => {
  let page: Basic2Page;

  beforeEach(() => {
    page = new Basic2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
