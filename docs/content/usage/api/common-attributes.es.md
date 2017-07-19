---
title: Atributos comunes
type: page
weight: 350
---

Los siguientes atributos son comunes para todos los tipos de inputs:

* `type`: Especifica el tipo de \<input> a mostrar y puede tener los siguientes valores:
  * 'text'
  * 'number' 
  * 'select' 
  * 'range' 
  * 'textarea' 
  * 'date'
  * 'time'
  * 'datetime'

* \[`name`]: `string`. Nombre del elemento \<input>. Por defecto `''`.

* \[`size`]: `number`. Anchura del elemento \<input>. Por defecto `8`.

* \[`placeholder`]: `string`. Placeholder del elemento\<input>. Por defecto `'placeholder'`.

* \[`empty`]: `string`. El texto que se muestra cuando el elemento \<input> está vacio. Por defecto `'empty'`.

* \[`hideButtons`]: `boolean`. Si es `true`, los botones de aceptar y cancelar no aparecerán. Por defecto `false`.

* \[`required`]: `boolean`. Si es `true` y el texto del elemento \<input>, lanza un error. Por defecto `false`.

* \[`disabled`]: `boolean`. Si es `true`, se vuelve inusable y no se le puede hacer click. Por defecto `false`.

* \[`onlyValue`]: `boolean`. Si es `false`, te envía metadatos del elemento (Ej: qué evento fue lanzado). Si es `true`, sólo te manda su valor. Por defecto `true`.

* \[`saveOnChange`] : `boolean`. El elemento \<input> es guardado cuando su valor cambia. Por defecto `false`.

* \[`saveOnBlur`] : `boolean`. El elemento \<input> es guardado cuando pierde el focus. Por defecto `false`.

* \[`saveOnEnter`] : `boolean`. El elemento \<input> es guardado cuando se presiona la tecla Enter. Por defecto `true`.

* \[`cancelOnEscape`] : `boolean`. El elemento <input> pierde el focus cuando la tecla Escape es presionada. Por defecto `true`. 

* \[`editOnClick`] : `boolean`. El elemento \<input> gana el foco cuando se le hace click. Por defecto `true`.

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
