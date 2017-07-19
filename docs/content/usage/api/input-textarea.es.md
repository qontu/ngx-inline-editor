---
title: Input textarea
type: page
weight: 550
---

*  `type`: 'textarea'.

* \[`rows`]: `number`. Altura del text area. Por defecto `4`.

* \[`cols`]: `number`. Anchura del text area. Por defecto `10`.

* \[`pattern`]: `string | RegExp`.  Define una expresión regular para el valor del elemento \<input>. Si éste no cumple la expresión regular, su valor no será cambiado. Por defecto `''`.

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
