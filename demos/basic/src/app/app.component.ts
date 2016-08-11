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
  editableSelectOptions =[
    {value: 1, text: 'status1'},
    {value: 2, text: 'status2'},
    {value: 3, text: 'status3'},
    {value: 4, text: 'status4'}
  ]; 

  saveEditable(value) {
    //call to http server
    console.log('http.server: ' + value);

  }
}
