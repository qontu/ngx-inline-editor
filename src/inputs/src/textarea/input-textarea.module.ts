import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf,
} from '@angular/core';
import { INLINE_EDITOR_INPUTS } from '@qontu/ngx-inline-editor';
import { InputTextareaComponent } from './input-textarea.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  InputTextareaConfig,
  InputTextareaConfigWhitoutType,
  INPUT_TEXTAREA_CONFIG,
  INPUT_TEXTAREA_FOR_ROOT_CONFIG,
  INPUT_TEXTAREA_CONFIG_REGISTRY,
} from './input-textarea.config';

export {
  InputTextareaConfig,
  InputTextareaConfigWhitoutType,
  INPUT_TEXTAREA_CONFIG,
  INPUT_TEXTAREA_CONFIG_REGISTRY,
} from './input-textarea.config';

const defaultConfig: InputTextareaConfig = {
  type: 'textarea',
  max: Infinity,
  min: 0,
};

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [InputTextareaComponent],
  entryComponents: [InputTextareaComponent],
})
export class InputTextareaModule {
  public static forRoot(
    config: InputTextareaConfigWhitoutType = defaultConfig,
  ): ModuleWithProviders {
    return {
      ngModule: InputTextareaModule,
      providers: [
        // TODO(Toni): add checking to forbid double forRoot call (and double input registration)
        {
          provide: INLINE_EDITOR_INPUTS,
          useValue: InputTextareaComponent,
          multi: true,
        },
        {
          provide: INPUT_TEXTAREA_FOR_ROOT_CONFIG,
          useValue: config,
        },
        {
          provide: INPUT_TEXTAREA_CONFIG,
          useFactory: INPUT_TEXTAREA_CONFIG_REGISTRY,
          deps: [
            [new Optional(), new SkipSelf(), INPUT_TEXTAREA_CONFIG],
            INPUT_TEXTAREA_FOR_ROOT_CONFIG,
          ],
        },
      ],
    };
  }
}
