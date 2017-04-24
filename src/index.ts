import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { InlineEditorComponent, InputComponets } from "./inline-editor.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [InlineEditorComponent, ...InputComponets],
  exports: [InlineEditorComponent],
})
export class InlineEditorModule { }
