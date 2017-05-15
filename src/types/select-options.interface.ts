export interface SelectOption { [key: string]: any; }
export interface SelectOptionWithChildren extends SelectOption {
    children?: SelectOption[];
}

export interface SelectOptions {
    text: string;
    value: string;
    data: SelectOptionWithChildren[];
}
