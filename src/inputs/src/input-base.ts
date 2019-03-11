import { TemplateRef } from '@angular/core';
import { NgControl, FormControl } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

export type Input = ControlValueAccessor;

export abstract class InputBase<ValueType = any, Config extends {} = {}>
  implements InlineEditorInput {
  static type: string | string[] = 'base';
  type: (typeof InputBase)['type'];
  // TODO(Toni): maybe should we use https://github.com/kelektiv/node-uuid instead of?
  id: string = Date.now().toString();
  value$: Observable<ValueType>;
  config$: BehaviorSubject<Config | Partial<Config>>;
  empty$: BehaviorSubject<boolean>;
  show$: BehaviorSubject<boolean>;
  valid$: BehaviorSubject<boolean>;
  invalid$: BehaviorSubject<boolean>;
  control: FormControl;
  protected onChange: (_: any) => void;
  protected onTouched: (_: any) => void;
  protected onValidatorChange: (_: any) => void;

  constructor(protected ngControl: NgControl) {
    this.control = this.ngControl.control as FormControl;
    this.config$ = new BehaviorSubject({});
    this.value$ = this.control.valueChanges;
    this.show$ = new BehaviorSubject(false);
    this.empty$ = new BehaviorSubject(false);
    this.valid$ = new BehaviorSubject(true);
    this.invalid$ = new BehaviorSubject(false);
  }

  getType(): InputBase['type'] {
    return this.type;
  }

  getID(): string {
    return this.id;
  }

  abstract getApi(): any;

  writeValue(value: ValueType): void {
    throw new Error('Method not implemented.');
  }

  setDisabledState(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  hasValueTemplate(): boolean {
    return false;
  }

  hasEmptyTemplate(): boolean {
    return false;
  }

  hasButtonsTemplate(): boolean {
    return false;
  }

  getValueTemplate(): TemplateRef<any> {
    return null;
  }

  getEmptyTemplate(): TemplateRef<any> {
    return null;
  }

  getButtonsTemplate(): TemplateRef<any> {
    return null;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  getState(): any {}
  setState(state: any): void {}

  setConfig(config: Config): void {
    this.config$.next(config);
  }

  getConfig(): Partial<Config> {
    return this.config$.value;
  }

  getValueRepresentation(): string {
    return '';
  }

  getEmptyRepresentation(): string {
    return '';
  }

  show(): void {
    this.show$.next(true);
  }

  hide(): void {
    this.show$.next(false);
  }

  toggle(): void {
    this.show$.next(!this.isShowing());
  }

  isShowing(): boolean {
    return this.show$.value;
  }

  shouldShowButtons(): boolean {
    return true;
  }

  isEmpty(): boolean {
    return this.empty$.value;
  }

  isValid(): boolean {
    return this.valid$.value;
  }
}

export interface InputWithControls {
  onSubmit(event: any): void;
  onCancel(event: any): void;
  onEdit(event: any): void;
}

export interface InputWithEvents {
  onBlur(event: any): void;
  onFocus(event: any): void;
  onEnter(event: any): void;
}

export interface InlineEditorInput<State = any, Config = any> extends Input {
  getValueRepresentation(): string;
  getEmptyRepresentation(): string;
  hasValueTemplate(): boolean;
  hasEmptyTemplate(): boolean;
  hasButtonsTemplate(): boolean;
  getValueTemplate(): TemplateRef<any>;
  getEmptyTemplate(): TemplateRef<any>;
  getButtonsTemplate(): TemplateRef<any>;
  getConfig(): Config;
  setConfig(config: Config): void;
  getState(): State;
  setState(state: any): State;
  isShowing(): boolean;
  isEmpty(): boolean;
  shouldShowButtons(): boolean;
  getApi(): any;
}
