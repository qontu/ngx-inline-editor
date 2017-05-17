import {
    Component, forwardRef, Input, OnInit, Output,
    EventEmitter, ViewChild,
    ComponentRef, ComponentFactoryResolver, ViewContainerRef, ReflectiveInjector, OnDestroy, AfterContentInit,
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

import { InlineEditorService } from "./inline-editor.service";
import { InlineConfig, InlineGlobalConfig } from "./input-config";
import { InputNumberComponent } from "./inputs/input-number.component";
import { InputBase } from "./inputs/input-base";
import { InputTextComponent } from "./inputs/input-text.component";
import { InputPasswordComponent } from "./inputs/input-password.component";
import { InputRangeComponent } from "./inputs/input-range.component";
import { InputTextareaComponent } from "./inputs/input-textarea.component";
import { InputSelectComponent } from "./inputs/input-select.component";
import { InputDateComponent } from "./inputs/input-date.component";
import { InputTimeComponent } from "./inputs/input-time.component";
import { InputDatetimeComponent } from "./inputs/input-datetime.component";
import { Subscription } from "rxjs/Subscription";
import { SelectOptions } from "./types/select-options.interface";
import { InlineError } from "./types/inline-error.interface";
import { ExternalEvent, InternalEvent, Events, InternalEvents, ExternalEvents } from "./types/inline-editor-events.class";
import { InlineEditorState, InlineEditorStateOptions } from "./types/inline-editor-state.class";
import { EditOptions } from "./types/edit-options.interface";
import { InputType } from "./types/input-type.type";
export const InputComponets = [
    InputTextComponent,
    InputNumberComponent,
    InputPasswordComponent,
    InputRangeComponent,
    InputTextareaComponent,
    InputSelectComponent,
    InputDateComponent,
    InputTimeComponent,
    InputDatetimeComponent,
];

const defaultConfig: InlineConfig = {
    name: "",
    required: false,
    options: {
        data: [],
        text: "text",
        value: "value",
    },
    empty: "empty",
    placeholder: "placeholder",
    type: "text",
    size: 8,
    min: 0,
    max: Infinity,
    cols: 10,
    rows: 4,
    pattern: "",
    disabled: false,
    saveOnBlur: false,
    saveOnEnter: true,
    editOnClick: true,
    cancelOnEscape: true,
    hideButtons: false,
};

@Component({
    selector: "inline-editor",
    templateUrl: "./inline-editor.component.html",
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InlineEditorComponent),
        multi: true,
    }],
    entryComponents: InputComponets,
})
export class InlineEditorComponent implements OnInit, AfterContentInit, OnDestroy, ControlValueAccessor {

    constructor(protected componentFactoryResolver: ComponentFactoryResolver) { }

    public service: InlineEditorService;
    public state: InlineEditorState;
    public currentComponent: ComponentRef<InputBase>;

    public events: Events = {
        internal: new InternalEvents(),
        external: new ExternalEvents(),
    };

    @Input() public type?: InputType;
    @Input() public config: InlineConfig;
    @Output() public onChange: EventEmitter<ExternalEvent> = this.events.external.onChange;
    @Output() public onSave: EventEmitter<ExternalEvent> = this.events.external.onSave;
    @Output() public onEdit: EventEmitter<ExternalEvent> = this.events.external.onEdit;
    @Output() public onCancel: EventEmitter<ExternalEvent> = this.events.external.onCancel;
    @Output() public onError: EventEmitter<InlineError | InlineError[]> = this.events.external.onError;
    @Output() public onEnter: EventEmitter<ExternalEvent> = this.events.external.onEnter;
    @Output() public onEscape: EventEmitter<ExternalEvent> = this.events.external.onEscape;
    @Output() public onKeyPress: EventEmitter<ExternalEvent> = this.events.external.onKeyPress;
    @Output() public onFocus: EventEmitter<ExternalEvent> = this.events.external.onFocus;
    @Output() public onBlur: EventEmitter<ExternalEvent> = this.events.external.onBlur;


