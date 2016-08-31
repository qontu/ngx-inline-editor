import { PruebaAngularClIRC5Page } from './app.po';

describe('prueba-angular-cl-irc5 App', function() {
  let page: PruebaAngularClIRC5Page;

  beforeEach(() => {
    page = new PruebaAngularClIRC5Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
