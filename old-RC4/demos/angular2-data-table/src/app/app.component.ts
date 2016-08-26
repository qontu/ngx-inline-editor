import { Component } from '@angular/core';

import { InlineEditorDirectives} from 'ng2-inline-editor';

import {
  DATATABLE_COMPONENTS,
  TableOptions,
  TableColumn,
  ColumnMode
} from 'angular2-data-table';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  directives: [DATATABLE_COMPONENTS, InlineEditorDirectives],

  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'angular2-data-table + ng2-inline-editor';
  rows = []
  constructor() {
    this.fetch((data) => {
      this.rows.push(...data);
      console.log(data);
    });

  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'https://npmcdn.com/angular2-data-table@0.2.0/assets/data/company.json');

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 'auto'
  });

  editableSelectOptions = [
    { value: 'male', text: 'male' },
    { value: 'female', text: 'female' }
  ]



  saveEditable(value) {
    //call to http server
    console.log('http.server: ' + value);

  }
}
