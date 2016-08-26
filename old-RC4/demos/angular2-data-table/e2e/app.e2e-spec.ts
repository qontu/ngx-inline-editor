import { ExampleInlineEditorPage } from './app.po';

describe('example-inline-editor App', function() {
  let page: ExampleInlineEditorPage;

  beforeEach(() => {
    page = new ExampleInlineEditorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
