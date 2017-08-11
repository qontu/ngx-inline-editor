import { Component, OnInit, Injector, ChangeDetectionStrategy } from "@angular/core";
import { InputBase } from "./input-base";
import { InlineConfig } from "../types/inline-configs";

@Component({
    selector: "inline-editor-date",
    styleUrls: ["./input.component.css"],
    template: `<input #inputRef type="date" class="form-control" (keyup.enter)="onEnter($event)"
                (keyup.escape)="onEscape($event)" (focus)="onFocus($event)" (blur)="onBlur($event)" (blur)="onBlur($event)"
                (keypress)="onKeyPress($event)" [(ngModel)]="value" [required]="config.required"
                [disabled]="state.isDisabled()" [name]="config.name" [placeholder]="config.placeholder"
                [size]="config.size" [min]="config.min" [max]="config.max"/>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDateComponent extends InputBase implements OnInit {

    constructor(injector: Injector) {
        super(injector);
        this.isRegexTestable = true;
    }

    public config: InlineConfig;

}
