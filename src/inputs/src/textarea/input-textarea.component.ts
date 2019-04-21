import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Store } from '@qontu/component-store';

import {
  InlineEditorEvents,
  INLINE_EDITOR_TEMPLATE_CONFIG,
  INLINE_EDITOR_GLOBAL_CONFIG,
} from '@qontu/ngx-inline-editor';

import {
  InputTextareaConfig,
  INPUT_TEXTAREA_CONFIG,
} from './input-textarea.config';
import { InputBaseComponent } from '../base/input-base.component';
import { State } from '../base/store/config.state';
import { createStore } from '../base/store/config.factory';

@Component({
  selector: 'inline-editor-textarea',
  template: `
    <textarea
      #input
      type="textarea"
      class="inline-editor-input inline-editor-textarea"
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
    ></textarea>
  `,
  styleUrls: ['../base/input-base.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: Store,
      useFactory: createStore,
    },
  ],
})
export class InputTextareaComponent extends InputBaseComponent<
  InputTextareaConfig
> {
  static type = 'textarea';
  type = InputTextareaComponent.type;
  config: Partial<InputTextareaConfig>;

  constructor(
    protected store$: Store<State>,
    ngControl: NgControl,
    protected events: InlineEditorEvents,
    // TODO(Toni): https://github.com/angular/angular/issues/23395
    @Inject(INLINE_EDITOR_GLOBAL_CONFIG) globalConfig: any = {},
    @Inject(INPUT_TEXTAREA_CONFIG) inputConfig: InputTextareaConfig,
    @Inject(INLINE_EDITOR_TEMPLATE_CONFIG) templateConfig: InputTextareaConfig,
  ) {
    super(store$, ngControl, events);
    this.config = {
      ...globalConfig,
      ...inputConfig,
      ...templateConfig,
    };
  }
}
