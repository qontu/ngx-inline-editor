import { InputBaseConfig } from '../base/input-base.config';

export interface InputTextConfig extends InputBaseConfig {
  type?: 'text';
  max?: number;
  min?: number;
}
