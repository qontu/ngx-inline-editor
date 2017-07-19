import { InputType } from "./input-type.type";
import { SelectOptions } from "./select-options.interface";


export interface InlineActionsOnEvents {
    saveOnChange?: boolean;
    saveOnBlur?: boolean;
    saveOnEnter?: boolean;
    cancelOnEscape?: boolean;
    editOnClick?: boolean;
}

export interface RegexTestable {
    pattern?: string | RegExp;
}

export interface Selectable {
    options?: SelectOptions;
}

export interface LengthTestable {
    min?: number;
    max?: number;
}

export interface InputBaseConfig extends InlineActionsOnEvents {
    type: InputType;
    name?: string;
    size?: number;
    placeholder?: string;
    empty?: string;
    hideButtons?: boolean;
    required?: boolean;
    disabled?: boolean;
    onlyValue?: boolean;
}

export interface InputTextConfig extends InputBaseConfig, RegexTestable {
    type: "text";
}

export interface InputSelectConfig extends InputBaseConfig, Selectable {
    type: "select";
}

export interface InputNumberConfig extends InputBaseConfig, LengthTestable {
    type: "number";
}

export interface TextareaConfig {
    rows?: number;
    cols?: number;
}
export interface InputTextareaConfig extends InputBaseConfig, TextareaConfig, RegexTestable {
    type: "textarea";
}

export interface CheckboxConfig extends InputBaseConfig {
    checkedText?: string;
    uncheckedText?: string;
}

export interface InputConfig extends
    InputBaseConfig,
    LengthTestable,
    LengthTestable,
    RegexTestable,
    TextareaConfig,
    CheckboxConfig { }