    // input's attribute
    private _empty?: string;
    @Input() public set empty(empty: string | undefined) {
        this._empty = empty;
        this.updateConfig(undefined, "empty", empty);
    }

    public get empty(): string | undefined {
        return this._empty;
    }

    private _saveOnEnter?: boolean;
    @Input() public set saveOnEnter(saveOnEnter: boolean | undefined) {
        this._saveOnEnter = saveOnEnter;
        this.updateConfig(undefined, "saveOnEnter", saveOnEnter);
    }

    public get saveOnEnter(): boolean | undefined {
        return this._saveOnEnter;
    }

    private _saveOnBlur?: boolean;
    @Input() public set saveOnBlur(saveOnBlur: boolean | undefined) {
        this._saveOnBlur = saveOnBlur;
        this.updateConfig(undefined, "saveOnBlur", saveOnBlur);
    }

    public get saveOnBlur(): boolean | undefined {
        return this._saveOnBlur;
    }

    private _editOnClick?: boolean;
    @Input() public set editOnClick(editOnClick: boolean | undefined) {
        this._editOnClick = editOnClick;
        this.updateConfig(undefined, "editOnClick", editOnClick);
    }

    public get editOnClick(): boolean | undefined {
        return this._editOnClick;
    }

    private _cancelOnEscape?: boolean;
    @Input() public set cancelOnEscape(cancelOnEscape: boolean | undefined) {
        this._cancelOnEscape = cancelOnEscape;
        this.updateConfig(undefined, "cancelOnEscape", cancelOnEscape);
    }

    public get cancelOnEscape(): boolean | undefined {
        return this._cancelOnEscape;
    }

    private _hideButtons?: boolean;
    @Input() public set hideButtons(hideButtons: boolean | undefined) {
        this._hideButtons = hideButtons;
        this.updateConfig(undefined, "hideButtons", hideButtons);
    }

    public get hideButtons(): boolean | undefined {
        return this._hideButtons;
    }

    private _disabled?: boolean;
    @Input() public set disabled(disabled: boolean | undefined) {
        this._disabled = disabled;
        this.updateConfig(undefined, "disabled", disabled);
    }

    public get disabled(): boolean | undefined {
        return this._disabled;
    }

    private _required?: boolean;
    @Input() public set required(required: boolean | undefined) {
        this._required = required;
        this.updateConfig(undefined, "required", required);
    }

    public get required(): boolean | undefined {
        return this._required;
    }

    private _placeholder?: string;
    @Input() public set placeholder(placeholder: string | undefined) {
        this._placeholder = placeholder;
        this.updateConfig(undefined, "placeholder", placeholder);
    }

    public get placeholder(): string | undefined {
        return this._placeholder;
    }

    private _name?: string;
    @Input() public set name(name: string | undefined) {
        this._name = name;
        this.updateConfig(undefined, "name", name);
    }

    public get name(): string | undefined {
        return this._name;
    }

    private _pattern?: string;
    @Input() public set pattern(pattern: string | undefined) {
        this._pattern = pattern;
        this.updateConfig(undefined, "pattern", pattern);
    }

    public get pattern(): string | undefined {
        return this._pattern;
    }

    private _size?: number;
    @Input() public set size(size: number | undefined) {
        this._size = size;
        this.updateConfig(undefined, "size", size);
    }

    public get size(): number | undefined {
        return this._size;
    }

    private _min?: number;
    @Input() public set min(min: number | undefined) {
        this._min = min;
        this.updateConfig(undefined, "min", min);
    }

    public get min(): number | undefined {
        return this._min;
    }

    private _max?: number;
    @Input() public set max(max: number | undefined) {
        this._max = max;
        this.updateConfig(undefined, "max", max);
    }

    public get max(): number | undefined {
        return this._max;
    }

    private _cols?: number;
    @Input() public set cols(cols: number | undefined) {
        this._cols = cols;
        this.updateConfig(undefined, "cols", cols);
    }

    public get cols(): number | undefined {
        return this._cols;
    }

