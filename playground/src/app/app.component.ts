import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { InlineEditorService } from '@qontu/ngx-inline-editor';
import { InputTextComponent } from 'src/inputs/src/text/input-text.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(public inlineEditorService: InlineEditorService) {
    window['inline'] = inlineEditorService;
    window['itext'] = InputTextComponent;
  }
  title = 'playground';
  reactiveTest = new FormControl({ value: 'hi!', disabled: true }, [
    Validators.email,
  ]);

  toggle() {
    // this.reactiveTest.disabled
    //   ? this.reactiveTest.enable()
    //   : this.reactiveTest.disable();
    // this.inlineEditorService.getInputsOfType()
    const [input] = this.inlineEditorService.getInputsOfType(
      InputTextComponent,
    );
    input.toggle();
  }
}
