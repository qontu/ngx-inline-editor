import {
  Component,
  Inject,
  ViewChild,
  TemplateRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { InputBaseConfig } from '@qontu/ngx-inline-editor/inputs/base/input-base.config';
import {
  InputBase,
  InputWithControls,
} from '@qontu/ngx-inline-editor/inputs/input-base';
import { NgControl } from '@angular/forms';
import {
  INLINE_EDITOR_GLOBAL_CONFIG,
  INLINE_EDITOR_TEMPLATE_CONFIG,
  InlineEditorEvents,
} from '@qontu/ngx-inline-editor';

interface CustomInputConfig extends InputBaseConfig {
  color?: string;
}

@Component({
  selector: 'custom-input',
  template: `
    <mat-form-field>
      <input
        #input
        matInput
        placeholder="Custom input"
        [(ngModel)]="value"
        [disabled]="disabled"
      />
    </mat-form-field>

    <ng-template #buttons>
      <div>
        <button
          mat-raised-button
          [color]="config$.value.color || 'primary'"
          (mousedown)="onSubmit()"
        >
          Save!!
        </button>
        <button mat-raised-button color="warn" (mousedown)="onCancel()">
          Cancel!!!
        </button>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomInputComponent extends InputBase<string, CustomInputConfig>
  implements InputWithControls {
  static type = 'custom';
  type = CustomInputComponent.type;

  @ViewChild('buttons') buttonsTmpl: TemplateRef<any>;
  value = '';

  disabled = false;

  constructor(
    protected events: InlineEditorEvents,
    @Inject(INLINE_EDITOR_TEMPLATE_CONFIG) templateConfig: CustomInputConfig,
    ngControl: NgControl,
  ) {
    super(ngControl);

    this.setConfig(templateConfig);
  }

  getAPI() {
    throw new Error('Method not implemented.');
  }

  getValueRepresentation(): string {
    return this.value;
  }

  getEmptyRepresentation(): string {
    return 'Emmpty';
  }

  onSubmit(event: any): void {
    if (this.value.trim() === '') {
      this.empty$.next(true);
    } else {
      this.empty$.next(false);
    }

    this.hide();
    this.onChange(this.value);
    this.events.onSave.emit(this.value);
  }
  onCancel(event: any): void {
    this.hide();
    this.value = this.control.value;
    this.events.onCancel.emit();
  }
  onEdit(event: any): void {
    this.show();
    this.events.onEdit.emit();
  }

  writeValue(value: string): void {
    this.value = value;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  getButtonsTemplate() {
    return this.buttonsTmpl;
  }
}
