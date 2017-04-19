export type InputType = "text" | "number" | "select" | "range" | "textarea" | "date" | "time" | "datetime";


export interface SelectOption {
    value: string;
    text: string;
}
export interface SelectOptionWithChildren extends SelectOption {
    children?: SelectOption[];
}

export interface SelectOptions extends SelectOption {
    data: SelectOptionWithChildren[];
}

export interface InputConfig {
    value?: string;
    isEmpty?: boolean;
    options: SelectOptions;
    rows?: number;
    cols?: number;
    required?: boolean;
    // Value on empty state
    empty: string;
    // Placeholder on empty state
    placeholder: string;
    // Type of input
    type: InputType;
    // Is disabled input?
    disabled: boolean;
    // Input name
    name: string;
    // Input size
    size: number;
    // Min length of value
    min: number;
    // Max length of value
    max: number;
    // Pattern to test against value (input text only)
    pattern: string;
    fnErrorLength: (any: any) => void;
    fnErrorPattern: (any: any) => void;
}
