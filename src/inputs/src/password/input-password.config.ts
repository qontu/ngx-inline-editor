import { InputBaseConfig } from '../base/input-base.config';

export interface InputPasswordConfig extends InputBaseConfig {
  type?: 'password';
  max?: number;
  min?: number;
}
