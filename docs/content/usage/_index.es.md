---
title: Uso
type: page
weight: 300
---

## Angular 4++

Tienes que importar `InlineEditorModule` y `FormsModule` en el módulo de tu aplicación:

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
