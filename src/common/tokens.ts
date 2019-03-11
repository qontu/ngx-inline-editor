import { InjectionToken } from '@angular/core';

export const INLINE_EDITOR_INPUTS = new InjectionToken<string>(
  'INLINE_EDITOR_INPUTS',
);

export const INLINE_EDITOR_GLOBAL_CONFIG = new InjectionToken<string>(
  'INLINE_EDITOR_GLOBAL_CONFIG',
);

export const INLINE_EDITOR_TEMPLATE_CONFIG = new InjectionToken<string>(
  'INLINE_EDITOR_TEMPLATE_CONFIG',
);
