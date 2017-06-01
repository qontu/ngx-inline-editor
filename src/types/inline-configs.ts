import { InputLengthTestable, InputRegexTestable, InputSelectable } from "./testable-inputs.interface";
import { InputType } from "./input-type.type";
import { InputBaseConfig, TextareaConfig } from "./input-configs";

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

export interface InlineTextareaConfig extends InlineBaseConfig, TextareaConfig, InputRegexTestable { }

export interface InlineConfig extends InlineTextConfig, InlineTextareaConfig,
    InlineSelectConfig, InlineNumberConfig {
    hideButtons: boolean;
    required: boolean;
    disabled: boolean;
    saveOnBlur: boolean;
    saveOnEnter: boolean;
    cancelOnEscape: boolean;
    editOnClick: boolean;
    onlyValue: boolean;
}
