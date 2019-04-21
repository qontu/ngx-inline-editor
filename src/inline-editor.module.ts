import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { InlineEditorComponent } from './inline-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  INLINE_EDITOR_GLOBAL_CONFIG,
  INLINE_EDITOR_INPUTS,
} from './common/index';
import { InlineEditorService } from './inline-editor.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [InlineEditorComponent],
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  exports: [InlineEditorComponent],
})
export class InlineEditorModule {
  constructor() {
    library.add(faCheck, faTimes);
  }

  static forRoot(config: object = {}): ModuleWithProviders {
    return {
      ngModule: InlineEditorModule,
      providers: [
        InlineEditorService,
        {
          provide: INLINE_EDITOR_INPUTS,
          useValue: { type: 'noop' },
          multi: true,
        },
        {
          provide: INLINE_EDITOR_GLOBAL_CONFIG,
          useValue: config,
        },
      ],
    };
  }

  static withInput(input: Type<any>): ModuleWithProviders {
    return {
      ngModule: InlineEditorModule,
      providers: [
        {
          provide: INLINE_EDITOR_INPUTS,
          useValue: input,
          multi: true,
        },
      ],
    };
  }
}
