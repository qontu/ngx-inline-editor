export interface InlineActionsOnEvents {
  saveOnChange?: boolean;
  saveOnBlur?: boolean;
  saveOnEnter?: boolean;
  cancelOnEscape?: boolean;
  editOnClick?: boolean;
}

export interface InputBaseConfig extends InlineActionsOnEvents {
  name?: string;
  id?: string;
  size?: number;
  placeholder?: string;
  empty?: string;
  hideButtons?: boolean;
  disabled?: boolean;
}
