import { NgModule, ModuleWithProviders } from '@angular/core';
import { InlineEditorComponent } from './ngx-inline-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { INLINE_EDITOR_GLOBAL_CONFIG } from './common/index';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { InlineEditorService } from './ngx-inline-editor.service';

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
          provide: INLINE_EDITOR_GLOBAL_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
