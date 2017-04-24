import { Component, ViewChild, ElementRef, Renderer } from "@angular/core";
import { InputBase } from "./input-base";

@Component({
    selector: "inline-editor-range",
    styleUrls: ["./input.component.css"],
    template: `<input #inputRef type="range" class="form-control" [(ngModel)]="context.value" [required]="context.required"
                      [disabled]="context.disabled" [name]="context.name" [placeholder]="context.placeholder"
                      [min]="context.min" [max]="context.max"/>`,
})
export class InputRangeComponent extends InputBase {
    @ViewChild("inputRef") public inputRef: ElementRef;

    constructor(renderer: Renderer) {
        super(renderer);
        this.isNumeric = true;
    }

    ngOnInit() {
        this.inputElement = this.inputRef.nativeElement;
    }
}
