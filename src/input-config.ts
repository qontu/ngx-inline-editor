export type InputType = 'text' | 'number' | 'select' | 'range' | 'textarea';

export interface SelectOptions {
    data: { value: string, text: string, children?: SelectOptions }[],
    value: string;
    text: string;
}

export interface InputConfig {
    value?: string;
    isEmpty?: boolean;
    options?: SelectOptions;
    required?: boolean;
    // Value on empty state
    empty: string;
    // Placeholder on empty state
    placeholder: string;
    // Type of input
    type: InputType
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
