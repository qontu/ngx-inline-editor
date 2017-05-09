import { Component, ViewChild, ElementRef, Renderer, OnInit } from "@angular/core";
import { InputBase } from "./input-base";
import { SelectOptionWithChildren } from "../input-config";

@Component({
    selector: "inline-editor-select",
    styleUrls: ["./input.component.css"],
    template: `
    <select #inputRef class="form-control" [(ngModel)]="context.value">
        <ng-template ngFor let-option [ngForOf]="context.options.data">
            <optgroup *ngIf="option.children" [label]="option[context.options.text]">
                <option *ngFor="let child of option.children" [value]="child[context.options.value]">
                    {{child[context.options.text]}}
                </option>
            </optgroup>
            <option *ngIf="!option.children" [value]="option[context.options.value]">{{option[context.options.text]}}</option>
        </ng-template>
    </select>
            `,
})
export class InputSelectComponent extends InputBase implements OnInit {

    constructor(renderer: Renderer) {
        super(renderer);
    }

    @ViewChild("inputRef") public inputRef: ElementRef;


    public getPlaceholder(): string {
        return this.optionSelected();
    }

    private optionSelected(): string {
        let selectedOptionText: string | undefined;
        const options = this.context.options;

        if (options && options.data) {
            for (const option of options.data) {
                selectedOptionText = this.getTextOfSelectedOption(option);
                if (selectedOptionText) {
                    break;
                }
            }

        }

        return selectedOptionText ? selectedOptionText : this.context.empty;
    }

    private getTextOfSelectedOption(options: SelectOptionWithChildren): string | undefined {
        let textOfSelectedOption: string | undefined;
        const { text, value } = this.context.options!;

        if (options.children) {
            for (const child of options.children) {
                textOfSelectedOption = this.getTextOfSelectedOption(child);
                if (textOfSelectedOption) {
                    break;
                }
            }
        } else {
            // tslint:disable-next-line:triple-equals
            if (options[value] == this.context.value) {
                textOfSelectedOption = options[text];
            }
        }

        return textOfSelectedOption;
    }

    ngOnInit() {
        this.inputElement = this.inputRef.nativeElement;
    }
}
