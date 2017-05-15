import { Component, OnInit, Injector } from "@angular/core";
import { InputBase } from "./input-base";
import { InlineConfig } from "../input-config";

@Component({
    selector: "inline-editor-time",
    styleUrls: ["./input.component.css"],
    template: `<input #inputRef type="time" class="form-control" (keyup.enter)="onEnter($event)"
                (keyup.escape)="onEscape($event)" (focus)="onFocus($event)" (blur)="onBlur($event)"
                (keypress)="onKeyPress($event)" [(ngModel)]="value" [required]="config.required"
                [disabled]="config.disabled" [name]="config.name" [placeholder]="config.placeholder"
                [size]="config.size" [min]="config.min" [max]="config.max"/>`,
})
export class InputTimeComponent extends InputBase implements OnInit {

    constructor(injector: Injector) {
        super(injector);
        this.isRegexTestable = true;
    }

    public config: InlineConfig;
}
