import { Component, OnInit, Injector, ChangeDetectionStrategy } from "@angular/core";
import { InputBase } from "./input-base";
import { InlineTextConfig } from "../types/inline-configs";

@Component({
    selector: "inline-editor-password",
    styleUrls: ["./input.component.css"],
    template: `<input #inputRef type="password" class="form-control" (keyup.enter)="onEnter($event)"
                (keyup.escape)="onEscape($event)" (focus)="onFocus($event)" (blur)="onBlur($event)" (click)="onClick($event)"
                (keypress)="onKeyPress($event)" [(ngModel)]="value" [required]="config.required"
                [disabled]="state.isDisabled()" [name]="config.name" [placeholder]="config.placeholder"
                [size]="config.size"/>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordComponent extends InputBase implements OnInit {

    constructor(injector: Injector) {
        super(injector);
        this.isRegexTestable = true;
        this.isLengthTestable = true;
    }

    public config: InlineTextConfig;

    public showText(): string {
        const isEmpty = this.state.isEmpty();
        const value = String(this.state.getState().value);
        return isEmpty ?
            this.config.empty :
            "*".repeat(value.length);
    }

}
