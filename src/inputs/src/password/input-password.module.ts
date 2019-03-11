import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf,
} from '@angular/core';
import { INLINE_EDITOR_INPUTS } from '@qontu/ngx-inline-editor';
import { InputPasswordComponent } from './input-password.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  INPUT_PASSWORD_CONFIG,
  InputPasswordConfigWhitoutType,
  InputPasswordConfig,
  INPUT_PASSWORD_FOR_ROOT_CONFIG,
  INPUT_PASSWORD_CONFIG_REGISTRY,
} from './input-password.config';

export {
  INPUT_PASSWORD_CONFIG,
  InputPasswordConfigWhitoutType,
  InputPasswordConfig,
  INPUT_PASSWORD_CONFIG_REGISTRY,
} from './input-password.config';

const defaultConfig: InputPasswordConfig = {
  type: 'password',
  max: Infinity,
  min: 0,
};

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [InputPasswordComponent],
  entryComponents: [InputPasswordComponent],
})
export class InputPasswordModule {
  public static forRoot(
    config: InputPasswordConfigWhitoutType = defaultConfig,
  ): ModuleWithProviders {
    return {
      ngModule: InputPasswordModule,
      providers: [
        {
          provide: INLINE_EDITOR_INPUTS,
          useValue: InputPasswordComponent,
          multi: true,
        },
        {
          provide: INPUT_PASSWORD_FOR_ROOT_CONFIG,
          useValue: config,
        },
        {
          provide: INPUT_PASSWORD_CONFIG,
          deps: [
            [new Optional(), new SkipSelf(), INPUT_PASSWORD_CONFIG],
            INPUT_PASSWORD_FOR_ROOT_CONFIG,
          ],
          useFactory: INPUT_PASSWORD_CONFIG_REGISTRY,
        },
      ],
    };
  }
}
