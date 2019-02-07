import { OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  UpdateDirtyValue,
  Disable,
  Enable,
  CommitValue,
  Editing,
  PreventCommit,
  InvalidValue,
} from './store/actions/config.actions';
import { Store } from '@qontu/component-store';
import * as fromConfig from './store/index';
import { InputBase, InputWithControls } from '../input-base';
import { InlineEditorEvents } from '@qontu/ngx-inline-editor';
import { InputBaseConfig } from './input-base.config';
import { Config } from './store/reducers/config.reducer';

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
  config: Partial<InputConfig>;

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
    protected store$: Store<fromConfig.State>,
    ngControl: NgControl,
    protected events: InlineEditorEvents,
  ) {
    super(ngControl);
    this.value$ = this.store$.select(({ value }) => value);
    // TODO(Toni): should it unsubscribe?
    this.store$.select(({ value }) => value === '').subscribe(this.empty$);
    this.store$.select(({ isInvalid }) => isInvalid).subscribe(this.invalid$);
    this.isDisabled$ = this.store$.select(({ isDisabled }) => isDisabled);
  }

  getState(): fromConfig.State {
    return { ...this.store$.getState() };
  }

  onSubmit(event: Event): void {
    const { dirty: value } = this.getState();

    if (!this.isValid(value)) {
      this.events.onError.emit(this.prepareToEmit(event));
      this.store$.dispatch(new InvalidValue());
      return;
    }

    this.hide();
    this.commitValue(value);
    this.events.onSave.emit(this.prepareToEmit(event));
  }

  onCancel(event: Event): void {
    this.store$.dispatch(new PreventCommit());
    this.hide();
    this.events.onCancel.emit(this.prepareToEmit(event));
  }

  onEdit(event: Event): void {
    this.show();

    if (this.config.focusOnClick) {
      setTimeout(() => this.input.focus());
    }

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
    // TODO(Toni): is it okay?
    this.config = {
      id: this.getID(),
      name: this.getID(),
      ...defaultConfig,
      ...this.config,
    };

    this.config$.next(this.config);

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

  hasValueTemplate(): boolean {
    return this.valueTmpl != null;
  }

  hasEmptyTemplate(): boolean {
    return this.emptyTmpl != null;
  }

  hasButtonsTemplate(): boolean {
    return this.buttonsTmpl != null;
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
  prepareToEmit(event?: Event): { event: Event; input: any; state: Config } {
    return {
      event,
      input: this,
      state: this.getState(),
    };
  }
}
