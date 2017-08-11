import { Component, Injector, ChangeDetectionStrategy } from "@angular/core";
import { InputBase } from "./input-base";
import { InlineConfig } from "../types/inline-configs";

@Component({
    selector: "inline-editor-checkbox",
    styleUrls: ["./input.component.css"],
    template: `<input #inputRef type="checkbox" class="form-control" (focus)="onFocus($event)" (blur)="onBlur($event)"
                (keypress)="onKeyPress($event)" [(ngModel)]="value" [required]="config.required"
                [disabled]="state.isDisabled()" [name]="config.name"/>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCheckboxComponent extends InputBase {

    constructor(injector: Injector) {
        super(injector);
    }

    public config: InlineConfig;

    public showText() {
        return this.value ? this.config.checkedText : this.config.uncheckedText;
    }

}
