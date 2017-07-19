---
title: Input number
type: page
weight: 500
---
*  `type`: 'number'.

*  \[`min`]: `number`. Valor mínimo del elemento \<input>. Por defecto `0`.

*  \[`max`]: `number`. Valor máximo del elemento \<input>. Por defecto `Infinity`.

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
          type="number" 
          [(ngModel)]="editableText" 
          (onSave)="saveEditable($event)" 
          (onBlur)="saveEditable($event)"
          min="20"
          max="120"
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
