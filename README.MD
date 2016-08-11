# Native UI Inline-editor Angular2 component ([demo](https://github.com/Caballerog/ng2-inline-editor/tree/master/demos))


Follow me [![twitter](https://img.shields.io/twitter/follow/carlillo.svg?style=social&label=%20carlillo)](https://twitter.com/carlillo) to be notified about new releases.

ng2-inline-editor is a library of Angular2 that allows you to create editable elements.
Such technique is also known as *click-to-edit* or *edit-in-place*.
It is based on ideas of [angular-xeditable](https://github.com/vitalets/angular-xeditable) which is developed in AngularJS and the Julianna Zakula's [original post](https://medium.com/front-end-hacking/inline-editing-with-angular2-58b43cc2aba).



[[ https://github.com/Caballerog/ng2-inline-editor/blob/master/demos/basic/0.1.0.gif | height = 100px ]]

## Dependencies

Basically it does not depend on any libraries except Angular2 itself.
For themes you may need to include Twitter Bootstrap CSS.

### Angular 2 Version

Angular 2 is not yet stable, and API changes are ongoing. Therefore, if encountering errors using this
lib, ensure your version of Angular is compatible. The current version used to develop this lib is angular2 **2.0.0-rc.5 +**.
If you need to support a previous version of Angular 2 for now, please see the changelog for advice on which version to use.


## Controls & Features

- text
- textarea
- select
- checkbox (In progress)
- radio (In progress)
- date (In progress)
- time (In progress)
- datetime (In progress)
- html5 inputs (In progress)
- typeahead (In progress)
- ui-select (In progress)
- complex form (In progress)
- editable row (In progress)
- editable column (In progress)
- editable table (In progress)
- themes (In progress)


## Quick start

1. A recommended way to install ***ng2-inline-editor*** is through [npm](https://www.npmjs.com/search?q=ng2-inline-editor) package manager using the following command:

  `npm i ng2-inline-editor --save`

2. Include [Twitter Bootstrap](http://v4-alpha.getbootstrap.com/) and [FontAwesome](http://fontawesome.io/) in your project

### Configuration using systemJS (angular-cli)

1. Edit your system-config.ts

```TypeScript 
/** Map relative paths to URLs. */
const map: any = {
  'ng2-inline-editor':'vendor/ng2-inline-editor/dist'
};

/** User packages configuration. */
const packages: any = {
  'vendor/ng2-inline-editor/dist': {
      defaultExtension: 'js',
      main: 'index.js'
  }
};
....

const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',
  'ng2-inline-editor',
];

``` 

2. Add `ng2-inline-editor/dist/**/*.js` in the `angular-cli-build.js` file.

```
var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/**/*.+(js|js.map)',
      'es6-shim/es6-shim.js',
      'reflect-metadata/**/*.+(ts|js|js.map)',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      
      'ng2-inline-editor/dist/**/*.js'
    ]
  });
};
```

## Simple Example

You can find a complete example [here](https://github.com/Caballerog/ng2-inline-editor/tree/master/demos/basic)
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
  </div>`,
    directives: [InlineEditorDirectives]
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
        disabled="true"></inline-editor>
```

* **`type`** [`string`] Specifies the type `<input>` element to display.
* **`onSave`** [`event handler`] The expression specified will be invoked whenever the form is save via a click on save button. 
The `$event` argument will be the value return of the input send. 
* **`name`** [`string`] Defines the name of an <input> element. Default is `undefined`.
* **`size`** [`number`] Defines the width, in characters, of an `<input>` element. Default is `8`.
* **`disabled`** [`boolean`] If set to `true`, a disabled input element is unusable and un-clickable. Default is `false`.


##### Password 

```HTML
 <inline-editor 
        type="password" 
        [(ngModel)]="editablePassword" 
        (onSave)="saveEditable($event)" 
        name="editablePassword" 
        size="8"
        disabled="true"></inline-editor>
```

* **`type`** [`string`] Specifies the type `<input>` element to display.
* **`onSave`** [`event handler`] The expression specified will be invoked whenever the form is save via a click on save button. 
The `$event` argument will be the value return of the input send. 
* **`name`** [`string`] Defines the name of an <input> element. Default is `undefined`.
* **`size`** [`number`] Defines the width, in characters, of an `<input>` element. Default is `8`.
* **`disabled`** [`boolean`] If set to `true`, a disabled input element is unusable and un-clickable. Default is `false`.


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
        rows="4"></inline-editor>
```

* **`type`** [`string`] Specifies the type `<input>` element to display.
* **`onSave`** [`event handler`] The expression specified will be invoked whenever the form is save via a click on save button. 
The `$event` argument will be the value return of the input send. 
* **`name`** [`string`] Defines the name of an <input> element. Default is `undefined`.
* **`size`** [`number`] Defines the width, in characters, of an `<input>` element. Default is `8`.
* **`disabled`** [`boolean`] If set to `true`, a disabled input element is unusable and un-clickable. Default is `false`.
* **`cols`** [`number`] Specifies the visible width of a text area. Default is `50`.
* **`rows`** [`number`] Specifies the visible height of a text area. Default is `4`.


##### Select

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
* **`name`** [`string`] Defines the name of an <input> element. Default is `undefined`.
* **`disabled`** [`boolean`] If set to `true`, a disabled input element is unusable and un-clickable. Default is `false`.
* **`options`** [`Array<optionItem>`] Array of items from which to select. Should be an array of objects with `value` and `text` properties.


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
* **`editableSelect`** [`number`] Specifies the default's value of the select.
* **`editableSelectOptions`** [`Array<optionItem>`] Specifies the array of items from which to select. Should be an array of objects with `value` and `text` properties.


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

