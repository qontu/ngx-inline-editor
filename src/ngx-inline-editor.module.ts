import { NgModule, ModuleWithProviders } from '@angular/core';
import { InlineEditorComponent } from './ngx-inline-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { INLINE_EDITOR_INPUTS, INLINE_EDITOR_CONFIG } from './common/index';
import { InputTextConfig } from './inputs/src/text/input-text.config';

@NgModule({
  declarations: [InlineEditorComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InlineEditorComponent]
})
export class InlineEditorModule {
  static forRoot(config?: InputTextConfig): ModuleWithProviders {
    return {
      ngModule: InlineEditorModule,
      providers: [
        {
          provide: INLINE_EDITOR_INPUTS,
          useValue: {},
          multi: true
        },
        {
          provide: INLINE_EDITOR_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
