import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { InlineEditorService } from '@qontu/ngx-inline-editor';
import { InputTextComponent } from 'src/inputs/src/text/input-text.component';
import { InputPasswordComponent } from 'src/inputs/src/password/input-password.component';

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
  txt = 'playground '.repeat(3);
  reactiveTest = new FormControl({ value: 'hi!', disabled: true }, [
    Validators.email,
  ]);

  toggle() {
    this.reactiveTest.disabled
      ? this.reactiveTest.enable()
      : this.reactiveTest.disable();

    const [input] = this.inlineEditorService
      .getInputsOfType(InputPasswordComponent)
      .map(input => input.getAPI());

    input.toggle({ focus: true });
  }

  updateValue() {
    const [input] = this.inlineEditorService
      .getInputsOfType(InputPasswordComponent)
      .map(input => input.getAPI());

    // input.setState({ value: input.getState().value + ' hi' });

    input.getState().isValid ? input.markAsInvalid() : input.markAsValid();

    // input.save(input.getState().value + ' hi');
  }
}
