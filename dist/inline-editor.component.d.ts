import { OnInit, EventEmitter, ElementRef, Renderer } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any;
export interface InputConfig {
    empty: string;
    type: string;
    disabled: boolean;
    name: string;
    size: number;
    min: number;
    max: number;
    pattern: string;
    fnErrorLength: (any: any) => void;
    fnErrorPattern: (any: any) => void;
}
export declare class InlineEditorComponent implements ControlValueAccessor, OnInit, InputConfig {
    private _renderer;
    inlineEditControl: any;
    onSave: EventEmitter<any>;
    empty: string;
    type: string;
    disabled: boolean;
    name: string;
    size: number;
    min: number;
    max: number;
    fnErrorLength: any;
    pattern: string;
    fnErrorPattern: any;
    cols: number;
    rows: number;
    options: any;
    private _value;
    private preValue;
    private editing;
    private isEmpty;
    onChange: any;
    onTouched: any;
    value: any;
    constructor(element: ElementRef, _renderer: Renderer);
    ngOnInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    private optionSelected();
    edit(value: any): void;
    onSubmit(value: any): void;
    cancel(value: any): void;
}
