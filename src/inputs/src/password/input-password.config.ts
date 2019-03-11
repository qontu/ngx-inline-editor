import { InputBaseConfig } from '../base/input-base.config';
import { InjectionToken } from '@angular/core';

export interface InputPasswordConfigWhitoutType extends InputBaseConfig {
  max?: number;
  min?: number;
}

export interface InputPasswordConfig extends InputPasswordConfigWhitoutType {
  type?: 'password';
}

export const INPUT_PASSWORD_CONFIG = new InjectionToken<
  InputPasswordConfigWhitoutType
>('INLINE_EDITOR_PASSWORD_CONFIG');

export const INPUT_PASSWORD_FOR_ROOT_CONFIG = new InjectionToken<
  InputPasswordConfigWhitoutType
>('INLINE_EDITOR_PASSWORD_FOR_ROOT_CONFIG');

export const INPUT_PASSWORD_CONFIG_REGISTRY = <
  T = InputPasswordConfigWhitoutType
>(
  parentConfig: T,
  forRootConfig: T,
) => ({
  ...forRootConfig,
  ...(parentConfig || {}),
});