    private _rows?: number;
    @Input() public set rows(rows: number | undefined) {
        this._rows = rows;
        this.updateConfig(undefined, "rows", rows);
    }

    public get rows(): number | undefined {
        return this._rows;
    }

    private _options?: SelectOptions;
    @Input() public set options(options: SelectOptions | undefined) {
        this._options = options;
        this.updateConfig(undefined, "options", options);
    }

    public get options(): SelectOptions | undefined {
        return this._options;
    }

    private subscriptions: { [key: string]: Subscription } = {};

    private componentRef: ComponentRef<InputBase>;

    @ViewChild("container", { read: ViewContainerRef }) private container: ViewContainerRef;

    private inputInstance: InputBase;

    // Inputs implemented
    private components: { [key: string]: any } = {
        text: InputTextComponent,
        number: InputNumberComponent,
        password: InputPasswordComponent,
        range: InputRangeComponent,
        textarea: InputTextareaComponent,
        select: InputSelectComponent,
        date: InputDateComponent,
        time: InputTimeComponent,
        datetime: InputDatetimeComponent,
    };

    private refreshNGModel: (_: any) => void;

    ngOnInit() {
        this.config = this.generateConfig(this.config || this.createSafeConfig());

        this.state = new InlineEditorState({
            value: "",
        });

        this.service = new InlineEditorService(this.events, { ...this.config });


        this.subscriptions.onSaveSubscription = this.events.internal.onSave.subscribe(
            ({ event, state }: InternalEvent) => this.save({
                event,
                state: state.getState(),
            }),
        );

        this.subscriptions.onCancelSubscription = this.events.internal.onCancel.subscribe(
            ({ event, state }: InternalEvent) => this.cancel({
                event,
                state: state.getState(),
            }),
        );

        this.subscriptions.onBlurSubscription = this.events.internal.onBlur.subscribe(
            ({ event, state }: InternalEvent) => {
                if (this.config.saveOnBlur) {
                    this.save({
                        event,
                        state: state.getState(),
                    });
                }

                this.onBlur.emit({
                    event,
                    state: state.getState(),
                });
            },
        );

        this.subscriptions.onEnterSubscription = this.events.internal.onEnter.subscribe(
            ({ event, state }: InternalEvent) => {
                if (this.config.saveOnEnter) {
                    this.save({
                        event,
                        state: state.getState(),
                    });

                    this.edit({ editing: false });
                }

                this.onEnter.emit({
                    event,
                    state: state.getState(),
                });
            },
        );

        this.subscriptions.onEscapeSubscription = this.events.internal.onEscape.subscribe(
            ({ event, state }: InternalEvent) => {
                if (this.config.cancelOnEscape) {
                    this.cancel({
                        event,
                        state: state.getState(),
                    });
                }

                this.onEscape.emit({
                    event,
                    state: state.getState(),
                });
            },
        );

    }

    ngAfterContentInit() {
        this.generateComponent(this.config.type);
    }

    ngOnDestroy() {
        Object.values(this.subscriptions).forEach(subscription => subscription.unsubscribe());
        this.currentComponent.destroy();
    }

    writeValue(value: any) {
        this.state = this.state.newState({
            ...this.state.getState(),
            value,
        });

        this.events.internal.onUpdateState.emit(this.state.clone());
    }

    registerOnChange(refreshNGModel: (_: any) => void) {
        this.refreshNGModel = refreshNGModel;
    }
    registerOnTouched() {
    }

    public generateConfig(config: InlineGlobalConfig): InlineConfig {
        return { ...defaultConfig, ...config };
    }

    // Method to display the inline editor form and hide the <a> element
    public edit({ editing = true, doFocus = true, event }: EditOptions = {}) {
        this.state = this.state.newState({
            ...this.state.getState(),
            editing,
        });

        this.events.internal.onUpdateState.emit(this.state.clone());

        if (editing) {
            this.onEdit.emit({
                event,
                state: this.state.getState(),
            });
        }

        if (editing && doFocus) {
            this.inputInstance.focus();
        }
    }

