import { InputLengthTestable, InputRegexTestable, InputSelectable } from "./types/generic-inputs.interface";
import { SelectOptions } from "./types/select-options.interface";
import { InputType } from "./types/input-type.type";


export interface InlineActionsOnEvents {
    saveOnBlur?: boolean;
    saveOnEnter?: boolean;
    cancelOnEscape?: boolean;
    editOnClick?: boolean;
}

export interface InlineGlobalConfig extends InlineActionsOnEvents {
    type?: InputType;
    name?: string;
    size?: number;
    placeholder?: string;
    empty?: string;
    options?: SelectOptions;
    pattern?: string | RegExp;
    min?: number;
    max?: number;
    rows?: number;
    cols?: number;
    hideButtons?: boolean;
    required?: boolean;
    disabled?: boolean;
}

export interface InlineBaseConfig extends InlineActionsOnEvents {
    type: InputType;
    name?: string;
    size: number;
    placeholder: string;
    empty: string;
    hideButtons?: boolean;
    required?: boolean;
    disabled?: boolean;
}

export interface InlineTextConfig extends InlineBaseConfig, InputRegexTestable { }

export interface InlineSelectConfig extends InlineBaseConfig, InputSelectable { }

export interface InlineNumberConfig extends InlineBaseConfig, InputLengthTestable { }

export interface InlineTextareaConfig extends InlineBaseConfig, InputRegexTestable {
    rows?: number;
    cols?: number;
}

export interface InlineConfig extends InlineTextConfig, InlineTextareaConfig,
    InlineSelectConfig, InlineNumberConfig {
    hideButtons: boolean;
    required: boolean;
    disabled: boolean;
    saveOnBlur: boolean;
    saveOnEnter: boolean;
    cancelOnEscape: boolean;
    editOnClick: boolean;
}
