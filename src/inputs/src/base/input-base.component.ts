import { OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  UpdateDirtyValue,
  Disable,
  Enable,
  CommitValue,
  Editing,
  PreventCommit,
} from './store/actions/config.actions';
import { Store } from '@qontu/component-store';
import * as fromConfig from './store/index';
import { InputBase, InputWithControls } from '../input-base';
import { InlineEditorEvents } from '@qontu/ngx-inline-editor';
import { InputBaseConfig } from './input-base.config';
import { Config } from './store/reducers/config.reducer';

const defaultConfig: InputBaseConfig = {
  id: Date.now().toString(),
  saveOnBlur: false,
  saveOnEnter: true,
  cancelOnEscape: true,
  disabled: false,
  editOnClick: true,
  empty: 'Empty',
  hideButtons: false,
  name: Date.now().toString(),
  placeholder: '',
};

export class InputBaseComponent<InputConfig extends InputBaseConfig>
  extends InputBase<any, InputConfig>
  implements OnInit, InputWithControls {
  static type = 'base';
  value$: Observable<string>;
  isDisabled$: Observable<boolean>;

  @ViewChild('input')
  private _input: ElementRef<HTMLInputElement>;
  get input() {
    return this._input.nativeElement;
  }
  constructor(
    protected store$: Store<fromConfig.State>,
    ngControl: NgControl,
    protected events: InlineEditorEvents,
    public config: Partial<InputConfig> = {},
  ) {
    super(ngControl);
    this.value$ = this.store$.select(({ value }) => value);
    this.isDisabled$ = this.store$.select(({ isDisabled }) => isDisabled);
  }

  getState(): fromConfig.State {
    return { ...this.store$.getState() };
  }

  onSubmit(event: Event): void {
    const { dirty: value } = this.getState();

    if (this.isValid(value)) {
      this.hide();
      this.commitValue(value);
    }
  }

  onCancel(event: Event): void {
    this.store$.dispatch(new PreventCommit());
    this.hide();
    this.events.onCancel.emit(this.prepareToEmit(event));
  }

  onEdit(event: Event): void {
    this.show();
    this.events.onEdit.emit(this.prepareToEmit(event));
  }

  hide() {
    this.store$.dispatch(new Editing(false));
    super.hide();
  }

  show() {
    this.store$.dispatch(new Editing(true));
    super.show();
  }

  showButtons(): boolean {
    return !this.config.hideButtons;
  }

  ngOnInit() {
    this.config = {
      ...defaultConfig,
      ...(this.config as any),
    };
    this.value$.subscribe(this.events.onSave);
  }

  onBlur(event: Event) {
    if (this.config.saveOnBlur && !this.getState().isCanceled) {
      this.onSubmit(event);
    }

    this.events.onBlur.emit(this.prepareToEmit(event));
  }

  onFocus(event: Event) {
    this.events.onFocus.emit(this.prepareToEmit(event));
  }

  onClick(event: Event) {
    this.events.onClick.emit(this.prepareToEmit(event));
  }

  onKeyPress(event: Event) {
    this.events.onKeyPress.emit(this.prepareToEmit(event));
  }

  onEscape(event: Event) {
    if (this.config.cancelOnEscape) {
      this.onCancel(event);
    }

    this.events.onEscape.emit(this.prepareToEmit(event));
  }

  onEnter(event: Event) {
    if (this.config.saveOnEnter) {
      this.onSubmit(event);
    }

    this.events.onEnter.emit(this.prepareToEmit(event));
  }

  writeValue(value: string): void {
    this.store$.dispatch(new CommitValue({ value }));
  }

  setDisabledState(isDisabled: boolean): void {
    this.store$.dispatch(isDisabled ? new Disable() : new Enable());
  }

  getPresentation() {
    return this.control.value || this.config.empty;
  }

  changeValue(value: any): void {
    this.store$.dispatch(new UpdateDirtyValue({ value }));
  }

  commitValue(value: string): void {
    this.writeValue(value);
    this.onChange(value);
  }

  isValid(value?: string): boolean {
    return new FormControl(
      value ? value : this.control.valid,
      this.control.validator,
    ).valid;
  }

  // TODO: Improve return typing
  prepareToEmit(event?: Event): { event: Event; input: any; state: Config } {
    return {
      event,
      input: this,
      state: this.getState(),
    };
  }
}
