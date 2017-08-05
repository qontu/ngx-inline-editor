import { InputLengthTestable, InputRegexTestable, InputSelectable } from "./testable-inputs.interface";
import { InputType } from "./input-type.type";
import { InputBaseConfig, TextareaConfig, CheckboxConfig } from "./input-configs";

export interface InlineBaseConfig extends InputBaseConfig {
    type: InputType;
    name?: string;
    size: number;
    placeholder: string;
    empty: string;
    hideButtons?: boolean;
    required?: boolean;
    disabled?: boolean;
    onlyValue?: boolean;
}

export interface InlineTextConfig extends InlineBaseConfig, InputRegexTestable { }

export interface InlineSelectConfig extends InlineBaseConfig, InputSelectable { }

export interface InlineNumberConfig extends InlineBaseConfig, InputLengthTestable { }

export interface InlineTextareaConfig extends InlineBaseConfig, TextareaConfig, InputRegexTestable {
    rows: number;
    cols: number;
}

export interface InlineCheckboxConfig extends InlineBaseConfig, CheckboxConfig {
    checkedText: string;
    uncheckedText: string;
}

export interface InlineConfig extends InlineTextConfig, InlineTextareaConfig,
    InlineSelectConfig, InlineNumberConfig, InlineCheckboxConfig {
    hideButtons: boolean;
    required: boolean;
    disabled: boolean;
    saveOnBlur: boolean;
    saveOnChange: boolean;
    saveOnEnter: boolean;
    cancelOnEscape: boolean;
    editOnClick: boolean;
    onlyValue: boolean;
}
