import { Injectable, Inject, Type } from '@angular/core';
import { InputBase } from './inputs/src/input-base';
import { INLINE_EDITOR_INPUTS } from './common/index';

@Injectable()
export class InlineEditorService {
  public inputs: Record<string, InputBase> = {};

  constructor(
    @Inject(INLINE_EDITOR_INPUTS) public inputsType: Type<InputBase>[],
  ) {}

  registerInput(input: InputBase): void {
    this.inputs[input.getID()] = input;
  }

  unregisterInput(id: string): void {
    delete this.inputs[id];
  }

  getInputsOfType<T extends InputBase>(type: string): T[];
  getInputsOfType<T extends { new (...args: any[]): any; type: string }>(
    input: T,
  ): InstanceType<T>[];
  getInputsOfType(typeOrInput: string | { type: string }): any[] {
    const type =
      typeof typeOrInput === 'string' ? typeOrInput : typeOrInput.type;

    return Object.values(this.inputs).filter(input => input.getType() === type);
  }

  getInputs(): InputBase[] {
    return Object.values(this.inputs);
  }
}