    public save({ event, state: hotState }: ExternalEvent) {
        const prevState = this.state.getState();

        const state = {
            ...prevState,
            ...hotState,
        };

        const errs = this.inputInstance.checkValue();
        if (errs.length !== 0) {
            this.onError.emit(errs);
        } else {
            this.state = this.state.newState(state);

            this.refreshNGModel(state.value);

            this.onSave.emit({
                event,
                state,
            });
        }
    }

    public saveAndClose(outsideEvent: ExternalEvent) {
        this.save(outsideEvent);

        this.edit({ editing: false });
    }

    // Method to reset the editable value
    public cancel(outsideEvent: ExternalEvent) {
        this.edit({ editing: false });
        this.onCancel.emit(outsideEvent);
    }

    public getHotState(): InlineEditorStateOptions {
        return this.inputInstance.state.getState();
    }

    public showText(): string {
        return this.inputInstance ? this.inputInstance.showText() : "Loading...";
    }

    private getComponentType(typeName: InputType): string | never {
        const type = this.components[typeName];

        if (!type) {
            throw new Error("That type does not exist or it is not implemented yet!");
        }

        return type;
    }

    private generateComponent(type: InputType) {
        const componentType = this.getComponentType(type);
        this.inputInstance = this.createInputInstance(componentType);
        this.events.internal.onUpdateConfig.emit(this.config);
    }

    private createInputInstance(componentType): InputBase {
        const providers = ReflectiveInjector.resolve([{
            provide: InlineEditorService,
            useValue: this.service,
        }]);
        const injector = ReflectiveInjector.fromResolvedProviders(providers, this.container.parentInjector);

        const factory = this.componentFactoryResolver.resolveComponentFactory<InputBase>(componentType);

        this.componentRef = factory.create(injector);
        this.container.insert(this.componentRef.hostView);

        if (this.currentComponent) {
            this.currentComponent.destroy();
        }

        this.currentComponent = this.componentRef;

        return <InputBase>this.componentRef.instance;
    }

    private createSafeConfig(): InlineConfig {
        const config = this.config || {} as InlineConfig;
        return {
            type: this.type || config.type || defaultConfig.type,
            name: this.name || config.name || defaultConfig.name,
            size: this.size || config.size || defaultConfig.size,
            placeholder: this.placeholder || config.placeholder || defaultConfig.placeholder,
            empty: this.empty || config.empty || defaultConfig.empty,
            required: typeof this.required === "boolean" ? this.required : config.required || defaultConfig.required,
            disabled: typeof this.disabled === "boolean" ? this.disabled : config.disabled || defaultConfig.disabled,
            hideButtons: typeof this.hideButtons === "boolean" ?
                this.hideButtons :
                config.hideButtons || defaultConfig.hideButtons,

            min: this.min || config.min || defaultConfig.min,
            max: this.max || config.max || defaultConfig.max,
            cols: this.cols || config.cols || defaultConfig.cols,
            rows: this.rows || config.rows || defaultConfig.rows,
            options: this.options || config.options || defaultConfig.options,
            pattern: this.pattern || config.pattern || defaultConfig.pattern,
            saveOnEnter: typeof this.saveOnEnter === "boolean" ?
                this.saveOnEnter :
                config.saveOnEnter || defaultConfig.saveOnEnter,

            saveOnBlur: typeof this.saveOnBlur === "boolean" ?
                this.saveOnBlur :
                config.saveOnBlur || defaultConfig.saveOnBlur,

            editOnClick: typeof this.editOnClick === "boolean" ?
                this.editOnClick :
                config.editOnClick || defaultConfig.editOnClick,

            cancelOnEscape: typeof this.cancelOnEscape === "boolean" ?
                this.cancelOnEscape :
                config.cancelOnEscape || defaultConfig.cancelOnEscape,
        };
    }

    private updateConfig(config?: InlineConfig, property?: string, value?: any) {
        if (this.config) {
            config = config || this.config;

            if (property) {
                config[property] = value;
            }

            this.events.internal.onUpdateConfig.emit({ ...config });
        }
    }

}
