import { InputBaseConfig } from '../base/input-base.config';
import { InjectionToken } from '@angular/core';

export interface InputTextareaConfigWhitoutType extends InputBaseConfig {
  max?: number;
  min?: number;
}

export interface InputTextareaConfig extends InputTextareaConfigWhitoutType {
  type?: 'textarea';
}

export const INPUT_TEXTAREA_CONFIG = new InjectionToken<
  InputTextareaConfigWhitoutType
>('INLINE_EDITOR_TEXTAREA_CONFIG');

export const INPUT_TEXTAREA_FOR_ROOT_CONFIG = new InjectionToken<
  InputTextareaConfigWhitoutType
>('INLINE_EDITOR_TEXTAREA_FOR_ROOT_CONFIG');

export const INPUT_TEXTAREA_CONFIG_REGISTRY = <
  T = InputTextareaConfigWhitoutType
>(
  parentConfig: T,
  forRootConfig: T,
) => ({
  ...forRootConfig,
  ...(parentConfig || {}),
});
