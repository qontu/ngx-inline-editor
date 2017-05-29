import { Component, OnInit, Injector } from "@angular/core";
import { InputBase } from "./input-base";
import { InlineTextareaConfig } from "../types/inline-configs";

@Component({
    selector: "inline-editor-textarea",
    styleUrls: ["./input.component.css"],
    template: `<textarea #inputRef class="form-control" (keyup.enter)="onEnter($event)"
                (keyup.escape)="onEscape($event)" (focus)="onFocus($event)" (blur)="onBlur($event)"
                (keypress)="onKeyPress($event)" [(ngModel)]="value" [required]="config.required"
                [rows]="config.rows" [cols]="config.cols" [disabled]="state.isDisabled()" [name]="config.name"
                [placeholder]="config.placeholder"></textarea>`,
})
export class InputTextareaComponent extends InputBase implements OnInit {

    constructor(injector: Injector) {
        super(injector);
        this.isRegexTestable = true;
        this.isLengthTestable = true;
    }

    public config: InlineTextareaConfig;
}
