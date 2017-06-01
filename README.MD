# Native UI Inline-editor Angular (version 4+) component ([demo](demos))


Follow me [![twitter](https://img.shields.io/twitter/follow/carlillo.svg?style=social&label=%20carlillo)](https://twitter.com/carlillo) to be notified about new releases.

ngx-inline-editor is a library of Angular (version 4+) that allows you to create editable elements.
Such technique is also known as *click-to-edit* or *edit-in-place*.
It is based on ideas of [angular-xeditable](https://github.com/vitalets/angular-xeditable) which is developed in AngularJS.


![Version 0.1.0](https://github.com/qontu/ngx-inline-editor/raw/master/demos/basic/0.1.0.gif)
## Dependencies

Basically it does not depend on any libraries except Angular4 itself.
For themes you may need to include Twitter Bootstrap CSS.

### Angular 4+ Version

Angular 4 is now stable. Therefore, if encountering errors using this
lib, ensure your version of Angular is compatible. The current version used to develop this lib is angular4 **^4.0.0**.

## Controls & Features

* [x] text
* [x] textarea
* [x] select
* [ ] checkbox
* [ ] radio
* [ ] date
* [ ] time
* [x] datetime
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
* [x] themes


## Quick start

1. A recommended way to install ***ngx-inline-editor*** is through [npm](https://www.npmjs.com/search?q=ngx-inline-editor) package manager using the following command:

  `npm i @qontu/ngx-inline-editor --save`

2. Include the basic theme or configure your own styles which are in the following path:

`dist/themes/bootstrap.css`

3. Include [Twitter Bootstrap](http://v4-alpha.getbootstrap.com/) and [FontAwesome](http://fontawesome.io/) in your project.


Usage
-----

## Angular (4+) and later

Import `InlineEditorModule` into your app's modules:

``` typescript
import {InlineEditorModule} from '@qontu/ngx-inline-editor';

@NgModule({
  imports: [
    InlineEditorModule
  ]
})
```

This makes all the `@qontu/ngx-inline-editor` components available for use in your app components.


## Simple Example

You can find a complete example [here](demos/basic)
```TypeScript
import {Component} from '@angular/core';

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
        (onError)="myHandleError"></inline-editor>
```

* **`type`** [`string`] Specifies the type `<input>` element to display.
* **`onSave`** [`event handler`] The expression specified will be invoked whenever the form is save via a click on save button.
The `$event` argument will be the value return of the input send.
* **`onError`** [`event handler`] The expression specified will be invoked whenever the form is save via a click on save button and an error is provoked (example: the value is not between min and max).
* **`name`** [`string`] Defines the name of an `<input>` element. Default is `undefined`.
* **`size`** [`number`] Defines the width, in characters, of an `<input>` element. Default is `8`.
* **`disabled`** [`boolean`] If set to `true`, a disabled input element is unusable and un-clickable. Default is `false`.
* **`min`** [`number`] the min attribute specifies the minimum value for an `<input>` element. Default is `1`.
* **`max`** [`number`] the max attribute specifies the maximum value for an `<input>` element. Default is `Infinity`.


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
        (onError)="myHandleError"></inline-editor>
```

* **`type`** [`string`] Specifies the type `<input>` element to display.
* **`onSave`** [`event handler`] The expression specified will be invoked whenever the form is save via a click on save button.
The `$event` argument will be the value return of the input send.
* **`onError`** [`event handler`] The expression specified will be invoked whenever the form is save via a click on save button and an error is provoked (example: the value is not between min and max).
* **`name`** [`string`] Defines the name of an `<input>` element. Default is `undefined`.
* **`size`** [`number`] Defines the width, in characters, of an `<input>` element. Default is `8`.
* **`disabled`** [`boolean`] If set to `true`, a disabled input element is unusable and un-clickable. Default is `false`.
* **`min`** [`number`] the min attribute specifies the minimum value for an `<input>` element. Default is `1`.
* **`max`** [`number`] the max attribute specifies the maximum value for an `<input>` element. Default is `Infinity`.


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
        (onError)="myHandleError"></inline-editor>

```

* **`type`** [`string`] Specifies the type `<input>` element to display.
* **`onSave`** [`event handler`] The expression specified will be invoked whenever the form is save via a click on save button.
The `$event` argument will be the value return of the input send.
* **`onError`** [`event handler`] The expression specified will be invoked whenever the form is save via a click on save button and an error is provoked (example: the value is not between min and max).
* **`name`** [`string`] Defines the name of an `<input>` element. Default is `undefined`.
* **`size`** [`number`] Defines the width, in characters, of an `<input>` element. Default is `8`.
* **`disabled`** [`boolean`] If set to `true`, a disabled input element is unusable and un-clickable. Default is `false`.
* **`cols`** [`number`] Specifies the visible width of a text area. Default is `50`.
* **`rows`** [`number`] Specifies the visible height of a text area. Default is `4`.
* **`min`** [`number`] the min attribute specifies the minimum value for an `<input>` element. Default is `1`.
* **`max`** [`number`] the max attribute specifies the maximum value for an `<input>` element. Default is `Infinity`.


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


![Version 0.1.0-optGroup](https://github.com/qontu/ngx-inline-editor/raw/master/demos/basic/0.1.0-optGroup.gif)

#### Empty components



```HTML
  <inline-editor
  type="text"
  ngModel
  empty="My custom message"
  (onSave)="saveEditable($event)"
  (onError)="handleError"
  name="editableText1"
  size="8"
  min="3"
  max="5"></inline-editor>

  <inline-editor type="select"
                [(ngModel)]="editableSelectDoesntExist"
                (onSave)="saveEditable($event)"
                [options]="editableSelectOptionsConfiguration"></inline-editor>
```

* **`empty`** [`string`] Specifies the default message to display if there are not ngModel for the component.
If the type is `select` then the default selected element is the first element of the `options` array.



# Style/Theme

The `inline-editor` has the following basic theme which you can find in `dist/themes/bootstrap.css`:

```CSS
a.c-inline-editor {
  text-decoration: none;
  color: #428bca;
  border-bottom: dashed 1px #428bca;
  cursor: pointer;
  line-height: 2;
  margin-right: 5px;
  margin-left: 5px;
}
.c-inline-editor.editable-empty,
.c-inline-editor.editable-empty:hover,
.c-inline-editor.editable-empty:focus,
.c-inline-editor.a.editable-empty,
.c-inline-editor.a.editable-empty:hover,
.c-inline-editor.a.editable-empty:focus {
  font-style: italic;
  color: #DD1144;
  text-decoration: none;
}

.c-inline-editor.inlineEditForm {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
}

#inlineEditWrapper {
  display: inline-block;
}

.c-inline-editor.inlineEditForm input,
.c-inline-editor.select {
  width: auto;
  display: inline;
}

.c-inline-editor.inline-editor-button-group {
  display: inline-block;
}

.c-inline-editor.editInvalid {
  color: #a94442;
  margin-bottom: 0;
}

.c-inline-editor.error {
  border-color: #a94442;
}

[hidden].c-inline-editor {
  display: none;
}
```


# Integration with other ngx-libraries

## ngx-data-table
Example using [angular2-data-table](https://github.com/swimlane/angular2-data-table) ([demo](demos))
![Version 0.1.0-angular2-data-table](demos/angular2-data-table/0.1.0.gif)


# Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/qontu/ngx-inline-editor/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

# Development

1. To generate all `*.js`, `*.js.map` and `*.d.ts` files:

    `npm run build`

2. To debug :

    `npm run build:watch`

## Authors
Carlos Caballero - [https://github.com/caballerog](hhttps://github.com/caballerog)

Antonio Villena - [https://github.com/xxxtonixxx](https://github.com/xxxtonixxx)
## License

The MIT License (See the [LICENSE](https://github.com/qontu/ngx-inline-editor/blob/master/LICENSE.MD) file for the full text) - 

