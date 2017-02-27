import {
    Component, forwardRef, Input, OnInit, Output,
    EventEmitter, ElementRef, ViewChild, Renderer,
    ComponentRef, ComponentFactoryResolver, ViewContainerRef,
    OnChanges, SimpleChanges
} from '@angular/core';

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { InputConfig, InputType, SelectOptions } from "./input-config";
import { InputTextComponent } from "./inputs/input-text.component";
import { InputNumberComponent } from "./inputs/input-number.component";
import { InputBase } from "./inputs/input-base";
import { InputPasswordComponent } from "./inputs/input-password.component";
import { InputRangeComponent } from "./inputs/input-range.component";
import { InputTextareaComponent } from "./inputs/input-textarea.component";
import { InputSelectComponent } from "./inputs/input-select.component";

export const InputComponets = [
    InputTextComponent,
    InputNumberComponent,
    InputPasswordComponent,
    InputRangeComponent,
    InputTextareaComponent,
    InputSelectComponent,
];

// TO-DO Default's value
const inputConfig: InputConfig = {
    empty: 'empty',
    placeholder: '',
    type: 'text',
    disabled: false,
    name: '',
    size: 8,
    min: 1,
    pattern: '',
    max: Infinity,
    fnErrorLength: function (x) { alert('Error: Lenght!'); },
    fnErrorPattern: function (x) { alert('Error: Pattern!'); }
};

const NUMERIC_TYPES: InputType[] = ['range', 'number'];

@Component({
    selector: 'inline-editor',
    template: `<div>
                <div id="inlineEditWrapper">
                    <a [ngClass]="{'editable-empty': isEmpty }"  (click)="edit(value)" [hidden]="editing && !disabled">{{ showText() }}</a>
                    <div class="inlineEditForm form-inline" [hidden]="!editing || disabled">
                        <div class="form-group">
                            <div #container></div>
                            <span class="inline-editor-button-group">
                                <button id="inline-editor-button-save" class="btn btn-xs btn-primary"
                                    (click)="onSubmit(value)"><span class="fa fa-check"></span></button>
                                <button class="btn btn-xs btn-danger" (click)="cancel(value)"><span class="fa fa-remove"></span> </button>
                            </span>

                            </div>
                        </div>
                    </div>
               </div>`,
    styles: [`a {
    text-decoration: none;
    color: #428bca;
    border-bottom: dashed 1px #428bca;
    cursor: pointer;
    line-height: 2;
    margin-right: 5px;
    margin-left: 5px;
}


/* editable-empty */

.editable-empty,
.editable-empty:hover,
.editable-empty:focus,
a.editable-empty,
a.editable-empty:hover,
a.editable-empty:focus {
    font-style: italic;
    color: #DD1144;
    text-decoration: none;
}

.inlineEditForm {
    display: inline-block;
    white-space: nowrap;
    margin: 0;
}

#inlineEditWrapper {
    display: inline-block;
}

.inlineEditForm input,
select {
    width: auto;
    display: inline;
}

.inline-editor-button-group{
    display:inline-block;
}
.editInvalid{
 color: #a94442;
 margin-bottom: 0;
}

.error {
    border-color: #a94442;
}

[hidden] {
    display: none;
}`],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InlineEditorComponent),
        multi: true,
    }],
    entryComponents: InputComponets,
})
export class InlineEditorComponent implements OnInit, ControlValueAccessor {

    // Inputs implemented
    private components: { [key: string]: any } = {
        text: InputTextComponent,
        number: InputNumberComponent,
        password: InputPasswordComponent,
        range: InputRangeComponent,
        textarea: InputTextareaComponent,
        select: InputSelectComponent,
    };

    private getComponentType(typeName: InputType): any {
        const type = this.components[typeName];

        if (!type) {
            throw new Error('That type does not exist or it is not implemented yet!');
        }

        return type;
    }

    @Input() public type: InputType;

    @Output() public onSave: EventEmitter<any> = new EventEmitter();
    @Output() public onEdit: EventEmitter<any> = new EventEmitter();
    @Output() public onCancel: EventEmitter<any> = new EventEmitter();


