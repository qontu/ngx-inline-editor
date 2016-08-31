import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InlineEditorComponent} from './inline-editor.component';

const INLINE_EDITOR_COMPONENTS = [InlineEditorComponent];

@NgModule({
  imports:[CommonModule,FormsModule],
  declarations: INLINE_EDITOR_COMPONENTS,
  exports: INLINE_EDITOR_COMPONENTS
})
export class InlineEditorModule { }
