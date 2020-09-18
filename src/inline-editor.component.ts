import {
    Component, forwardRef, Input, OnInit, Output,
    EventEmitter, ViewChild,
    ComponentRef, ComponentFactoryResolver, ViewContainerRef, ReflectiveInjector, OnDestroy, AfterContentInit, ChangeDetectionStrategy,
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, Validator } from "@angular/forms";

import { InlineEditorService } from "./inline-editor.service";
import { InlineConfig } from "./types/inline-configs";
import { InputNumberComponent } from "./inputs/input-number.component";
import { InputBase } from "./inputs/input-base";
import { InputTextComponent } from "./inputs/input-text.component";
import { InputPasswordComponent } from "./inputs/input-password.component";
import { InputRangeComponent } from "./inputs/input-range.component";
import { InputCheckboxComponent } from "./inputs/input-checkbox.component";
import { InputTextareaComponent } from "./inputs/input-textarea.component";
import { InputSelectComponent } from "./inputs/input-select.component";
import { InputDateComponent } from "./inputs/input-date.component";
import { InputTimeComponent } from "./inputs/input-time.component";
import { InputDatetimeComponent } from "./inputs/input-datetime.component";
import { Subscription } from "rxjs";
import { SelectOptions } from "./types/select-options.interface";
import { InlineEditorError } from "./types/inline-editor-error.interface";
import {
    InlineEditorEvent,
    InternalEvent,
    Events,
    InternalEvents,
    ExternalEvents,
    ExternalEvent,
} from "./types/inline-editor-events.class";
import { InlineEditorState, InlineEditorStateOptions } from "./types/inline-editor-state.class";
import { EditOptions } from "./types/edit-options.interface";
import { InputType } from "./types/input-type.type";
import { InputConfig } from "./configs";

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
    saveOnChange: false,
    saveOnEnter: true,
    editOnClick: true,
    cancelOnEscape: true,
    hideButtons: false,
    onlyValue: true,
    checkedText: "Check",
    uncheckedText: "Uncheck",
};

