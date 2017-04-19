import { InputConfig } from "../input-config";
import { Renderer } from "@angular/core";

export abstract class InputBase {
    public context: InputConfig;
    public inputElement: HTMLInputElement;
    public isNumeric = false;
    public isRegexTestable = false;


    constructor(protected renderer: Renderer) { }

    public setContext(_context: InputConfig) {
        this.context = _context;
        this.whenContextIsReady();
    }

    protected whenContextIsReady() { }

    public getPlaceholder(): string {
        return this.context.isEmpty ? this.context.empty : this.context.value!;
    }

    public focus(): void {
        setTimeout(() => this.renderer.invokeElementMethod(this.inputElement, "focus", []));
    }
}
