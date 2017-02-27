import { Component, ViewChild, ElementRef, Renderer, OnInit } from "@angular/core";
import { InputBase } from "./input-base";
import { SelectOptions } from "../input-config";

@Component({
    selector: 'inline-editor-select',
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
    template: `<select #inputRef class="form-control" [(ngModel)]="context.value">
                <template ngFor let-item [ngForOf]="context.options.data">
                    <optgroup *ngIf="item.children" [label]="item[context.options.text]">
                        <option *ngFor="let child of item.children" [value]="child[context.options.value]">
                            {{child[context.options.text]}}
                        </option>
                    </optgroup>
                    <option *ngIf="!item.children" [value]="item[context.options.value]">{{item[context.options.text]}}</option>
                </template>
                </select>`
})
export class InputSelectComponent extends InputBase implements OnInit {
    @ViewChild('inputRef') public inputRef: ElementRef;

    constructor(renderer: Renderer) {
        super(renderer);
    }

    public getPlaceholder(): any {
        return this.optionSelected();
    }

    private optionSelected(): any {
        const options = this.context.options;
        const {text, value} = options;

        let optionSelectedText = this.getElementText(options);
        if (optionSelectedText === null) {
            const childrens = Object.keys(options.data).reduce((childrens, objectKey) => {
                if (options.data[objectKey].hasOwnProperty('children')) {
                    childrens.push(options.data[objectKey].children);
                }

                return childrens;
            }, []);
            let i = 0;
            while (i < childrens.length && optionSelectedText === null) {
                optionSelectedText = this.getElementText({ data: childrens[i], text, value });
                i++;
            }
        }

        return (optionSelectedText !== null ? optionSelectedText : this.context.empty);
    }

    private getElementText(options: SelectOptions): string | null {
        const {value, text} = options;

        const dataLength = options.data.length;
        let i = 0;
        while (i < dataLength) {
            const element = options['data'][i];

            if (element[value] == this.context.value) {
                return element[text];
            }

            i++;
        }

        return null;
    }

    ngOnInit() {
        this.inputElement = this.inputRef.nativeElement;
    }
}
