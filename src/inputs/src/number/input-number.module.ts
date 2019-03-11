import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf,
} from '@angular/core';
import { INLINE_EDITOR_INPUTS } from '@qontu/ngx-inline-editor';
import { InputNumberComponent } from './input-number.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  INPUT_NUMBER_CONFIG,
  InputNumberConfig,
  InputNumberConfigWhitoutType,
  INPUT_NUMBER_FOR_ROOT_CONFIG,
  INPUT_NUMBER_CONFIG_REGISTRY,
} from './input-number.config';

export {
  INPUT_NUMBER_CONFIG,
  InputNumberConfig,
  InputNumberConfigWhitoutType,
  INPUT_NUMBER_CONFIG_REGISTRY,
} from './input-number.config';

const defaultConfig: InputNumberConfig = {
  type: 'number',
  max: Infinity,
  min: 0,
};

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [InputNumberComponent],
  entryComponents: [InputNumberComponent],
})
export class InputNumberModule {
  public static forRoot(
    config: InputNumberConfigWhitoutType = defaultConfig,
  ): ModuleWithProviders {
    return {
      ngModule: InputNumberModule,
      providers: [
        {
          provide: INLINE_EDITOR_INPUTS,
          useValue: InputNumberComponent,
          multi: true,
        },
        {
          provide: INPUT_NUMBER_FOR_ROOT_CONFIG,
          useValue: config,
        },
        {
          provide: INPUT_NUMBER_CONFIG,
          deps: [
            [new Optional(), new SkipSelf(), INPUT_NUMBER_CONFIG],
            INPUT_NUMBER_FOR_ROOT_CONFIG,
          ],
          useFactory: INPUT_NUMBER_CONFIG_REGISTRY,
        },
      ],
    };
  }
}
