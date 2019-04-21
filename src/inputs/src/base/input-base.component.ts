import { OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { InlineEditorEvents } from '@qontu/ngx-inline-editor';
import { Store } from '@qontu/component-store';
import { Observable } from 'rxjs';

import { InputBase, InputWithControls } from '../input-base';
import { InputBaseConfig } from './input-base.config';
import { InputBaseApi } from './input-base.api';
import { State } from './store/config.state';
import {
  Override,
  PreventCommit,
  Editing,
  InvalidValue,
  CommitValue,
  Disable,
  Enable,
  UpdateDirtyValue,
} from './store/config.actions';

const defaultConfig: InputBaseConfig = {
  saveOnBlur: false,
  saveOnEnter: true,
  cancelOnEscape: true,
  disabled: false,
  editOnClick: true,
  focusOnClick: true,
  empty: 'Empty',
  hideButtons: false,
  placeholder: '',
};

export class InputBaseComponent<InputConfig extends InputBaseConfig>
  extends InputBase<any, InputConfig>
  implements OnInit, InputWithControls {
  static type = 'base';
  value$: Observable<any>;
  isDisabled$: Observable<boolean>;
  config: InputConfig;

  @ViewChild('input')
  private _input: ElementRef<HTMLInputElement>;

  @ViewChild('valueTmpl')
  private valueTmpl: TemplateRef<any>;

  @ViewChild('emptyTmpl')
  private emptyTmpl: TemplateRef<any>;

  @ViewChild('buttonsTmpl')
  private buttonsTmpl: TemplateRef<any>;

  get input(): HTMLInputElement {
    return this._input.nativeElement;
  }

  constructor(
    protected store$: Store<State>,
    ngControl: NgControl,
    protected events: InlineEditorEvents,
  ) {
    super(ngControl);
    this.value$ = this.store$.select(({ dirty }) => dirty);
    this.isDisabled$ = this.store$.select(({ isDisabled }) => isDisabled);
    // TODO(Toni): should it unsubscribe?
    this.store$
      .select(({ value }) =>
        typeof value === 'string' ? value.trim() === '' : Boolean(value),
      )
      .subscribe(this.empty$);
    this.store$.select(({ isValid }) => isValid).subscribe(this.valid$);
  }

  getState(): State {
    return { ...this.store$.getState() };
  }

  setState(state: Partial<State>) {
    this.store$.dispatch(new Override(state));
  }

  getAPI() {
    return new InputBaseApi(this);
  }

  cancel() {
    this.store$.dispatch(new PreventCommit());
    this.hide();
  }

  save(value: any = this.getState().dirty) {
    this.commitValue(value);
    this.events.onSave.emit(this.prepareToEmit(event));
  }

  saveAndClose(value: any = this.getState().dirty) {
    this.save(value);
    this.hide();
  }

  hide() {
    this.store$.dispatch(new Editing(false));
    super.hide();
  }

  show() {
    this.store$.dispatch(new Editing(true));
    super.show();
  }

  focus() {
    setTimeout(() => this.input.focus());
  }

  shouldShowButtons(): boolean {
    return !this.config.hideButtons;
  }

  ngOnInit() {
    // TODO(Toni): is it okay?
    this.config = {
      id: this.getID(),
      name: this.getID(),
      ...defaultConfig,
      ...this.config,
    };

    this.setConfig(this.config);

    this.value$.subscribe(this.events.onSave);
  }

  onSubmit(event: Event): void {
    const { dirty: value } = this.getState();

    if (!this.isValid(value)) {
      this.events.onError.emit(this.prepareToEmit(event));
      this.store$.dispatch(new InvalidValue());
      return;
    }

    this.saveAndClose(value);
  }

  onCancel(event: Event): void {
    this.cancel();
    this.events.onCancel.emit(this.prepareToEmit(event));
  }

  onEdit(event: Event): void {
    this.show();

    if (this.config.focusOnClick) {
      this.focus();
    }

    this.events.onEdit.emit(this.prepareToEmit(event));
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

    if (!this.config.saveOnChange) {
      return;
    }

    const value = this.getState().dirty;

    if (!this.isValid(value)) {
      this.events.onError.emit(this.prepareToEmit(event));
      this.store$.dispatch(new InvalidValue());
      return;
    }

    this.commitValue(value);
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

  getValueTemplate(): TemplateRef<any> {
    return this.valueTmpl;
  }

  getEmptyTemplate(): TemplateRef<any> {
    return this.emptyTmpl;
  }

  getButtonsTemplate(): TemplateRef<any> {
    return this.buttonsTmpl;
  }

  getValueRepresentation(): string {
    return this.control.value;
  }

  getEmptyRepresentation(): string {
    return this.config.empty;
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
  prepareToEmit(event?: Event): { event: Event; input: any; state: State } {
    return {
      event,
      input: this,
      state: this.getState(),
    };
  }
}
