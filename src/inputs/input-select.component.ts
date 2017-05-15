import { Component, OnInit, Injector } from "@angular/core";
import { InputBase } from "./input-base";
import { InlineSelectConfig, InlineConfig } from "../input-config";
import { SelectOptionWithChildren } from "../types/select-options.interface";
import { OnUpdateConfig } from "../types/inline-live-cycles.interface";

@Component({
    selector: "inline-editor-select",
    styleUrls: ["./input.component.css"],
    template: `
    <select #inputRef class="form-control" [(ngModel)]="value"
    (blur)="onBlur($event)" (focus)="onFocus($event)" (keypress)="onKeyPress($event)"
    (keypress.enter)="onEnter($event)" (keypress.escape)="onEscape($event)" [disabled]="state.isDisabled()">
        <ng-template ngFor let-option [ngForOf]="config.options.data">
            <optgroup *ngIf="option.children" [label]="option[config.options.text]">
                <option *ngFor="let child of option.children" [ngValue]="child[config.options.value]">
                    {{child[config.options.text]}}
                </option>
            </optgroup>
            <option *ngIf="!option.children" [ngValue]="option[config.options.value]">
                {{option[config.options.text]}}
            </option>
        </ng-template>
    </select>
            `,
})
export class InputSelectComponent extends InputBase implements OnInit, OnUpdateConfig {

    constructor(injector: Injector) {
        super(injector);

        this.onUpdateConfigSubcription.unsubscribe();
        this.onUpdateConfigSubcription = this.service.events.internal.onUpdateConfig.subscribe(
            (config: InlineConfig) => this.onUpdateConfig(config),
        );
    }

    public config: InlineSelectConfig;

    onUpdateConfig(config: InlineSelectConfig) {
        super.onUpdateConfig(config);

        const { options } = this.config;
        this.config.options = options instanceof Array ?
            {
                data: options,
                value: "value",
                text: "text",
            } : options;
    }

    public showText(): string {
        return this.optionSelected();
    }

    private optionSelected(): string {
        let selectedOptionText: string | undefined;
        const options = this.config.options;

        if (options && options.data) {
            for (const option of options.data) {
                selectedOptionText = this.getTextOfSelectedOption(option);
                if (selectedOptionText) {
                    break;
                }
            }

        }

        return selectedOptionText ? selectedOptionText : this.config.empty;
    }

    private getTextOfSelectedOption(options: SelectOptionWithChildren): string | undefined {
        let textOfSelectedOption: string | undefined;
        const { text, value } = this.config.options;

        if (options.children) {
            for (const child of options.children) {
                textOfSelectedOption = this.getTextOfSelectedOption(child);
                if (textOfSelectedOption) {
                    break;
                }
            }
        } else {
            if (options[value] == this.state.getState().value) {
                textOfSelectedOption = options[text];
            }
        }

        return textOfSelectedOption;
    }

}
