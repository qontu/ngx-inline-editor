import { EventEmitter, ElementRef, Renderer } from '@angular/core';
import { ControlValueAccessor } from "@angular/common";
export declare class InlineEditComponent implements ControlValueAccessor {
    private _renderer;
    inlineEditControl: any;
    onSave: EventEmitter<any>;
    type: string;
    disabled: boolean;
    name: string;
    size: number;
    cols: number;
    rows: number;
    options: Array<any>;
    private _value;
    private preValue;
    private editing;
    onChange: any;
    onTouched: any;
    value: any;
    constructor(element: ElementRef, _renderer: Renderer);
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    private optionSelected();
    edit(value: any): void;
    onSubmit(value: any): void;
    cancel(value: any): void;
}
