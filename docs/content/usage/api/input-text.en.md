---
title: Input text
type: page
weight: 400
---

* `type`: 'text'.

* \[`pattern`]: `string | RegExp`. Define a regular expression to \<input> element's value. If \<input> element's value does not correct according to its regular expression, its value will not be changed. Default `''`.


<!--more-->

Little example:

``` typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1> {{editableText}} </h1>
    <div>
        <inline-editor 
          type="text" 
          pattern="\w*" 
          [(ngModel)]="editableText" 
          (onSave)="saveEditable($event)" 
          (onBlur)="saveEditable($event)"
          size="20"
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
