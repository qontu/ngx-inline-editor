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
var InlineEditComponent = (function () {
    function InlineEditComponent(element, _renderer) {
        this._renderer = _renderer;
        this.onSave = new core_1.EventEmitter();
        //input's attribute
        this.type = 'text';
        this.disabled = false;
        this.size = 8;
        this.min = 1;
        this.max = Infinity;
        this.fnErrorLength = function () { alert('Error: Lenght!'); };
        //textarea's attribute
        this.cols = 50;
        this.rows = 4;
        //@Output() public selected:EventEmitter<any> = new EventEmitter();
        this._value = '';
        this.preValue = '';
        this.editing = false;
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
        this._value = value;
    };
    InlineEditComponent.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    InlineEditComponent.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    ;
    InlineEditComponent.prototype.optionSelected = function () {
        var _this = this;
        console.log((this.options['data'].find(function (element) {
            return element[_this.options['value']] == _this['value'];
        }))[this.options['text']]);
        return (this.options['data'].find(function (element) {
            return element[_this.options['value']] == _this['value'];
        }))[this.options['text']];
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
            template: "<div id=\"inlineEditWrapper\">\n\n    <!-- editable value -->\n    <p [ngSwitch]=\"type\">\n       <template [ngSwitchCase]=\"'password'\">\n          <a (click)=\"edit(value)\" [hidden]=\"editing\"> ****** </a>\n        </template>\n        <template [ngSwitchCase]=\"'select'\">\n          <a (click)=\"edit(value)\" [hidden]=\"editing\"> {{optionSelected()}} </a>\n        </template>\n        <template ngSwitchDefault>\n            <a (click)=\"edit(value)\" [hidden]=\"editing\">{{ value }}</a>\n        </template>\n    </p>\n    \n    <!-- inline edit form -->\n    <div class=\"inlineEditForm form-inline\" [hidden]=\"!editing\">\n        <div class=\"form-group\">\n\n            <!-- inline edit control  -->\n\n            <p [ngSwitch]=\"type\">\n                <template [ngSwitchCase]=\"'text'\">\n                    <input #inlineEditControl class=\"form-control\" [(ngModel)]=\"value\" [required]=\"required\" [disabled]=\"disabled\" [name]=\"name\" [size]=\"size\" />\n                </template>\n                <template [ngSwitchCase]=\"'textarea'\">\n                    <textarea [rows]=\"rows\" [cols]=\"cols\" #inlineEditControl class=\"form-control\" [(ngModel)]=\"value\" [required]=\"required\" [disabled]=\"disabled\" ></textarea>\n                </template>\n                <template [ngSwitchCase]=\"'select'\">\n                    <select #inlineEditControl class=\"form-control\" [(ngModel)]=\"value\">\n                        <option *ngFor=\"let optionS of options.data\"  value=\"{{optionS[options.value]}}\">{{optionS[options.text]}}</option>\n                    </select>\n                </template>\n                <template ngSwitchDefault>\n                    <input [type]=\"type\"  #inlineEditControl class=\"form-control\" [(ngModel)]=\"value\" [required]=\"required\" [disabled]=\"disabled\" />\n                </template>\n            </p>\n\n            <span>\n                <button id=\"inline-editor-button-save\" class=\"btn btn-xs btn-primary\" (click)=\"onSubmit(value)\"><span class=\"fa fa-check\"></span></button>\n                <button class=\"btn btn-xs btn-danger\" (click)=\"cancel(value)\"><span class=\"fa fa-remove\"></span></button>\n            </span>\n\n        </div>\n    </div>\n</div>",
            styles: ["\n    a {\n text-decoration: none;\n color: #428bca;\n border-bottom: dashed 1px #428bca;\n cursor: pointer;\n line-height: 2;\n margin-right: 5px;\n margin-left: 5px;\n}\n.inlineEditForm{\n display: inline-block;\n white-space: nowrap;\n margin: 0;\n}\n#inlineEditWrapper{\n display: inline-block;\n}\n.inlineEditForm input, select{\n width: auto;\n display: inline;\n}\n.editInvalid{\n color: #a94442;\n margin-bottom: 0;\n}\n.error{\n border-color: #a94442;\n}\n[hidden] {\n display: none;\n}\n  "]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], InlineEditComponent);
    return InlineEditComponent;
}());
exports.InlineEditComponent = InlineEditComponent;
//# sourceMappingURL=inline-editor.component.js.map