import { TemplateRef } from '@angular/core';
import { NgControl, FormControl } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

export type Input = ControlValueAccessor;

export abstract class InputBase<ValueType = any, Config extends {} = {}>
  implements InlineEditorInput {
  static type: string | string[] = 'base';

  value$: Observable<ValueType>;
  show$: BehaviorSubject<boolean>;
  control: FormControl;
  config: Config | Partial<Config>;
  protected onChange: (_: any) => void;
  protected onTouched: (_: any) => void;
  protected onValidatorChange: (_: any) => void;

  constructor(protected ngControl: NgControl) {
    this.control = this.ngControl.control as FormControl;
    this.value$ = this.control.valueChanges;
    this.show$ = new BehaviorSubject(false);
  }

  writeValue(value: ValueType): void {
    throw new Error('Method not implemented.');
  }

  setDisabledState(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  hasButtonsTemplate(): boolean {
    return false;
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
  setState(): void {}

  setConfig(config: Config): void {
    this.config = config;
  }

  getConfig(): Partial<Config> {
    return this.config;
  }

  getPresentation(): string {
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

  showButtons(): boolean {
    return true;
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
  config: Config;
  getPresentation(): string;
  hasButtonsTemplate(): boolean;
  getButtonsTemplate(): TemplateRef<any>;
  getConfig(): Config;
  setConfig(config: Config): void;
  getState(): State;
  setState(): State;
  isShowing(): boolean;
  showButtons(): boolean;
}
