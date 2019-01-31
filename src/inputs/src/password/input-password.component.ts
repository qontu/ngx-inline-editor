import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Inject,
  Optional,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@qontu/component-store';
import * as fromConfig from '../base/store/index';
import { InputPasswordConfig } from './input-password.config';
import { InputBaseComponent } from '../base/input-base.component';
import {
  InlineEditorEvents,
  INLINE_EDITOR_CONFIG,
} from '@qontu/ngx-inline-editor';

const defaultConfig: InputPasswordConfig = {
  type: 'password',
  max: Infinity,
  min: 0,
};

@Component({
  selector: 'inline-editor-password',
  template: `
    <input
      type="password"
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
  value$: Observable<string>;
  isDisabled$: Observable<boolean>;
  config: Partial<InputPasswordConfig>;
  constructor(
    protected store$: Store<fromConfig.State>,
    ngControl: NgControl,
    protected events: InlineEditorEvents,
    @Inject(INLINE_EDITOR_CONFIG) config: any = {},
  ) {
    super(store$, ngControl, events, config);
    this.config = {
      ...defaultConfig,
      ...config,
    };
  }

  getPresentation(): string {
    const { value } = this.getState();
    return !value ? this.config.empty : '*'.repeat(value.length);
  }
}
