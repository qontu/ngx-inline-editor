import { InputBaseConfig } from '../base/input-base.config';
import { InjectionToken } from '@angular/core';

export interface InputNumberConfigWhitoutType extends InputBaseConfig {
  max?: number;
  min?: number;
}

export interface InputNumberConfig extends InputNumberConfigWhitoutType {
  type?: 'number';
}

export const INPUT_NUMBER_CONFIG = new InjectionToken<
  InputNumberConfigWhitoutType
>('INLINE_EDITOR_NUMBER_CONFIG');

export const INPUT_NUMBER_FOR_ROOT_CONFIG = new InjectionToken<
  InputNumberConfigWhitoutType
>('INLINE_EDITOR_NUMBER_FOR_ROOT_CONFIG');

export const INPUT_NUMBER_CONFIG_REGISTRY = <T = InputNumberConfigWhitoutType>(
  parentConfig: T,
  forRootConfig: T,
) => ({
  ...forRootConfig,
  ...(parentConfig || {}),
});
