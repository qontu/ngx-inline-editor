import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { InlineEditorComponent, InputComponets } from "./inline-editor.component";
import { InputBase } from "./inputs/input-base";

export * from "./inline-editor.component";
export * from "./inputs/input-datetime.component";
export * from "./inputs/input-date.component";
export * from "./inputs/input-number.component";
export * from "./inputs/input-password.component";
export * from "./inputs/input-range.component";
export * from "./inputs/input-select.component";
export * from "./inputs/input-text.component";
export * from "./inputs/input-textarea.component";
export * from "./inputs/input-time.component";
export * from "./inputs/input-base";
export { ExternalEvent as InlineEvent } from "./types/inline-editor-events.class";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [InlineEditorComponent, InputBase, ...InputComponets],
  exports: [InlineEditorComponent],
})
export class InlineEditorModule { }
