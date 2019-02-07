import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf,
} from '@angular/core';
import { INLINE_EDITOR_INPUTS } from '@qontu/ngx-inline-editor';
import { InputTextComponent } from './input-text.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  InputTextConfig,
  InputTextConfigWhitoutType,
  INPUT_TEXT_CONFIG,
} from './input-text.config';

export {
  InputTextConfig,
  InputTextConfigWhitoutType,
  INPUT_TEXT_CONFIG,
} from './input-text.config';

const defaultConfig: InputTextConfig = {
  type: 'text',
  max: Infinity,
  min: 0,
};

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [InputTextComponent],
  entryComponents: [InputTextComponent],
})
export class InputTextModule {
  public static forRoot(
    config: InputTextConfigWhitoutType = defaultConfig,
  ): ModuleWithProviders {
    return {
      ngModule: InputTextModule,
      providers: [
        // TODO(Toni): add checking to forbid double forRoot call (and double input registration)
        {
          provide: INLINE_EDITOR_INPUTS,
          useValue: InputTextComponent,
          multi: true,
        },
        {
          provide: INPUT_TEXT_CONFIG,
          deps: [[new Optional(), new SkipSelf(), INPUT_TEXT_CONFIG]],
          useFactory: (parentConfig: InputTextConfigWhitoutType) => ({
            ...config,
            ...(parentConfig || {}),
          }),
        },
      ],
    };
  }
}
