import { TestBed, async } from '@angular/core/testing';
import { InputTextComponent } from '../text/input-text.component';
import { FormsModule, NgControl, NgModel } from '@angular/forms';
import {
  InlineEditorEvents,
  INLINE_EDITOR_CONFIG,
} from '@qontu/ngx-inline-editor';

describe('base', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [InputTextComponent],
      providers: [
        InlineEditorEvents,
        {
          provide: NgControl,
          useClass: NgModel,
        },
        {
          provide: INLINE_EDITOR_CONFIG,
          useValue: {
            max: 10,
            min: 5,
          },
        },
      ],
    }).compileComponents()));

  it('should create', () => {
    const cmp = TestBed.createComponent(InputTextComponent);
    expect(cmp.componentInstance).toBeTruthy();
  });
});
