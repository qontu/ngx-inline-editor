import { InlineBaseConfig, InlineConfig } from "../input-config";
import {
    Renderer, Component, ViewChild, ElementRef, OnInit,
    Injector, OnChanges, DoCheck, AfterContentInit,
    AfterViewInit, AfterViewChecked, AfterContentChecked, OnDestroy,
} from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { InlineError } from "../types/inline-error.interface";
import { InlineEditorState } from "../types/inline-editor-state.class";
import { InlineEditorService } from "../inline-editor.service";
import { OnUpdateConfig } from "../types/inline-live-cycles.interface";
import { InputRegexTestable, InputLengthTestable } from "../types/generic-inputs.interface";
@Component({
    template: " ",
})
export class InputBase implements OnInit, OnChanges, DoCheck,
    AfterContentInit, AfterContentChecked, AfterViewInit,
    AfterViewChecked, OnDestroy,
    OnUpdateConfig {

    constructor(protected injector: Injector) {
        this.renderer = injector.get(Renderer);
        this.service = injector.get(InlineEditorService);

        this.subscriptions.onUpdateConfigSubcription = this.service.events.internal.onUpdateConfig.subscribe(
            (config: InlineConfig) => this.onUpdateConfig(config),
        );

        this.subscriptions.onUpdateStateSubscription = this.service.events.internal.onUpdateState.subscribe(
            (state: InlineEditorState) => this.state = state,
        );

        this.config = this.service.getConfig()!;

        this.service.events.internal.onUpdateState.emit(new InlineEditorState({
            value: "",
            disabled: this.config.disabled,
            // editing: this.config.editing,
        }));
    }

    public state: InlineEditorState;
    public set value(value) {
        if (this.value === value) {
            return;
        }

        this.state = this.state.newState({
            ...this.state.getState(),
            value,
        });

        this.service.events.external.onChange.emit({
            state: this.state.getState(),
        });
        this.service.events.internal.onUpdateState.emit(this.state.clone());
    }

    public get value() {
        return this.state.getState().value;
    }
    @ViewChild("inputRef") public inputRef: ElementRef;

    public config: InlineBaseConfig;
    public service: InlineEditorService;
    public inputElement: HTMLInputElement;
    public isNumeric = false;
    public isRegexTestable = false;
    public isLengthTestable = false;
    protected renderer: Renderer;
    protected subscriptions: { [key: string]: Subscription } = {};


    ngOnChanges() { }

    ngOnInit() {
        this.inputElement = this.inputRef.nativeElement;
    }

    ngDoCheck() { }

    ngAfterContentInit() { }

    ngAfterContentChecked() { }

    ngAfterViewInit() { }

    ngAfterViewChecked() { }

    ngOnDestroy() {
        Object.values(this.subscriptions).forEach(subscription => subscription.unsubscribe());
    }

    onUpdateConfig(newConfig: InlineBaseConfig) {
        this.config = newConfig;
    }

    public save() {
        this.service.events.internal.onSave.emit({
            state: this.state.clone(),
        });
    }

    public cancel() {
        this.service.events.internal.onCancel.emit({
            state: this.state.clone(),
        });
    }

    public onEnter(event: Event) {
        this.service.events.internal.onEnter.emit({
            event,
            state: this.state.clone(),
        });
    }

    public onEscape(event: Event) {
        this.service.events.internal.onEscape.emit({
            event,
            state: this.state.clone(),
        });
    }

    public onBlur(event: Event) {
        this.service.events.internal.onBlur.emit({
            event,
            state: this.state.clone(),
        });
    }

    public onKeyPress(event: Event) {
        this.service.events.external.onKeyPress.emit({
            event,
            state: this.state.getState(),
        });
    }

    public onFocus(event: Event) {
        this.service.events.internal.onFocus.emit({
            event,
            state: this.state.clone(),
        });
    }

    public checkValue(): InlineError[] {
        const errs: InlineError[] = [];

        const { value } = this.state.getState();

        if (this.canTestRegex(this.config)) {
            if (!new RegExp(this.config.pattern as string).test(value)) {
                errs.push({
                    type: "PATTERN_ERROR",
                    message: "Test pattern has failed",
                });
            }
        }

        if (this.canTestLength(this.config)) {
            const { min, max } = this.config;
            const length = this.isNumeric ? Number(value) : value.length;

            if (length < min || length > max) {
                errs.push({
                    type: "LENGTH_ERROR",
                    message: "Test length has failed",
                });
            }
        }

        return errs;
    }

    public showText(): string {
        return this.state.isEmpty() ? this.config.empty : this.state.getState().value;
    }

    public focus() {
        setTimeout(() => this.renderer.invokeElementMethod(this.inputElement, "focus", []));
    }

    protected canTestRegex(config: any): config is InputRegexTestable {
        return this.isRegexTestable &&
            config.pattern != null &&
            (config.pattern instanceof RegExp || typeof config.pattern === "string");
    }

    protected canTestLength(config: any): config is InputLengthTestable {
        return (this.isNumeric || this.isLengthTestable) &&
            (config.min != null || config.max != null);
    }
}
