import { NgModule, ModuleWithProviders } from '@angular/core';
import { INLINE_EDITOR_INPUTS } from '@qontu/ngx-inline-editor';
import { InputNumberComponent } from './input-number.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [InputNumberComponent],
  entryComponents: [InputNumberComponent],
})
export class InputNumberModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: InputNumberModule,
      providers: [
        {
          provide: INLINE_EDITOR_INPUTS,
          useValue: InputNumberComponent,
          multi: true,
        },
      ],
    };
  }
}
