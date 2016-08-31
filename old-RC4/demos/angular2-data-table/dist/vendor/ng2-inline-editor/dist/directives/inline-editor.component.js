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
var common_1 = require("@angular/common");
var INLINE_EDIT_CONTROL_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return InlineEditComponent; }),
    multi: true
});
// TO-DO Default's value
var inputConfig = {
    empty: 'empty',
    type: 'text',
    disabled: false,
    name: '',
    size: 8,
    min: 1,
    max: Infinity,
    fnErrorLength: function (x) { alert('Error: Lenght!'); }
};
var INLINE_EDITOR_TEMPLATE = "\n<div id=\"inlineEditWrapper\">\n    <p [ngSwitch]=\"type\">\n       <template [ngSwitchCase]=\"'password'\">\n          <a [ngClass]=\"{'editable-empty': isEmpty }\" (click)=\"edit(value)\" [hidden]=\"editing\"> ****** </a>\n        </template>\n        <template [ngSwitchCase]=\"'select'\">\n          <a [ngClass]=\"{'editable-empty': isEmpty }\"  (click)=\"edit(value)\" [hidden]=\"editing\"> {{optionSelected()}} </a>\n        </template>\n        <template ngSwitchDefault>\n            <a [ngClass]=\"{'editable-empty': isEmpty }\"  (click)=\"edit(value)\" [hidden]=\"editing\">{{ value }}</a>\n        </template>\n    </p>\n    \n    <!-- inline edit form -->\n    <div class=\"inlineEditForm form-inline\" [hidden]=\"!editing\">\n        <div class=\"form-group\">\n\n            <!-- inline edit control  -->\n            <p [ngSwitch]=\"type\">\n                <template [ngSwitchCase]=\"'text'\">\n                    <input #inlineEditControl class=\"form-control\" [(ngModel)]=\"value\" [required]=\"required\" [disabled]=\"disabled\" [name]=\"name\" [size]=\"size\" />\n                </template>\n                <template [ngSwitchCase]=\"'textarea'\">\n                    <textarea [rows]=\"rows\" [cols]=\"cols\" #inlineEditControl class=\"form-control\" [(ngModel)]=\"value\" [required]=\"required\" [disabled]=\"disabled\" ></textarea>\n                </template>\n                <template [ngSwitchCase]=\"'select'\">\n                    <select #inlineEditControl class=\"form-control\" [(ngModel)]=\"value\">\n                    <template ngFor let-item [ngForOf]=\"options.data\">\n                        <optgroup *ngIf=\"item.children\" label=\"{{item[options.text]}}\">\n                            <option *ngFor=\"let child of item.children\" value=\"{{child[options.value]}}\">\n                                {{child[options.text]}}\n                            </option>\n                        </optgroup>\n                     <option *ngIf=\"!item.children\" value=\"{{item[options.value]}}\">{{item[options.text]}}</option>\n                    </template>\n                    </select>\n                </template>\n                <template ngSwitchDefault>\n                    <input [type]=\"type\"  #inlineEditControl class=\"form-control\" [(ngModel)]=\"value\" [required]=\"required\" [disabled]=\"disabled\" />\n                </template>\n            </p>\n\n            <span>\n                <button id=\"inline-editor-button-save\" class=\"btn btn-xs btn-primary\" (click)=\"onSubmit(value)\"><span class=\"fa fa-check\"></span></button>\n                <button class=\"btn btn-xs btn-danger\" (click)=\"cancel(value)\"><span class=\"fa fa-remove\"></span></button>\n            </span>\n\n        </div>\n    </div>\n</div>";
var INLINE_EDITOR_CSS = "\na {\n text-decoration: none;\n color: #428bca;\n border-bottom: dashed 1px #428bca;\n cursor: pointer;\n line-height: 2;\n margin-right: 5px;\n margin-left: 5px;\n}\n\n/* editable-empty */\n.editable-empty, \n.editable-empty:hover, \n.editable-empty:focus,\na.editable-empty, \na.editable-empty:hover, \na.editable-empty:focus {\n  font-style: italic; \n  color: #DD1144;  \n  text-decoration: none;\n}\n\n.inlineEditForm{\n display: inline-block;\n white-space: nowrap;\n margin: 0;\n}\n#inlineEditWrapper{\n display: inline-block;\n}\n.inlineEditForm input, select{\n width: auto;\n display: inline;\n}\n.editInvalid{\n color: #a94442;\n margin-bottom: 0;\n}\n.error{\n border-color: #a94442;\n}\n[hidden] {\n display: none;\n}";
var InlineEditComponent = (function () {
    function InlineEditComponent(element, _renderer) {
        this._renderer = _renderer;
        this.onSave = new core_1.EventEmitter();
        //textarea's attribute
        this.cols = 50;
        this.rows = 4;
        //@Output() public selected:EventEmitter<any> = new EventEmitter();
        this._value = '';
        this.preValue = '';
        this.editing = false;
        this.isEmpty = false; //isEmpty the value?
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
    }
    Object.defineProperty(InlineEditComponent.prototype, "value", {
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
    InlineEditComponent.prototype.ngOnInit = function () {
        this.type = typeof this.type !== 'undefined'
            ? this.type
            : inputConfig.type;
        this.disabled = typeof this.disabled !== 'undefined'
            ? this.disabled
            : inputConfig.disabled;
        this.empty = typeof this.empty !== 'undefined'
            ? this.empty
            : inputConfig.empty;
        console.log(this.empty);
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
    InlineEditComponent.prototype.writeValue = function (value) {
        if (value) {
            this._value = value;
            this.isEmpty = false;
        }
        else {
            if (this.type == "select") {
                this.empty = this.options.data[0][this.options.value];
            }
            this._value = this.empty;
            this.isEmpty = true;
        }
    };
    InlineEditComponent.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    InlineEditComponent.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    ;
    InlineEditComponent.prototype.optionSelected = function () {
        var dataLength = this.options['data'].length;
        var i = 0;
        while (dataLength > i) {
            var element_1 = this.options['data'][i];
            if (element_1[this.options['value']] == this['value']) {
                return element_1[this.options['text']];
            }
            if (element_1.hasOwnProperty('children')) {
                var childrenLength = element_1.children.length;
                var j = 0;
                while (childrenLength > j) {
                    var children = element_1.children[j];
                    if (children[this.options['value']] == this['value'])
                        return children[this.options['text']];
                    j++;
                }
            }
            i++;
        }
    };
    // Method to display the inline edit form and hide the <a> element
    InlineEditComponent.prototype.edit = function (value) {
        var _this = this;
        this.preValue = value; // Store original value in case the form is cancelled
        this.editing = true;
        // Automatically focus input
        setTimeout(function (_) { return _this._renderer.invokeElementMethod(_this.inlineEditControl.nativeElement, 'focus', []); });
    };
    // Method to display the editable value as text and emit save event to host
    InlineEditComponent.prototype.onSubmit = function (value) {
        if (value.length < this.min || value.length > this.max) {
            this.fnErrorLength();
        }
        else {
            this.onSave.emit(value);
            this.editing = false;
            this.isEmpty = false;
        }
    };
    // Method to reset the editable value
    InlineEditComponent.prototype.cancel = function (value) {
        this._value = this.preValue;
        this.editing = false;
    };
    __decorate([
        core_1.ViewChild('inlineEditControl'), 
        __metadata('design:type', Object)
    ], InlineEditComponent.prototype, "inlineEditControl", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], InlineEditComponent.prototype, "onSave", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InlineEditComponent.prototype, "empty", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InlineEditComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], InlineEditComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InlineEditComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], InlineEditComponent.prototype, "size", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], InlineEditComponent.prototype, "min", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], InlineEditComponent.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InlineEditComponent.prototype, "fnErrorLength", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], InlineEditComponent.prototype, "cols", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], InlineEditComponent.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InlineEditComponent.prototype, "options", void 0);
    InlineEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'inline-editor',
            providers: [INLINE_EDIT_CONTROL_VALUE_ACCESSOR],
            template: INLINE_EDITOR_TEMPLATE,
            styles: [INLINE_EDITOR_CSS]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], InlineEditComponent);
    return InlineEditComponent;
}());
exports.InlineEditComponent = InlineEditComponent;
//# sourceMappingURL=inline-editor.component.js.map