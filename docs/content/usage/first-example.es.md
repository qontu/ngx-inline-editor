---
title: Primer ejemplo
type: page
weight: 300
---

``` typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: 
  ` <h1> {{sampleText}} </h1>
    <div>
        <inline-editor 
            type="text" 
            [(ngModel)]="sampleText">
        </inline-editor>
    </div>`
})
export class AppComponent {
  sampleText = 'sample';
}

```
