import { Component, ViewChild, ElementRef, OnInit, Renderer } from "@angular/core";
import { InputBase } from "./input-base";

@Component({
    selector: "inline-editor-text",
    styleUrls: ["./input.component.css"],
    template: `<input #inputRef type="text" class="form-control" [(ngModel)]="context.value" [required]="context.required"
                      [disabled]="context.disabled" [name]="context.name" [placeholder]="context.placeholder" [size]="context.size"/>`,
})
export class InputTextComponent extends InputBase implements OnInit {
    @ViewChild("inputRef") public inputRef: ElementRef;

    constructor(renderer: Renderer) {
        super(renderer);
        this.isRegexTestable = true;
    }

    ngOnInit() {
        this.inputElement = this.inputRef.nativeElement;
    }
}
