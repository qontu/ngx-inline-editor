---
title: First example
type: page
weight: 300
---

{{<plunker link="https://embed.plnkr.co/kdRK578bYBb35r0r4wom/">}}

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

