---
title: Common attributes
type: page
weight: 350
---

This attributes are common to all types of inputs: 

* `type`: Specifies the type \<input> element to display and it can be any of the following values:
  * 'text'
  * 'number' 
  * 'select' 
  * 'range' 
  * 'textarea' 
  * 'date'
  * 'time'
  * 'datetime'

* \[`name`]: `string`. \<input> element's name. Default `''`.

* \[`size`]: `number`. \<input> element's width. Default `8`.

* \[`placeholder`]: `string`. \<input> element's placeholder. Default `'placeholder'`.

* \[`empty`]: `string`. When \<input> element is empty, this string appears. Deafult `'empty'`.

* \[`hideButtons`]: `boolean`. If it is set to `true`, buttons of check and cancel will not appear. Default `false`.

* \[`required`]: `boolean`. If it is set to `true` and \<input> element's text is empty, triggers an error. Default `false`.

* \[`disabled`]: `boolean`. If it is set to `true`, it becomes unusable and unclickable. Default `false`.

* \[`onlyValue`]: `boolean`. If it is set to `false`, it sends you metadata of the element (ie. which event was triggered). If set to `true`, it just sends you its value. Default `true`.

* \[`saveOnChange`] : `boolean`. \<input> element's value is saved when its value changes. Default `false`.

* \[`saveOnBlur`] : `boolean`. \<input> element's value is saved when its focus is lost. Default `false`.

* \[`saveOnEnter`] : `boolean`. \<input> element's value is saved when key Enter is pressed. Default `true`.

* \[`cancelOnEscape`] : `boolean`.\<input> element loses its focus when key Escape is pressed. Default `true`. 

* \[`editOnClick`] : `boolean`. \<input> element get focused when it gets clicked. Default `true`.

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
          type="date" 
          [(ngModel)]="editableText" 
          (onSave)="saveEditable($event)" 
          (onBlur)="saveEditable($event)"
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
