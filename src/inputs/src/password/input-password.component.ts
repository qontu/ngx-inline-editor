import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Inject,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Store } from '@qontu/component-store';
import * as fromConfig from '../base/store/index';
import {
  InputPasswordConfig,
  INPUT_PASSWORD_CONFIG,
} from './input-password.config';
import { InputBaseComponent } from '../base/input-base.component';
import {
  InlineEditorEvents,
  INLINE_EDITOR_TEMPLATE_CONFIG,
} from '@qontu/ngx-inline-editor';

@Component({
  selector: 'inline-editor-password',
  template: `
    <input
      #input
      type="password"
      class="inline-editor-input inline-editor-password"
      [ngModel]="value$ | async"
      (ngModelChange)="changeValue($event)"
      [disabled]="isDisabled$ | async"
      (blur)="onBlur($event)"
      (focus)="onFocus($event)"
      (keyup.escape)="onEscape($event)"
      (keyup.enter)="onEnter($event)"
      (keypress)="onKeyPress($event)"
      [name]="config.name"
      [id]="config.id"
      [placeholder]="config.placeholder"
      [maxlength]="config.max"
      [minlength]="config.min"
    />
  `,
  styleUrls: ['../base/input-base.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: Store,
      useFactory: fromConfig.createStore,
    },
  ],
})
export class InputPasswordComponent
  extends InputBaseComponent<InputPasswordConfig>
  implements OnInit {
  static type = 'password';
  type = InputPasswordComponent.type;
  config: Partial<InputPasswordConfig>;
  constructor(
    protected store$: Store<fromConfig.State>,
    ngControl: NgControl,
    protected events: InlineEditorEvents,
    @Inject(INLINE_EDITOR_TEMPLATE_CONFIG) globalConfig: any = {},
    @Inject(INPUT_PASSWORD_CONFIG) inputConfig: InputPasswordConfig,
    @Inject(INLINE_EDITOR_TEMPLATE_CONFIG) templateConfig: InputPasswordConfig,
  ) {
    super(store$, ngControl, events);
    this.config = {
      ...globalConfig,
      ...inputConfig,
      ...templateConfig,
    };
  }

  getValueRepresentation(): string {
    const { value } = this.getState();
    return !value ? this.config.empty : '*'.repeat(value.length);
  }
}
