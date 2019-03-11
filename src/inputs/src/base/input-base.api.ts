import { InputBaseComponent } from './input-base.component';

export class InputBaseApi<T extends InputBaseComponent<any>> {
  constructor(public input: T) {}

  getState() {
    return this.input.getState();
  }

  setState(state: Parameters<T['setState']>[0]) {
    this.input.setState(state);
  }

  edit({ focus }: { focus: boolean }) {
    this.input.show();

    if (focus) {
      this.input.focus();
    }
  }

  toggle(options: { focus: boolean }) {
    if (this.input.isShowing()) {
      this.cancel();
    } else {
      this.edit(options);
    }
  }

  cancel() {
    if (this.input.getState().isCanceled) {
      return;
    }

    this.input.cancel();
  }

  save(value: any) {
    this.input.save(value);
  }

  saveAndClose(value: any) {
    this.input.saveAndClose(value);
  }

  isValid(): boolean {
    return this.input.isValid();
  }

  updateConfig(config: T['config']) {
    this.input.setConfig(config);
  }

  getConfig(): T['config'] {
    return this.getConfig();
  }

  disable() {
    this.input.setDisabledState(true);
  }

  enable() {
    this.input.setDisabledState(false);
  }

  markAsValid() {
    this.input.setState({ isValid: true });
  }

  markAsInvalid() {
    this.input.setState({ isValid: false });
  }
}
