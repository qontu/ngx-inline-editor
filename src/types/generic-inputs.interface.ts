import { SelectOptions } from "./select-options.interface";

export interface InputRegexTestable {
    pattern: string | RegExp;
}

export interface InputSelectable {
    options: SelectOptions;
}

export interface InputLengthTestable {
    min: number;
    max: number;
}
