import { InputConfig } from "../input-config";
import { Renderer } from "@angular/core";

export class InputBase {
    /*protected*/public context: InputConfig;
    /*protected*/public inputElement: HTMLInputElement;
    public isNumeric: boolean = false;
    public isRegexTestable: boolean = false;


    constructor(protected renderer: Renderer) { }

    public setContext(_context: InputConfig) {
        this.context = _context;
    }

    public getPlaceholder(): any {
        return (this.context.isEmpty) ? this.context.empty : this.context.value;
    }

    public focus(): void {
        setTimeout(() => this.renderer.invokeElementMethod(this.inputElement, 'focus', []));
    }
}
