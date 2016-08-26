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
var inline_editor_1 = require('inline-editor');
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'ng2-inline-editor!';
        this.editableText = 'myText';
        this.editablePassword = 'myPassword';
        this.editableTextArea = 'Text in text area';
        this.editableSelect = 2;
        this.editableSelectOptions = [
            { value: 1, text: 'status1' },
            { value: 2, text: 'status2' },
            { value: 3, text: 'status3' },
            { value: 4, text: 'status4' }
        ];
    }
    AppComponent.prototype.saveEditable = function (value) {
        //call to http server
        console.log('http.server');
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-root',
            templateUrl: 'app.component.html',
            directives: [inline_editor_1.DIRECTIVES],
            styleUrls: ['app.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map