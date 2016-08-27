import { Component, forwardRef, Input, OnInit, Output, EventEmitter, ElementRef, ViewChild, Renderer } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InlineEditorComponent),
    multi: true
};

// TO-DO interface hierarchy
export interface InputConfig {
    //input's attribute
    empty: string,
    type: string,
    disabled: boolean,
    name: string,
    size: number,
    min: number,
    max: number,
    pattern: string,
    fnErrorLength: (any: any) => void,
    fnErrorPattern: (any: any) => void
}

// TO-DO Default's value
const inputConfig: InputConfig = {
    empty: 'empty',
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


const INLINE_EDITOR_TEMPLATE = `
<div id="inlineEditWrapper">
    <div [ngSwitch]="type">
       <template [ngSwitchCase]="'password'">
          <a [ngClass]="{'editable-empty': isEmpty }" (click)="edit(value)" [hidden]="editing"> ****** </a>
        </template>
        <template [ngSwitchCase]="'select'">
          <a [ngClass]="{'editable-empty': isEmpty }"  (click)="edit(value)" [hidden]="editing"> {{optionSelected()}} </a>
        </template>
        <template ngSwitchDefault>
            <a [ngClass]="{'editable-empty': isEmpty }"  (click)="edit(value)" [hidden]="editing">{{ value }}</a>
        </template>
    </div>
    
    <!-- inline edit form -->
    <div class="inlineEditForm form-inline" [hidden]="!editing">
        <div class="form-group">

            <!-- inline edit control  -->
            <p [ngSwitch]="type">
                <template [ngSwitchCase]="'text'">
                    <input #inlineEditControl class="form-control" [(ngModel)]="value" [required]="required" [disabled]="disabled" [name]="name" [size]="size"/>
                </template>
                <template [ngSwitchCase]="'textarea'">
                    <textarea [rows]="rows" [cols]="cols" #inlineEditControl class="form-control" [(ngModel)]="value" [required]="required" [disabled]="disabled" ></textarea>
                </template>
                <template [ngSwitchCase]="'select'">
                    <select #inlineEditControl class="form-control" [(ngModel)]="value">
                    <template ngFor let-item [ngForOf]="options.data">
                        <optgroup *ngIf="item.children" label="{{item[options.text]}}">
                            <option *ngFor="let child of item.children" value="{{child[options.value]}}">
                                {{child[options.text]}}
                            </option>
                        </optgroup>
                     <option *ngIf="!item.children" value="{{item[options.value]}}">{{item[options.text]}}</option>
                    </template>
                    </select>
                </template>
                <template ngSwitchDefault>
                    <input [type]="type"  #inlineEditControl class="form-control" [(ngModel)]="value" [required]="required" [disabled]="disabled"  [name]="name" [size]="size"/>
                </template>
            </p>

            <span>
                <button id="inline-editor-button-save" class="btn btn-xs btn-primary" (click)="onSubmit(value)"><span class="fa fa-check"></span></button>
                <button class="btn btn-xs btn-danger" (click)="cancel(value)"><span class="fa fa-remove"></span></button>
            </span>

        </div>
    </div>
</div>`;


const INLINE_EDITOR_CSS = `
a {
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

.inlineEditForm{
 display: inline-block;
 white-space: nowrap;
 margin: 0;
}
#inlineEditWrapper{
 display: inline-block;
}
.inlineEditForm input, select{
 width: auto;
 display: inline;
}
.editInvalid{
 color: #a94442;
 margin-bottom: 0;
}
.error{
 border-color: #a94442;
}
[hidden] {
 display: none;
}`

@Component({
    selector: 'inline-editor',
    template: INLINE_EDITOR_TEMPLATE,
    styles: [INLINE_EDITOR_CSS],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InlineEditorComponent implements ControlValueAccessor, OnInit, InputConfig {

    // inline edit form control
    @ViewChild('inlineEditControl') inlineEditControl;
    @Output() public onSave: EventEmitter<any> = new EventEmitter();

    //Configuration attribute 
    @Input() empty: string;

    //input's attribute
    @Input() public type: string;
    @Input() public disabled: boolean;
    @Input() public name: string;
    @Input() public size: number;
    @Input() public min: number;
    @Input() public max: number;
    @Input() public fnErrorLength;
    @Input() public pattern: string;
    @Input() public fnErrorPattern;

    //textarea's attribute
    @Input() public cols: number = 50;
    @Input() public rows: number = 4;

    //select's attribute
    @Input() public options;
    //@Output() public selected:EventEmitter<any> = new EventEmitter();


    private _value: string = '';
    private preValue: string = '';
    private editing: boolean = false;
    private isEmpty: boolean = false; //isEmpty the value?

    public onChange: any = Function.prototype;
    public onTouched: any = Function.prototype;

    get value(): any { return this._value; };

    set value(v: any) {

        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }

    constructor(element: ElementRef, private _renderer: Renderer) { }

    ngOnInit() {
        this.type = typeof this.type !== 'undefined'
            ? this.type
            : inputConfig.type;

        this.disabled = typeof this.disabled !== 'undefined'
            ? this.disabled
            : inputConfig.disabled;
        this.empty = typeof this.empty !== 'undefined'
            ? this.empty
            : inputConfig.empty;

        this.name = typeof this.name !== 'undefined'
            ? this.name
            : inputConfig.name;

        this.size = typeof this.size !== 'undefined'
            ? this.size
            : inputConfig.size;
        this.min = typeof this.min !== 'undefined'
            ? this.min
            : inputConfig.min;
        this.max = typeof this.max !== 'undefined'
            ? this.max
            : inputConfig.max;
        this.fnErrorLength = typeof this.fnErrorLength !== 'undefined'
            ? this.fnErrorLength
            : inputConfig.fnErrorLength;
        this.pattern = typeof this.pattern !== 'undefined'
            ? this.pattern
            : inputConfig.pattern;
        this.fnErrorPattern = typeof this.fnErrorPattern !== 'undefined'
            ? this.fnErrorPattern
            : inputConfig.fnErrorPattern;


        if (this.type == "select") {
            if (this.options['data'] === undefined) {
                let tmp = this.options;
                this.options = {};
                this.options['data'] = tmp;
                this.options['value'] = 'value';
                this.options['text'] = 'text';
            }
        }
    }

    writeValue(value: any) {
        if (value) {
            this.value = value;
            this.isEmpty = false;
        } else {

            if (this.type == "select") {
                this.empty = this.options.data[0][this.options.value];
            }
            this._value = this.empty;
            this.isEmpty = true;
        }
    }

    public registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }

    public registerOnTouched(fn: () => {}): void { this.onTouched = fn; };

    private optionSelected() {
        let dataLength = this.options['data'].length;
        let i = 0;
        while (dataLength > i) {
            let element = this.options['data'][i];
            if (element[this.options['value']] == this['value']) {
                return element[this.options['text']];
            }
            if (element.hasOwnProperty('children')) {
                let childrenLength = element.children.length;
                let j = 0;
                while (childrenLength > j) {
                    let children = element.children[j];
                    if (children[this.options['value']] == this['value'])
                        return children[this.options['text']];
                    j++;
                }
            }
            i++;
        }
    }
    // Method to display the inline edit form and hide the <a> element
    edit(value) {
        this.preValue = value;  // Store original value in case the form is cancelled
        this.editing = true;
        // Automatically focus input
        setTimeout(_ => this._renderer.invokeElementMethod(this.inlineEditControl.nativeElement, 'focus', []));
    }

    // Method to display the editable value as text and emit save event to host
    onSubmit(value) {
        let rExp = new RegExp(this.pattern);
        if (!rExp.test(value)) {
            this.fnErrorPattern();
        }
        else if (value.length < this.min || value.length > this.max) {
            this.fnErrorLength();
        } else {
            this.onSave.emit(value);
            this.editing = false;
            this.isEmpty = false;
        }
    }

    // Method to reset the editable value
    cancel(value: any) {
        this._value = this.preValue;
        this.editing = false;
    }

}
