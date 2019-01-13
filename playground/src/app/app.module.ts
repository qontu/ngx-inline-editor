import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import {
  InputPasswordModule,
  InputTextModule,
} from '@qontu/ngx-inline-editor/inputs';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    InlineEditorModule,
    InlineEditorModule.forRoot(),
    InputPasswordModule.forRoot(),
    InputTextModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
