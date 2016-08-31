import { Component } from '@angular/core';

import { InlineEditorDirectives} from 'ng2-inline-editor';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  directives: [InlineEditorDirectives],

  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'ng2-inline-editor!';

  editableText = 'myText';
  editablePassword = 'myPassword';
  editableTextArea = 'Text in text area';
  editableSelect = 2;
  editableSelectOptions = [
    { value: 1, text: 'status1' },
    { value: 2, text: 'status2' },
    { value: 3, text: 'status3' },
    { value: 4, text: 'status4' }
  ];

  editableSelectOptionsConfiguration = {
    data: [
      { id: 1, field: 'status1' },
      { id: 2, field: 'status2' },
      { id: 3, field: 'status3' },
      { id: 4, field: 'status4' }
    ],
    value: 'id',
    text: 'field'
  }

  editableSelectOptionsTwoLevelsDefault = 1;
  editableSelectOptionsTwoLevelsConfiguration = {
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
  }

  fnErrorLength = function () {
    alert('This is a custom error!');
  }

  saveEditable(value) {
    //call to http server
    console.log('http.server: ' + value);

  }
}
