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
var ng2_inline_editor_1 = require('ng2-inline-editor');
var angular2_data_table_1 = require('angular2-data-table');
var AppComponent = (function () {
    function AppComponent() {
        var _this = this;
        this.title = 'angular2-data-table + ng2-inline-editor';
        this.rows = [];
        this.options = new angular2_data_table_1.TableOptions({
            columnMode: angular2_data_table_1.ColumnMode.force,
            headerHeight: 50,
            footerHeight: 50,
            rowHeight: 'auto'
        });
        this.editableSelectOptions = [
            { value: 'male', text: 'male' },
            { value: 'female', text: 'female' }
        ];
        this.editableSelectOptionsConfiguration = {
            data: [
                { id: 1, field: 'status1' },
                { id: 2, field: 'status2' },
                { id: 3, field: 'status3' },
                { id: 4, field: 'status4' }
            ],
            value: 'id',
            text: 'field'
        };
        this.editableSelectOptionsTwoLevelsDefault = 1;
        this.editableSelectOptionsTwoLevelsConfiguration = {
            data: [
                {
                    id: 1, field: 'status1',
                    children: [
                        { id: 5, field: 'status1.1' },
                        { id: 6, field: 'status1.2' }
                    ]
                },
                { id: 2, field: 'status2' },
                { id: 3, field: 'status3' },
                {
                    id: 4, field: 'status4',
                    children: [{ id: 7, field: 'status4.1' }]
                }
            ],
            value: 'id',
            text: 'field'
        };
        this.fnErrorLength = function (x) {
            alert('This is a custom error!');
        };
        this.fetch(function (data) {
            (_a = _this.rows).push.apply(_a, data);
            console.log(data);
            var _a;
        });
    }
    AppComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', 'https://npmcdn.com/angular2-data-table@0.2.0/assets/data/company.json');
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    AppComponent.prototype.saveEditable = function (value) {
        //call to http server
        console.log('http.server: ' + value);
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-root',
            templateUrl: 'app.component.html',
            directives: [angular2_data_table_1.DATATABLE_COMPONENTS, ng2_inline_editor_1.InlineEditorDirectives],
            styleUrls: ['app.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map