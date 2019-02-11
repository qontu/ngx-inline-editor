import { TestBed } from '@angular/core/testing';

import { InlineEditorService } from './inline-editor.service';

describe('InlineEditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InlineEditorService = TestBed.get(InlineEditorService);
    expect(service).toBeTruthy();
  });
});
