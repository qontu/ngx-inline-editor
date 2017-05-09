import { Component, ViewChild, ElementRef, Renderer, OnInit } from "@angular/core";
import { InputBase } from "./input-base";

@Component({
    selector: "inline-editor-password",
    styleUrls: ["./input.component.css"],
    template: `<input #inputRef type="password" class="form-control" [(ngModel)]="context.value" [required]="context.required"
                      [disabled]="context.disabled" [name]="context.name" [placeholder]="context.placeholder" [size]="context.size"/>`,
})
export class InputPasswordComponent extends InputBase implements OnInit {

    constructor(renderer: Renderer) {
        super(renderer);
        this.isRegexTestable = true;
    }

    @ViewChild("inputRef") public inputRef: ElementRef;


    ngOnInit() {
        this.inputElement = this.inputRef.nativeElement;
    }

    public getPlaceholder(): string {
        return "*****";
    }
}
