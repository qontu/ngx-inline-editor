import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { InlineEditorComponent } from "./inline-editor.component";
import {
  InputTimeComponent,
  InputDateComponent,
  InputDatetimeComponent,
  InputNumberComponent,
  InputRangeComponent,
  InputPasswordComponent,
  InputSelectComponent,
  InputTextareaComponent,
  InputTextComponent,
} from "./inputs/index";
import { InputBase } from "./inputs/input-base";

export { InlineEditorComponent } from "./inline-editor.component";
export * from "./inputs/index";
export * from "./configs";
export { InputBase } from "./inputs/input-base";
export { InlineEditorEvent } from "./types/inline-editor-events.class";

const EXPORTS = [
  InputBase,
  InputTextComponent,
  InputNumberComponent,
  InputPasswordComponent,
  InputRangeComponent,
  InputTextareaComponent,
  InputSelectComponent,
  InputDateComponent,
  InputTimeComponent,
  InputDatetimeComponent,

  InlineEditorComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: EXPORTS,
  exports: [InlineEditorComponent],
})
export class InlineEditorModule { }
