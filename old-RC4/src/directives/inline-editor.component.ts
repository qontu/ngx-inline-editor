import {Component, OnInit, Output, Input, Provider, forwardRef, EventEmitter, ElementRef, ViewChild, Renderer} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/common";

const INLINE_EDIT_CONTROL_VALUE_ACCESSOR = new Provider(
    NG_VALUE_ACCESSOR, {
        useExisting: forwardRef(() => InlineEditComponent),
        multi: true
    });

@Component({
    moduleId: module.id,
    selector: 'inline-editor',
    providers: [INLINE_EDIT_CONTROL_VALUE_ACCESSOR],
    template: `<div id="inlineEditWrapper">

    <!-- editable value -->
    <p [ngSwitch]="type">
       <template [ngSwitchCase]="'password'">
          <a (click)="edit(value)" [hidden]="editing"> ****** </a>
        </template>
        <template [ngSwitchCase]="'select'">
          <a (click)="edit(value)" [hidden]="editing"> {{optionSelected()}} </a>
        </template>
        <template ngSwitchDefault>
            <a (click)="edit(value)" [hidden]="editing">{{ value }}</a>
        </template>
    </p>
    
    <!-- inline edit form -->
    <div class="inlineEditForm form-inline" [hidden]="!editing">
        <div class="form-group">

            <!-- inline edit control  -->

            <p [ngSwitch]="type">
                <template [ngSwitchCase]="'text'">
                    <input #inlineEditControl class="form-control" [(ngModel)]="value" [required]="required" [disabled]="disabled" [name]="name" [size]="size" />
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
                    <input [type]="type"  #inlineEditControl class="form-control" [(ngModel)]="value" [required]="required" [disabled]="disabled" />
                </template>
            </p>

            <span>
                <button id="inline-editor-button-save" class="btn btn-xs btn-primary" (click)="onSubmit(value)"><span class="fa fa-check"></span></button>
                <button class="btn btn-xs btn-danger" (click)="cancel(value)"><span class="fa fa-remove"></span></button>
            </span>

        </div>
    </div>
</div>`,
    styles: [`
    a {
 text-decoration: none;
 color: #428bca;
 border-bottom: dashed 1px #428bca;
 cursor: pointer;
 line-height: 2;
 margin-right: 5px;
 margin-left: 5px;
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
}
  `]
    //templateUrl: 'inline-editor.component.html',
    // styleUrls: ['inline-editor.component.css']
})
export class InlineEditComponent implements ControlValueAccessor, OnInit {
    // inline edit form control
    @ViewChild('inlineEditControl') inlineEditControl;
    @Output() public onSave: EventEmitter<any> = new EventEmitter();

    //input's attribute
    @Input() public type: string = 'text';
    @Input() public disabled: boolean = false;
    @Input() public name: string;
    @Input() public size: number = 8;
    @Input() public min: number = 1;
    @Input() public max: number = Infinity;
    @Input() public fnErrorLength = function () { alert('Error: Lenght!'); }


    //textarea's attribute
    @Input() public cols: number = 50;
    @Input() public rows: number = 4;

    //select's attribute
    @Input() public options;
    //@Output() public selected:EventEmitter<any> = new EventEmitter();


    private _value: string = '';
    private preValue: string = '';
    private editing: boolean = false;

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
        this._value = value;
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
        /*
        return (this.options['data'].find(
            (element) => {
                    if(element.hasOwnProperty('children')){
                        let child = element.children.find(
                            (child) => {
                                return child[this.options['value']] == this['value']
                            }
                        )
                        if(child != undefined) return child
                    }
                return element[this.options['value']] == this['value']
            }
        ))[this.options['text']];
        */
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
        if (value.length < this.min || value.length > this.max) {
            this.fnErrorLength();
        } else {
            this.onSave.emit(value);
            this.editing = false;
        }
    }

    // Method to reset the editable value
    cancel(value: any) {
        this._value = this.preValue;
        this.editing = false;
    }
}
