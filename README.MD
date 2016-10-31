# Native UI Inline-editor Angular2 component ([demo](demos))


Follow me [![twitter](https://img.shields.io/twitter/follow/carlillo.svg?style=social&label=%20carlillo)](https://twitter.com/carlillo) to be notified about new releases.

ng2-inline-editor is a library of Angular2 that allows you to create editable elements.
Such technique is also known as *click-to-edit* or *edit-in-place*.
It is based on ideas of [angular-xeditable](https://github.com/vitalets/angular-xeditable) which is developed in AngularJS and the Julianna Zakula's [original post](https://medium.com/front-end-hacking/inline-editing-with-angular2-58b43cc2aba).


![Version 0.1.0](https://github.com/caballerog/ng2-inline-editor/raw/master/demos/basic/0.1.0.gif)
## Dependencies

Basically it does not depend on any libraries except Angular2 itself.
For themes you may need to include Twitter Bootstrap CSS.

### Angular 2 Version

Angular 2 is not yet stable, and API changes are ongoing. Therefore, if encountering errors using this
lib, ensure your version of Angular is compatible. The current version used to develop this lib is angular2 **2.0.0 **.
If you need to support a previous version of Angular 2 for now, please see the [old README](old-RC4).


## Controls & Features

* [x] text
* [x] textarea
* [x] select
* [ ] checkbox
* [ ] radio
* [ ] date
* [ ] time
* [ ] datetime
* [ ] html5 inputs
  * [x] pattern
  * [x] number
  * [x] range
* [ ] typeahead
* [ ] ui-select
* [ ] complex form
* [ ] editable row
* [ ] editable column
* [ ] editable table
* [ ] themes


## Quick start

1. A recommended way to install ***ng2-inline-editor*** is through [npm](https://www.npmjs.com/search?q=ng2-inline-editor) package manager using the following command:

  `npm i ng2-inline-editor --save`

2. Include [Twitter Bootstrap](http://v4-alpha.getbootstrap.com/) and [FontAwesome](http://fontawesome.io/) in your project.


Usage
-----

## Angular RC 5 and later

Import `InlineEditorModule` into your app's modules:

``` typescript
import {InlineEditorModule} from 'ng2-inline-editor';

@NgModule({
  imports: [
    InlineEditorModule
  ]
})
```

This makes all the `ng2-inline-editor` components available for use in your app components.

## Angular RC 4 and earlier

Use an older version of the library, such as 0.1.0. You can find the documentation
[here](old-RC4).


## Simple Example

You can find a complete example [here](demos/basic)
```TypeScript
import {Component} from '@angular/core';
import {InlineEditorDirectives} from 'ng2-inline-editor';

@Component({
    selector: 'my-component',
    template: `
    <div>
        <inline-editor type="text" [(ngModel)]="editableText" (onSave)="saveEditable($event)" name="editableText1" size="8"></inline-editor>
    </div>
    <div>
        <inline-editor type="password" [(ngModel)]="editablePassword" (onSave)="saveEditable($event)"></inline-editor>
    </div>
    <div>
        <inline-editor type="textarea" [(ngModel)]="editableTextArea" (onSave)="saveEditable($event)"> </inline-editor>
    </div>
    <div>
        <inline-editor type="select" [(ngModel)]="editableSelect" (onSave)="saveEditable($event)" [options]="editableSelectOptions"
        value="valor"></inline-editor>
  </div>`
})
export class MyComponent {
  title = 'My component!';

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
    //call to http service
    console.log('http.service: ' + value);
  }
```


## API

### InlineEditorDirectives

##### Text


```HTML
 <inline-editor
        type="text"
        [(ngModel)]="editableText"
        (onSave)="saveEditable($event)"
        name="editableText1"
        size="8"
        disabled="true"
        min="1"
        max="8"
        pattern="^[a-zA-Z]{1,3}"
        [fnErrorPattern]="myHandlePatternError"
        [fnErrorLength]="myHandleError"></inline-editor>
```

* **`type`** [`string`] Specifies the type `<input>` element to display.
* **`onSave`** [`event handler`] The expression specified will be invoked whenever the form is save via a click on save button.
The `$event` argument will be the value return of the input send.
* **`name`** [`string`] Defines the name of an `<input>` element. Default is `undefined`.
* **`size`** [`number`] Defines the width, in characters, of an `<input>` element. Default is `8`.
* **`disabled`** [`boolean`] If set to `true`, a disabled input element is unusable and un-clickable. Default is `false`.
* **`min`** [`number`] the min attribute specifies the minimum value for an `<input>` element. Default is `1`.
* **`max`** [`number`] the max attribute specifies the maximum value for an `<input>` element. Default is `Infinity`.
* **`fnErrorLength`** [`event handler`] The expression specified will be invoked whenever the form is save via a click on save button and the length of the input is error (the value is not between min and max).
* **`pattern`** [`string`] Regular expression (RegEx) that must satisfy the value.
* **`fnErrorPattern`** [`event handler`] The expression specified will be invoked whenever the form is save via a click on save button and the pattern of the input is error (the value not satisfy the pattern).



##### Password

```HTML
 <inline-editor
        type="password"
        [(ngModel)]="editablePassword"
        (onSave)="saveEditable($event)"
        name="editablePassword"
        size="8"
        disabled="true"
        min="1"
        max="8"
        [fnErrorLength]="myHandleError"></inline-editor>
```

* **`type`** [`string`] Specifies the type `<input>` element to display.
* **`onSave`** [`event handler`] The expression specified will be invoked whenever the form is save via a click on save button.
The `$event` argument will be the value return of the input send.
* **`name`** [`string`] Defines the name of an `<input>` element. Default is `undefined`.
* **`size`** [`number`] Defines the width, in characters, of an `<input>` element. Default is `8`.
* **`disabled`** [`boolean`] If set to `true`, a disabled input element is unusable and un-clickable. Default is `false`.
* **`min`** [`number`] the min attribute specifies the minimum value for an `<input>` element. Default is `1`.
* **`max`** [`number`] the max attribute specifies the maximum value for an `<input>` element. Default is `Infinity`.
* **`fnErrorLength`** [`event handler`] The expression specified will be invoked whenever the form is save via a click on save button and the length of the input is error (the value is not between min and max).


##### TextArea

```HTML
 <inline-editor
        type="textArea"
        [(ngModel)]="editableTextArea"
        (onSave)="saveEditable($event)"
        name="editableTextArea"
        size="8"
        disabled="true"
        cols="50"
        rows="4"
        min="1"
        max="8"
        [fnErrorLength]="myHandleError"></inline-editor>

```

* **`type`** [`string`] Specifies the type `<input>` element to display.
* **`onSave`** [`event handler`] The expression specified will be invoked whenever the form is save via a click on save button.
The `$event` argument will be the value return of the input send.
* **`name`** [`string`] Defines the name of an `<input>` element. Default is `undefined`.
* **`size`** [`number`] Defines the width, in characters, of an `<input>` element. Default is `8`.
* **`disabled`** [`boolean`] If set to `true`, a disabled input element is unusable and un-clickable. Default is `false`.
* **`cols`** [`number`] Specifies the visible width of a text area. Default is `50`.
* **`rows`** [`number`] Specifies the visible height of a text area. Default is `4`.
* **`min`** [`number`] the min attribute specifies the minimum value for an `<input>` element. Default is `1`.
* **`max`** [`number`] the max attribute specifies the maximum value for an `<input>` element. Default is `Infinity`.
* **`fnErrorLength`** [`event handler`] The expression specified will be invoked whenever the form is save via a click on save button and the length of the input is error (the value is not between min and max).


##### Select

##### Basic example

```HTML
<inline-editor
        type="select"
        [(ngModel)]="editableSelect"
        (onSave)="saveEditable($event)"
        name="editableSelect"
        disabled="false"
        [options]="editableSelectOptions"></inline-editor>
```

* **`type`** [`string`] Specifies the type `<input>` element to display.
* **`onSave`** [`event handler`] The expression specified will be invoked whenever the form is save via a click on save button.
The `$event` argument will be the value return of the input send.
* **`name`** [`string`] Defines the name of an `<input>` element. Default is `undefined`.
* **`disabled`** [`boolean`] If set to `true`, a disabled input element is unusable and un-clickable. Default is `false`.
* **`options`** [`Array<optionItem> | Object:{ data: Array<optionItem, value:string, text: string }`] Array of items from which to select. Should be an array of objects with `value` and `text` properties.
Is possible to configure key-value parameters using an object that specifies these fields and data.

Typescript code:
```TypeScript
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
```

##### Parameter's configuration example

* **`editableSelect`** [`number`] Specifies the default's value of the select.
* **`editableSelectOptions`** [`Array<optionItem> | Object: { data: Array<optionItem, value:string, text: string }`] Specifies the array of items from which to select. Should be an array of objects with `value` and `text` properties.
Is possible to configure key-value parameters using an object that specifies these fields and data.

Typescript code:
```TypeScript
  editableSelect = 2;
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

  saveEditable(value) {
    //call to http server
    console.log('http.server: ' + value);

  }
```

##### Children example

Is possible to configure sublevels/children to generate the select using an array of objects called `children`.

Typescript code:
```TypeScript
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
```


![Version 0.1.0-optGroup](https://github.com/caballerog/ng2-inline-editor/raw/master/demos/basic/0.1.0-optGroup.gif)

#### Empty components



```HTML
  <inline-editor
  type="text"
  ngModel
  empty="My custom message"
  (onSave)="saveEditable($event)"
  name="editableText1"
  size="8"
  min="3"
  max="5"
  [fnErrorLength]="fnErrorLength"></inline-editor>

  <inline-editor type="select"
                [(ngModel)]="editableSelectDoesntExist"
                (onSave)="saveEditable($event)"
                [options]="editableSelectOptionsConfiguration"></inline-editor>
```

* **`empty`** [`string`] Specifies the default message to display if there are not ngModel for the component.
If the type is `select` then the default selected element is the first element of the `options` array.



# Style/Theme

The `inline-editor` has the following CSS:

```CSS
a {
 text-decoration: none;
 color: #428bca;
 border-bottom: dashed 1px #428bca;
 cursor: pointer;
 line-height: 2;
 margin-right: 5px;
 margin-left: 5px;
}
.editable-empty,
.editable-empty:hover,
.editable-empty:focus,
a.editable-empty,
a.editable-empty:hover,
a.editable-empty:focus {
  font-style: italic;
  color: #DD1144;
  text-decoration: none;
}

.inlineEditForm{
 display: inline-block;
 white-space: nowrap;
 margin: 0;
}
#inlineEditWrapper{
 display: inline-block;
}
.inlineEditForm input, select{
 width: auto;
 display: inline;
}
.editInvalid{
 color: #a94442;
 margin-bottom: 0;
}
.error{
 border-color: #a94442;
}
[hidden] {
 display: none;
}
```


# Integration with other ng2-libraries

## angular2-data-table
Example using [angular2-data-table](https://github.com/swimlane/angular2-data-table) ([demo](demos))
![Version 0.1.0-angular2-data-table](demos/angular2-data-table/0.1.0.gif)


# Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/caballerog/ng2-inline-editor/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

# Development

1. To generate all `*.js`, `*.js.map` and `*.d.ts` files:

    `npm run tsc`

2. To lint all `*.ts` files:

    `npm run lint`

## License

The MIT License (See the [LICENSE](https://github.com/Caballerog/ng2-inline-editor/blob/master/LICENSE.MD) file for the full text) - [Carlos Caballero](caballerog.carlos@gmail.com)

