import { Component, ViewChild, ElementRef, Renderer, OnInit } from "@angular/core";
import { InputBase } from "./input-base";
import { SelectOptionWithChildren } from "../input-config";

@Component({
    selector: "inline-editor-select",
    styles: [`a {
    text-decoration: none;
    color: #428bca;
    border-bottom: dashed 1px #428bca;
    cursor: pointer;
    line-height: 2;
    margin-right: 5px;
    margin-left: 5px;
}


/* editable-empty */

.editable-empty,
.editable-empty:hover,
.editable-empty:focus,
a.editable-empty,
a.editable-empty:hover,
a.editable-empty:focus {
    font-style: italic;
    color: #DD1144;
    text-decoration: none;
}

.inlineEditForm {
    display: inline-block;
    white-space: nowrap;
    margin: 0;
}

#inlineEditWrapper {
    display: inline-block;
}

.inlineEditForm input,
select {
    width: auto;
    display: inline;
}

.editInvalid {
    color: #a94442;
    margin-bottom: 0;
}

.error {
    border-color: #a94442;
}

[hidden] {
    display: none;
}`],
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
    @ViewChild("inputRef") public inputRef: ElementRef;

    constructor(renderer: Renderer) {
        super(renderer);
    }

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
            if (options[value] === this.context.value) {
                textOfSelectedOption = options[text];
            }
        }

        return textOfSelectedOption;
    }

    ngOnInit() {
        this.inputElement = this.inputRef.nativeElement;
    }
}
