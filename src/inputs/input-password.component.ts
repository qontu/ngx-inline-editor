import { Component, ViewChild, ElementRef, Renderer } from "@angular/core";
import { InputBase } from "./input-base";

@Component({
    selector: 'inline-editor-password',
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
    template: `<input #inputRef type="password" class="form-control" [(ngModel)]="context.value" [required]="context.required"
                      [disabled]="context.disabled" [name]="context.name" [placeholder]="context.placeholder" [size]="context.size"/>`
})
export class InputPasswordComponent extends InputBase {
    @ViewChild('inputRef') public inputRef: ElementRef;

    constructor(renderer: Renderer) {
        super(renderer);
        this.isRegexTestable = true;
    }

    ngOnInit() {
        this.inputElement = this.inputRef.nativeElement;
    }

    public getPlaceholder(): string {
        return "*****";
    }
}
