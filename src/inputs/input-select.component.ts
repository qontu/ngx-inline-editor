import { Component, OnInit, Injector, ChangeDetectionStrategy } from "@angular/core";
import { InputBase } from "./input-base";
import { InlineSelectConfig, InlineConfig } from "../types/inline-configs";
import { SelectOptionWithChildren, SelectOption } from "../types/select-options.interface";
import { OnUpdateConfig } from "../types/lifecycles.interface";

@Component({
    selector: "inline-editor-select",
    styleUrls: ["./input.component.css"],
    template: `
    <select #inputRef class="form-control" [(ngModel)]="value"
    (focus)="onFocus($event)" (keypress)="onKeyPress($event)" (blur)="onBlur($event)" (click)="onClick($event)"
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
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSelectComponent extends InputBase implements OnInit, OnUpdateConfig {

    constructor(injector: Injector) {
        super(injector);

        this.subscriptions.onUpdateConfigSubcription.unsubscribe();
        this.subscriptions.onUpdateConfigSubcription = this.service.events.internal.onUpdateConfig.subscribe(
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

        this.config = { ...this.config };
    }

    public showText(): string {
        const { text: keyOfText, value: keyOfValue, data: options } = this.config.options;
        const currentValue = this.state.getState().value;
        const optionSelected = this.getOptionSelected(currentValue, keyOfValue, options);

        return optionSelected ? optionSelected[keyOfText] : this.config.empty;
    }

    protected getOptionSelected(
        currentValue: any,
        keyOfValue: string,
        options: (SelectOption | SelectOptionWithChildren)[],
    ): SelectOption | undefined {

        let optionSelected: SelectOption | undefined;

        for (const option of options) {
            if (this.isAnOptionWithChildren(option)) {
                optionSelected = this.getOptionSelected(currentValue, keyOfValue, option.children!);
            } else {
                const typeOfValue = typeof option[keyOfValue];

                /**
                 * If the type is a number, the equal must be soft to match, ex:
                 *      1 == "1" -> true
                 *
                 * If the type is other, the equiality can be hard, because,
                 * when the currentValue is a string that contains "[object Object]"
                 * if you test it against an object, it will be true, ex:
                 * "[object Object]" == {} -> true
                 * "[object Object]" === {} -> false
                 *
                 */
                if (typeOfValue === "string" || typeOfValue === "number") {
                    // tslint:disable-next-line:triple-equals
                    optionSelected = option[keyOfValue] == currentValue ? option : undefined;
                } else {
                    optionSelected = option[keyOfValue] === currentValue ? option : undefined;
                }
            }

            if (optionSelected) {
                break;
            }
        }

        return optionSelected;
    }

    protected isEmpty(value: any): boolean {
        const { value: keyOfValue, data: options } = this.config.options;
        return this.getOptionSelected(value, keyOfValue, options) == null;
    }

    protected isAnOptionWithChildren(options: SelectOptionWithChildren): options is SelectOptionWithChildren {
        return options.children != null && options.children instanceof Array;
    }
}
