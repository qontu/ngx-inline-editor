---
title: Input select
type: page
weight: 450
---


*  `type`: 'select'.

*  \[`options`]: `Object`
	*  `text`: `string`
	*  `value`: `string`
	*  `data`: `Object[]`


<!--more-->

Example:

``` typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1> {{editableText}} </h1>
    <div>
        <inline-editor 
          type="select" 
          [(ngModel)]="editableText" 
          (onSave)="saveEditable($event)" 
          (onBlur)="saveEditable($event)"
          [options]= "{
            text: 'textOption',
            value: 'valueOption',
            data: [ 
              { valueOption: 'value', textOption: 'textOption' },
              { valueOption: 'secondValue', textOption: 'secondText' }
             ]
          }"
          placeholder="This is my placeholder!"
          empty="Be care! You're leaving this input empty."
          [onlyValue]="false"
          [saveOnBlur]="true">
        </inline-editor>
    </div>
  `
})
export class AppComponent {
  editableText = 'myText';

  saveEditable(event) {
    console.log(event);
  }
}

```