@Component({
    selector: "inline-editor",
    templateUrl: "./inline-editor.component.html",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InlineEditorComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => InlineEditorComponent),
            multi: true,
        },
    ],
    entryComponents: [
        InputTextComponent,
        InputNumberComponent,
        InputPasswordComponent,
        InputRangeComponent,
        InputTextareaComponent,
        InputSelectComponent,
        InputDateComponent,
        InputTimeComponent,
        InputDatetimeComponent,
        InputCheckboxComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineEditorComponent
    implements OnInit, AfterContentInit, OnDestroy, ControlValueAccessor, Validator {

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
    @Output() public onChange: EventEmitter<InlineEditorEvent | any> = this.events.external.onChange;
    @Output() public onSave: EventEmitter<InlineEditorEvent | any> = this.events.external.onSave;
    @Output() public onEdit: EventEmitter<InlineEditorEvent | any> = this.events.external.onEdit;
    @Output() public onCancel: EventEmitter<InlineEditorEvent | any> = this.events.external.onCancel;
    @Output() public onError: EventEmitter<InlineEditorError | InlineEditorError[]> = this.events.external.onError;
    @Output() public onEnter: EventEmitter<InlineEditorEvent | any> = this.events.external.onEnter;
    @Output() public onEscape: EventEmitter<InlineEditorEvent | any> = this.events.external.onEscape;
    @Output() public onKeyPress: EventEmitter<InlineEditorEvent | any> = this.events.external.onKeyPress;
    @Output() public onFocus: EventEmitter<InlineEditorEvent | any> = this.events.external.onFocus;
    @Output() public onBlur: EventEmitter<InlineEditorEvent | any> = this.events.external.onBlur;
    @Output() public onClick: EventEmitter<InlineEditorEvent | any> = this.events.external.onClick;


    // input's attribute
    private _empty?: string;
    @Input() public set empty(empty: string | undefined) {
        this._empty = empty;
        this.updateConfig(undefined, "empty", empty);
    }

    public get empty(): string | undefined {
        return this._empty;
    }

    private _checkedText?: string;
    @Input() public set checkedText(checkedText: string | undefined) {
        this._checkedText = checkedText;
        this.updateConfig(undefined, "checkedText", checkedText);
    }

    public get checkedText(): string | undefined {
        return this._checkedText;
    }

    private _uncheckedText?: string;
    @Input() public set uncheckedText(uncheckedText: string | undefined) {
        this._uncheckedText = uncheckedText;
        this.updateConfig(undefined, "uncheckedText", uncheckedText);
    }

    public get uncheckedText(): string | undefined {
        return this._uncheckedText;
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
    private _saveOnChange?: boolean;
    @Input() public set saveOnChange(saveOnChange: boolean | undefined) {
        this._saveOnChange = saveOnChange;
        this.updateConfig(undefined, "saveOnChange", saveOnChange);
    }
    public get saveOnChange(): boolean | undefined {
        return this._saveOnChange;
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

    private _onlyValue?: boolean;
    @Input() public set onlyValue(onlyValue: boolean | undefined) {
        this._onlyValue = onlyValue;
        this.updateConfig(undefined, "onlyValue", onlyValue);
    }

    public get onlyValue(): boolean | undefined {
        return this._onlyValue;
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
        checkbox: InputCheckboxComponent,
    };

    private refreshNGModel: (_: any) => void;
    private isEnterKeyPressed = false;

    ngOnInit() {
        this.config = this.generateSafeConfig();

        this.state = new InlineEditorState({
            disabled: this.config.disabled,
            value: "",
        });

        this.service = new InlineEditorService(this.events, { ...this.config });

        this.subscriptions.onUpdateStateSubcription = this.events.internal.onUpdateStateOfParent.subscribe(
            (state: InlineEditorState) => this.state = state,
        );

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


        this.subscriptions.onChangeSubcription = this.events.internal.onChange.subscribe(
            ({ event, state }: InternalEvent) => {
                if (this.config.saveOnChange) {
                    this.saveAndClose({
                        event,
                        state: state.getState(),
                    });
                }
                this.emit(this.onChange, {
                    event,
                    state: state.getState(),
                });
            },
        );

        this.subscriptions.onKeyPressSubcription = this.events.internal.onKeyPress.subscribe(
            ({ event, state }: InternalEvent) => this.emit(this.onKeyPress, {
                event,
                state: state.getState(),
            }),
        );


        this.subscriptions.onBlurSubscription = this.events.internal.onBlur.subscribe(
            ({ event, state }: InternalEvent) => {
                // TODO (xxxtonixx): Maybe, this approach is not the best,
                // because we need to set a class property and it is dangerous.
                // We should search for one better.
                const isSavedByEnterKey = this.isEnterKeyPressed && this.config.saveOnEnter;

                if (this.config.saveOnBlur && !isSavedByEnterKey) {
                    this.saveAndClose({
                        event,
                        state: state.getState(),
                    });
                }

                this.isEnterKeyPressed = false;

                this.emit(this.onBlur, {
                    event,
                    state: state.getState(),
                });
            },
        );

        this.subscriptions.onClickSubcription = this.events.internal.onClick.subscribe(
            ({ event, state }: InternalEvent) => this.emit(this.onClick, {
                event,
                state: state.getState(),
            }),
        );

        this.subscriptions.onFocusSubcription = this.events.internal.onFocus.subscribe(
            ({ event, state }: InternalEvent) => this.emit(this.onFocus, {
                event,
                state: state.getState(),
            }),
        );

        this.subscriptions.onEnterSubscription = this.events.internal.onEnter.subscribe(
            ({ event, state }: InternalEvent) => {
                this.isEnterKeyPressed = true;

                if (this.config.saveOnEnter) {
                    this.save({
                        event,
                        state: state.getState(),
                    });

                    this.edit({ editing: false });
                }

                this.emit(this.onEnter, {
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

                this.emit(this.onEscape, {
                    event,
                    state: state.getState(),
                });
            },
        );

    }

    ngAfterContentInit() {
        this.service.onUpdateStateOfService.emit(this.state.clone());
        this.generateComponent(this.config.type);
    }

    ngOnDestroy() {
        Object.values(this.subscriptions).forEach(subscription => subscription.unsubscribe());
        this.currentComponent.destroy();
        this.service.destroy();
    }

    validate(): { [key: string]: any; } | null {
        const errors = this.inputInstance ? this.inputInstance.checkValue() : [];
        return errors.length === 0 ? null : {
            InlineEditorError: {
                valid: false,
            },
        };
    }

    writeValue(value: any) {
        this.state = this.state.newState({
            ...this.state.getState(),
            value,
        });

        this.events.internal.onUpdateStateOfChild.emit(this.state.clone());
    }

    registerOnChange(refreshNGModel: (_: any) => void) {
        this.refreshNGModel = refreshNGModel;
    }

    registerOnTouched() { }

    // Method to display the inline editor form and hide the <a> element
    public edit({ editing = true, focus = true, select = false, event }: EditOptions = {}) {
        this.state = this.state.newState({
            ...this.state.getState(),
            editing,
        });

        this.events.internal.onUpdateStateOfChild.emit(this.state.clone());

        if (editing) {
            this.emit(this.onEdit, {
                event,
                state: this.state.getState(),
            });
        }

        if (editing && focus) {
            this.inputInstance.focus();
        }

        if (editing && select) {
            this.inputInstance.select();
        }

    }

    public save({ event, state: hotState }: ExternalEvent) {
        const prevState = this.state.getState();

        const state = {
            ...prevState,
            ...hotState,
        };

        const errors = this.inputInstance.checkValue();
        if (errors.length !== 0) {
            this.onError.emit(errors);
        } else {
            this.state = this.state.newState(state);

            this.refreshNGModel(state.value);

            this.emit(this.onSave, {
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
        this.emit(this.onCancel, outsideEvent);
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

    private removeUndefinedProperties<T>(object: Object): T {
        return JSON.parse(
            JSON.stringify(
                typeof object === "object" ? object : {},
            ),
        );
    }

    private generateSafeConfig(): InlineConfig {
        const configFromAttrs: InlineConfig = {
            type: this.type!,
            name: this.name!,
            size: this.size!,
            placeholder: this.placeholder!,
            empty: this.empty!,
            required: this.required!,
            disabled: this.disabled!,
            hideButtons: this.hideButtons!,
            min: this.min!,
            max: this.max!,
            cols: this.cols!,
            rows: this.rows!,
            options: this.options!,
            pattern: this.pattern!,
            saveOnEnter: this.saveOnEnter!,
            saveOnBlur: this.saveOnBlur!,
            saveOnChange: this.saveOnChange!,
            editOnClick: this.editOnClick!,
            cancelOnEscape: this.cancelOnEscape!,
            onlyValue: this.onlyValue!,
            checkedText: this.checkedText!,
            uncheckedText: this.uncheckedText!,
        };

        return {
            // First default config
            ...defaultConfig,
            // Default config is overwritten by [config] attr
            ...this.removeUndefinedProperties<InputConfig>(this.config),
            // Config from attributes have preference over all others
            ...this.removeUndefinedProperties<InputConfig>(configFromAttrs),
        };
    }

    private updateConfig(config?: InlineConfig, property?: string, value?: any) {
        if (this.config) {
            config = config || this.config;

            if (property) {
                config[property] = value;
            }

            this.config = { ...config };

            this.events.internal.onUpdateConfig.emit(this.config);
        }
    }


    private emit(event: EventEmitter<InlineEditorEvent | any>, data: ExternalEvent) {
        if (this.config.onlyValue) {
            event.emit(data.state.value);
        } else {
            (event as EventEmitter<InlineEditorEvent>)
                .emit({
                    ...data,
                    instance: this,
                });
        }
    }
}
