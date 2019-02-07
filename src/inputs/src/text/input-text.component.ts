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
  InlineEditorEvents,
  INLINE_EDITOR_TEMPLATE_CONFIG,
  INLINE_EDITOR_GLOBAL_CONFIG,
} from '@qontu/ngx-inline-editor';
import { InputTextConfig, INPUT_TEXT_CONFIG } from './input-text.config';
import { InputBaseComponent } from '../base/input-base.component';

@Component({
  selector: 'inline-editor-text',
  template: `
    <input
      #input
      type="text"
      class="inline-editor-input inline-editor-text"
      [ngClass]="{ 'inline-editor-input-invalid': this.invalid$ | async }"
      [ngModel]="value$ | async"
      (ngModelChange)="changeValue($event)"
      [disabled]="isDisabled$ | async"
      (click)="onClick($event)"
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
export class InputTextComponent extends InputBaseComponent<InputTextConfig>
  implements OnInit {
  static type = 'text';
  type = InputTextComponent.type;
  config: Partial<InputTextConfig>;
  constructor(
    protected store$: Store<fromConfig.State>,
    ngControl: NgControl,
    protected events: InlineEditorEvents,
    // TODO(Toni): https://github.com/angular/angular/issues/23395
    @Inject(INLINE_EDITOR_GLOBAL_CONFIG) globalConfig: any = {},
    @Inject(INPUT_TEXT_CONFIG) inputConfig: InputTextConfig,
    @Inject(INLINE_EDITOR_TEMPLATE_CONFIG) templateConfig: InputTextConfig,
  ) {
    super(store$, ngControl, events);
    this.config = {
      ...globalConfig,
      ...inputConfig,
      ...templateConfig,
    };
  }
}
