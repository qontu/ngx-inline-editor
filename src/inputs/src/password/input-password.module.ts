import { NgModule, ModuleWithProviders } from '@angular/core';
import { INLINE_EDITOR_INPUTS } from '@qontu/ngx-inline-editor';
import { InputPasswordComponent } from './input-password.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [InputPasswordComponent],
  entryComponents: [InputPasswordComponent],
})
export class InputPasswordModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: InputPasswordModule,
      providers: [
        {
          provide: INLINE_EDITOR_INPUTS,
          useValue: InputPasswordComponent,
          multi: true,
        },
      ],
    };
  }
}
