"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return InlineEditorComponent; }),
    multi: true
};
// TO-DO Default's value
var inputConfig = {
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
var INLINE_EDITOR_TEMPLATE = "\n<div id=\"inlineEditWrapper\">\n    <div [ngSwitch]=\"type\">\n       <template [ngSwitchCase]=\"'password'\">\n          <a [ngClass]=\"{'editable-empty': isEmpty }\" (click)=\"edit(value)\" [hidden]=\"editing\"> ****** </a>\n        </template>\n        <template [ngSwitchCase]=\"'select'\">\n          <a [ngClass]=\"{'editable-empty': isEmpty }\"  (click)=\"edit(value)\" [hidden]=\"editing\"> {{optionSelected()}} </a>\n        </template>\n        <template ngSwitchDefault>\n            <a [ngClass]=\"{'editable-empty': isEmpty }\"  (click)=\"edit(value)\" [hidden]=\"editing\">{{ showText() }}</a>\n        </template>\n    </div>\n    \n    <!-- inline edit form -->\n    <div class=\"inlineEditForm form-inline\" [hidden]=\"!editing\">\n        <div class=\"form-group\">\n\n            <!-- inline edit control  -->\n            <p [ngSwitch]=\"type\">\n                <template [ngSwitchCase]=\"'text'\">\n                    <input #inlineEditControl class=\"form-control\" [(ngModel)]=\"value\" [required]=\"required\" [disabled]=\"disabled\" [name]=\"name\" [placeholder]=\"placeholder\" [size]=\"size\"/>\n                </template>\n                <template [ngSwitchCase]=\"'textarea'\">\n                    <textarea [rows]=\"rows\" [cols]=\"cols\" #inlineEditControl class=\"form-control\" [(ngModel)]=\"value\" [required]=\"required\" [placeholder]=\"placeholder\" [disabled]=\"disabled\" ></textarea>\n                </template>\n                <template [ngSwitchCase]=\"'select'\">\n                    <select #inlineEditControl class=\"form-control\" [(ngModel)]=\"value\">\n                    <template ngFor let-item [ngForOf]=\"options.data\">\n                  \n                        <optgroup *ngIf=\"item.children\" label=\"{{item[options.text]}}\">\n                            <option *ngFor=\"let child of item.children\" value=\"{{child[options.value]}}\">\n                                {{child[options.text]}}\n                            </option>\n                        </optgroup>\n                     <option *ngIf=\"!item.children\" value=\"{{item[options.value]}}\">{{item[options.text]}}</option>\n                    </template>\n                    </select>\n                </template>\n                <template ngSwitchDefault>\n                    <input [type]=\"type\"  #inlineEditControl class=\"form-control\" [(ngModel)]=\"value\" [required]=\"required\" [placeholder]=\"placeholder\" [disabled]=\"disabled\"  [name]=\"name\" [size]=\"size\"/>\n                </template>\n            </p>\n\n            <span>\n                <button id=\"inline-editor-button-save\" class=\"btn btn-xs btn-primary\" (click)=\"onSubmit(value)\"><span class=\"fa fa-check\"></span></button>\n                <button class=\"btn btn-xs btn-danger\" (click)=\"cancel(value)\"><span class=\"fa fa-remove\"></span></button>\n            </span>\n\n        </div>\n    </div>\n</div>";
var INLINE_EDITOR_CSS = "\na {\n text-decoration: none;\n color: #428bca;\n border-bottom: dashed 1px #428bca;\n cursor: pointer;\n line-height: 2;\n margin-right: 5px;\n margin-left: 5px;\n}\n\n/* editable-empty */\n.editable-empty, \n.editable-empty:hover, \n.editable-empty:focus,\na.editable-empty, \na.editable-empty:hover, \na.editable-empty:focus {\n  font-style: italic; \n  color: #DD1144;  \n  text-decoration: none;\n}\n\n.inlineEditForm{\n display: inline-block;\n white-space: nowrap;\n margin: 0;\n}\n#inlineEditWrapper{\n display: inline-block;\n}\n.inlineEditForm input, select{\n width: auto;\n display: inline;\n}\n.editInvalid{\n color: #a94442;\n margin-bottom: 0;\n}\n.error{\n border-color: #a94442;\n}\n[hidden] {\n display: none;\n}";
var InlineEditorComponent = (function () {
    function InlineEditorComponent(element, _renderer) {
        this._renderer = _renderer;
        this.onSave = new core_1.EventEmitter();
        this.onEdit = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        //textarea's attribute
        this.cols = 50;
        this.rows = 4;
        //@Output() public selected:EventEmitter<any> = new EventEmitter();
        this._value = '';
        this.preValue = '';
        this.editing = false;
        this.isEmpty = false;
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
    }
    Object.defineProperty(InlineEditorComponent.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            if (v !== this._value) {
                this._value = v;
                this.onChange(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    InlineEditorComponent.prototype.ngOnInit = function () {
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
        if (this.type == "select") {
            if (this.options['data'] === undefined) {
                var tmp = this.options;
                this.options = {};
                this.options['data'] = tmp;
                this.options['value'] = 'value';
                this.options['text'] = 'text';
            }
        }
    };
    InlineEditorComponent.prototype.initProperty = function (property) {
        this[property] = typeof this[property] !== 'undefined'
            ? this[property]
            : inputConfig[property];
    };
    InlineEditorComponent.prototype.writeValue = function (value) {
        if (value || value == 0) {
            this.value = value;
            this.isEmpty = false;
        }
        else {
            /*if (this.type == "select") {
                this.empty = this.options.data[0][this.options.value];
            }*/
            //this._value = this.empty;
            this.isEmpty = true;
        }
    };
    InlineEditorComponent.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    InlineEditorComponent.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    ;
    InlineEditorComponent.prototype.showText = function () {
        return (this.isEmpty) ? this.empty : this.value;
    };
    InlineEditorComponent.prototype.optionSelected = function () {
        var dataLength = this.options['data'].length;
        var i = 0;
        while (dataLength > i) {
            var element = this.options['data'][i];
            if (element[this.options['value']] == this['value']) {
                return element[this.options['text']];
            }
            if (element.hasOwnProperty('children')) {
                var childrenLength = element.children.length;
                var j = 0;
                while (childrenLength > j) {
                    var children = element.children[j];
                    if (children[this.options['value']] == this['value'])
                        return children[this.options['text']];
                    j++;
                }
            }
            i++;
        }
        return this.empty;
    };
    // Method to display the inline edit form and hide the <a> element
    InlineEditorComponent.prototype.edit = function (value) {
        var _this = this;
        this.preValue = value; // Store original value in case the form is cancelled
        this.editing = true;
        // Automatically focus input
        setTimeout(function (_) { return _this._renderer.invokeElementMethod(_this.inlineEditControl.nativeElement, 'focus', []); });
        this.onEdit.emit(this);
    };
    // Method to display the editable value as text and emit save event to host
    InlineEditorComponent.prototype.onSubmit = function (value) {
        var rExp = new RegExp(this.pattern);
        if (!rExp.test(value)) {
            this.fnErrorPattern();
        }
        else if (value.length < this.min || value.length > this.max) {
            this.fnErrorLength();
        }
        else {
            this.onSave.emit(value);
            this.editing = false;
            this.isEmpty = false;
        }
    };
    // Method to reset the editable value
    InlineEditorComponent.prototype.cancel = function (value) {
        this._value = this.preValue;
        this.editing = false;
        this.onCancel.emit(this);
    };
    __decorate([
        core_1.ViewChild('inlineEditControl'), 
        __metadata('design:type', Object)
    ], InlineEditorComponent.prototype, "inlineEditControl", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], InlineEditorComponent.prototype, "onSave", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], InlineEditorComponent.prototype, "onEdit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], InlineEditorComponent.prototype, "onCancel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InlineEditorComponent.prototype, "empty", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InlineEditorComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], InlineEditorComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InlineEditorComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InlineEditorComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], InlineEditorComponent.prototype, "size", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], InlineEditorComponent.prototype, "min", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], InlineEditorComponent.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InlineEditorComponent.prototype, "fnErrorLength", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InlineEditorComponent.prototype, "pattern", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InlineEditorComponent.prototype, "fnErrorPattern", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], InlineEditorComponent.prototype, "cols", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], InlineEditorComponent.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InlineEditorComponent.prototype, "options", void 0);
    InlineEditorComponent = __decorate([
        core_1.Component({
            selector: 'inline-editor',
            template: INLINE_EDITOR_TEMPLATE,
            styles: [INLINE_EDITOR_CSS],
            providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], InlineEditorComponent);
    return InlineEditorComponent;
}());
exports.InlineEditorComponent = InlineEditorComponent;
//# sourceMappingURL=inline-editor.component.js.map