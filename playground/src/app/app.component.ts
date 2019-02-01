import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'playground';
  reactiveTest = new FormControl({ value: 'hi!', disabled: true }, [
    Validators.email,
  ]);

  toggle() {
    this.reactiveTest.disabled
      ? this.reactiveTest.enable()
      : this.reactiveTest.disable();
  }
}
