import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import {
  InputPasswordModule,
  InputTextModule,
  InputTextareaModule,
} from '@qontu/ngx-inline-editor/inputs';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { CustomInputComponent } from './custom-input.component';

@NgModule({
  declarations: [AppComponent, CustomInputComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    InlineEditorModule,
    InlineEditorModule.forRoot(),
    InputPasswordModule.forRoot(),
    InputTextareaModule.forRoot(),
    InputTextModule.forRoot({ empty: 'eeempttyyyyy' }),
    MatInputModule,
    MatButtonModule,
    InlineEditorModule.withInput(CustomInputComponent),
  ],
  providers: [],
  entryComponents: [CustomInputComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
