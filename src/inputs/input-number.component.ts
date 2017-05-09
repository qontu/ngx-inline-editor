import { Component, ViewChild, ElementRef, Renderer, OnInit } from "@angular/core";
import { InputBase } from "./input-base";

@Component({
    selector: "inline-editor-number",
    styleUrls: ["./input.component.css"],
    template: `<input #inputRef type="number" class="form-control" [(ngModel)]="context.value" [required]="context.required"
                      [disabled]="context.disabled" [name]="context.name" [placeholder]="context.placeholder" [size]="context.size"/>`,
})
export class InputNumberComponent extends InputBase implements OnInit {

    constructor(renderer: Renderer) {
        super(renderer);
        this.isNumeric = true;
    }

    @ViewChild("inputRef") public inputRef: ElementRef;

    ngOnInit() {
        this.inputElement = this.inputRef.nativeElement;
    }

}
