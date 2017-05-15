import { Component, OnInit, Injector } from "@angular/core";
import { InputBase } from "./input-base";
import { InlineTextConfig } from "../input-config";

@Component({
    selector: "inline-editor-text",
    styleUrls: ["./input.component.css"],
    template: `<input #inputRef type="text" (keyup.enter)="onEnter($event)" (keyup.escape)="onEscape($event)"
                (focus)="onFocus($event)" (blur)="onBlur($event)" (keypress)="onKeyPress($event)"
                class="form-control" [(ngModel)]="value" [required]="config.required"
                [disabled]="state.isDisabled()" [name]="config.name" [placeholder]="config.placeholder"
                [size]="config.size"/>`,
})
export class InputTextComponent extends InputBase implements OnInit {

    constructor(injector: Injector) {
        super(injector);
        this.isRegexTestable = true;
        this.isLengthTestable = true;
    }

    public config: InlineTextConfig;
}
