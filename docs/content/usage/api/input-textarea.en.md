---
title: Input textarea
type: page
weight: 550
---

*  `type`: 'textarea'.

* \[`rows`]: `number`. Visible height of a text area. Default `4`.

* \[`cols`]: `number`. Visible width of a text area. Default `10`.

* \[`pattern`]: `string | RegExp`. Define a regular expression to \<input> element's value. If \<input> element's value does not correct according to its regular expression, its value will not be changed. Default `''`.

<!--more-->

``` typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1> {{editableText}} </h1>
    <div>
        <inline-editor 
          type="textarea" 
          [(ngModel)]="editableText" 
          (onSave)="saveEditable($event)" 
          (onBlur)="saveEditable($event)"
          rows="14"
          cols="15"
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
