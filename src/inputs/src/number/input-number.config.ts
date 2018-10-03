import { InputBaseConfig } from '../base/input-base.config';

export interface InputNumberConfig extends InputBaseConfig {
  type?: 'number';
  max?: number;
  min?: number;
}