    // input's attribute
    @Input() public empty: string;
    @Input() public disabled: boolean;
    @Input() public required: boolean;
    @Input() public placeholder: string;
    @Input() public name: string;
    @Input() public size: number;
    @Input() public min: number;
    @Input() public max: number;
    @Input() public pattern: string;
    // TO DO: This must be outputs events emitter
    @Input() public fnErrorLength;
    @Input() public fnErrorPattern;


    //textarea's attribute
    @Input() public cols: number = 50;
    @Input() public rows: number = 4;

    // select's attribute
    @Input()
    set options(options) {
        if (options['data'] === undefined) {
            this._options = {};
            this._options['data'] = options;
            this._options['value'] = 'value';
            this._options['text'] = 'text';
        } else {
            this._options = options;
        }
    }

    get options() { return this._options; }
    // @Output() public selected:EventEmitter<any> = new EventEmitter();

    public onChange: Function;
    public onTouched: Function;

    private _value: string = '';
    private preValue: string = '';
    private editing: boolean = false;
    public isEmpty: boolean = false;
    private _options;

    public get value(): any { return this._value; };

    public set value(newValue: any) {
        if (newValue !== this._value) {
            this._value = newValue;
            this.onChange(newValue);
        }
    }

    constructor(public componentFactoryResolver: ComponentFactoryResolver) { }

    private componentRef: ComponentRef<{}>;

    @ViewChild('container', { read: ViewContainerRef })
    private container: ViewContainerRef;
    private inputInstance: InputBase;

    ngOnInit() {
        if (this.type) {
            this.initializeProperties();
            this.generateComponent(this.type);
        }
    }

    private generateComponent(type: InputType) {
        const componentType = this.getComponentType(type);
        this.inputInstance = this.createInputInstance(componentType);
        this.inputInstance.setContext(this);
    }

    private createInputInstance(componentType): InputBase {
        const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        this.componentRef = this.container.createComponent(factory);

        return <InputBase>this.componentRef.instance;
    }

    public initializeProperties(): void {
        this.initProperty('type');
        this.initProperty('disabled');
        this.initProperty('placeholder');
        this.initProperty('empty');
        this.initProperty('name');
        this.initProperty('size');
        this.initProperty('min');
        this.initProperty('max');
        this.initProperty('pattern');
        this.initProperty('fnErrorLength');
        this.initProperty('fnErrorPattern');
    }

    writeValue(value: any) {
        if (value || value == 0) {
            this.value = value;
            this.isEmpty = false;
        } else {

            /*if (this.type === "select") {
                this.empty = this.options.data[0][this.options.value];
            }*/
            //this._value = this.empty;
            this.isEmpty = true;
        }
    }

    public registerOnChange(fn: Function): void { this.onChange = fn; }

    public registerOnTouched(fn: Function): void { this.onTouched = fn; };

    // Method to display the inline edit form and hide the <a> element
    edit(value): void {
        this.preValue = value;  // Store original value in case the form is cancelled
        this.editing = true;
        this.inputInstance.focus();
        this.onEdit.emit(this);
    }

    // Method to display the editable value as text and emit save event to host
    onSubmit(value): void {
        if (this.pattern && this.inputInstance.isRegexTestable && !new RegExp(this.pattern).test(value)) {
            return this.fnErrorPattern();
        }

        const length = this.inputInstance.isNumeric ? Number(value) : value.length;

        if (length < this.min || length > this.max) {
            return this.fnErrorLength();
        }

        this.onSave.emit(value);
        this.editing = false;
        this.isEmpty = false;
    }

    // Method to reset the editable value
    cancel(value: any): void {
        this.value = this.preValue;
        this.editing = false;

        this.onCancel.emit(this);
    }

    private initProperty(property: string): void {
        this[property] = typeof this[property] !== 'undefined'
            ? this[property]
            : inputConfig[property];
    }

    public showText(): any {
        return this.inputInstance ? this.inputInstance.getPlaceholder() : "Loading...";
    }
}
