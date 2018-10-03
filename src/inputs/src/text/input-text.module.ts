import { NgModule, ModuleWithProviders } from '@angular/core';
import { INLINE_EDITOR_INPUTS } from '@qontu/ngx-inline-editor';
import { InputTextComponent } from './input-text.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [InputTextComponent],
  entryComponents: [InputTextComponent]
})
export class InputTextModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: InputTextModule,
      providers: [
        {
          provide: INLINE_EDITOR_INPUTS,
          useValue: InputTextComponent,
          multi: true
        }
      ]
    };
  }
}
