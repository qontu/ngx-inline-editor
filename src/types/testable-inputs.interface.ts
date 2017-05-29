import { SelectOptions } from "./select-options.interface";
import { RegexTestable, Selectable, LengthTestable } from "./input-configs";

export interface InputRegexTestable extends RegexTestable {
    pattern: string | RegExp;
}

export interface InputSelectable extends Selectable {
    options: SelectOptions;
}

export interface InputLengthTestable extends LengthTestable {
    min: number;
    max: number;
}
