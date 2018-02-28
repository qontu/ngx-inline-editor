---
title: Usage
type: page
weight: 300
---

## Angular 4++

Import `InlineEditorModule` and `FormsModule` into your app's module:

``` typescript
// Angular imports
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InlineEditorModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```