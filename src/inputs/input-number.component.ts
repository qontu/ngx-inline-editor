import { Component, OnInit, Injector } from "@angular/core";
import { InputBase } from "./input-base";
import { InlineNumberConfig } from "../types/inline-configs";

@Component({
    selector: "inline-editor-number",
    styleUrls: ["./input.component.css"],
    template: `<input #inputRef type="number" class="form-control" (keyup.enter)="onEnter($event)"
                (keyup.escape)="onEscape($event)" (focus)="onFocus($event)" (blur)="onBlur($event)"
                (keypress)="onKeyPress($event)" [(ngModel)]="value" [required]="config.required"
                [disabled]="state.isDisabled()" [name]="config.name" [placeholder]="config.placeholder"
                [size]="config.size"/>`,
})
export class InputNumberComponent extends InputBase implements OnInit {

    constructor(injector: Injector) {
        super(injector);
        this.isNumeric = true;
    }

    public config: InlineNumberConfig;
}
