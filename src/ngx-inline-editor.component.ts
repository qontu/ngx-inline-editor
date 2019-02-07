import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  forwardRef,
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild,
  AfterViewInit,
  AfterContentInit,
  Inject,
  ChangeDetectorRef,
  Injector,
  EventEmitter,
  Output,
  Input,
  OnDestroy,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';
import {
  INLINE_EDITOR_INPUTS,
  InlineEditorEvents,
  INLINE_EDITOR_TEMPLATE_CONFIG,
} from './common/index';
import { InputBase, InputWithControls } from './inputs/src/input-base';
import { InlineEditorService } from './ngx-inline-editor.service';

@Component({
  selector: 'inline-editor',
  templateUrl: './ngx-inline-editor.component.html',
  styleUrls: ['./ngx-inline-editor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InlineEditorComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineEditorComponent
  implements
    OnInit,
    OnDestroy,
    AfterViewInit,
    AfterContentInit,
    ControlValueAccessor {
  input: InputBase;
  private componentRef: ComponentRef<InputBase>;
  @ViewChild('inlineEditor', { read: ViewContainerRef })
  private container: ViewContainerRef;

  private initialValues: Partial<InitialValues> = {};
  events = new InlineEditorEvents();
  @Input()
  type: string;
  @Input('config')
  templateConfig: any = {};

  @Output()
  save: EventEmitter<any> = this.events.onSave;
  @Output()
  edit: EventEmitter<any> = this.events.onEdit;
  @Output()
  cancel: EventEmitter<any> = this.events.onCancel;
  @Output()
  error: EventEmitter<any> = this.events.onError;
  @Output()
  enter: EventEmitter<any> = this.events.onEnter;
  @Output()
  escape: EventEmitter<any> = this.events.onEscape;
  @Output()
  keyPress: EventEmitter<any> = this.events.onKeyPress;
  @Output()
  focus: EventEmitter<any> = this.events.onFocus;
  @Output()
  blur: EventEmitter<any> = this.events.onBlur;
  @Output()
  click: EventEmitter<any> = this.events.onClick;

  constructor(
    protected cd: ChangeDetectorRef,
    protected componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private inlineEditorService: InlineEditorService,
    @Inject(INLINE_EDITOR_INPUTS) protected inputs: Type<InputBase>[],
  ) {}

  onSubmit(event: any) {}

  onEdit(event: any) {}

  onCancel(event: any) {}

  get control(): NgControl {
    const { control } =
      this.input && this.input.control
        ? this.input
        : this.injector.get(NgControl, null);
    (window as any).c = control;

    return control;
  }

  writeValue(value: any): void {
    this.initialValues.value = value;
  }
  registerOnChange(fn: any): void {
    this.initialValues.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.initialValues.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.initialValues.isDisabled = isDisabled;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.inlineEditorService.unregisterInput(this.input.getID());
    this.componentRef.destroy();
  }

  ngAfterViewInit(): void {
    this.generateComponent(this.type);
    setTimeout(() => this.cd.markForCheck());
  }

  ngAfterContentInit(): void {}

  private getComponentType(typeName: string = 'text'): Type<InputBase> | never {
    const input = this.inputs.find(({ type }) =>
      Array.isArray(type) ? type.includes(typeName) : type === typeName,
    );

    if (!input) {
      throw new Error('That type does not exist or it is not implemented yet!');
    }

    return input;
  }

  private generateComponent(type: string = 'text'): void {
    const componentType = this.getComponentType(type);
    this.input = this.createInputInstance(componentType);

    if (!isInput(this.input)) {
      throw new Error(
        'The input must implement the ControlValueAccessor interface',
      );
    }

    this.registerInput(this.input);

    if (hasControl(this.input)) {
      this.registerControls(this.input);
    }

    this.inlineEditorService.registerInput(this.input);
  }

  private createInputInstance(componentType: Type<InputBase>): InputBase {
    // const refInjector = ReflectiveInjector.resolveAndCreate(
    //   this.inputs.map(input => ({ provide: input, useValue: input })),
    //   this.injector,
    // );

    const factory = this.componentFactoryResolver.resolveComponentFactory<
      InputBase
    >(componentType);
    this.componentRef = this.container.createComponent(
      factory,
      undefined,
      Injector.create(
        [
          {
            provide: InlineEditorEvents,
            useValue: this.events,
          },
          {
            provide: INLINE_EDITOR_TEMPLATE_CONFIG,
            useValue: this.templateConfig,
          },
        ],
        this.injector,
      ),
    );
    // this.componentRef = this.container.createComponent(factory , 0, refInjector);

    return this.componentRef.instance;
  }

  private registerInput(input: InputBase) {
    // Bind methods
    this.registerOnChange = input.registerOnChange.bind(input);
    this.registerOnTouched = input.registerOnTouched.bind(input);
    this.setDisabledState = input.setDisabledState.bind(input);
    this.writeValue = input.writeValue.bind(input);

    // Call methods
    this.registerOnChange(this.initialValues.onChange);
    this.registerOnTouched(this.initialValues.onTouched);

    if (this.initialValues.isDisabled != null) {
      this.setDisabledState(this.initialValues.isDisabled);
    }

    this.writeValue(this.initialValues.value);
  }

  private registerControls(input: InputWithControls) {
    this.onSubmit = input.onSubmit.bind(input);
    this.onCancel = input.onCancel.bind(input);
    this.onEdit = input.onEdit.bind(input);
  }
}

export interface Type<T> extends Function {
  type: string;
  new (...args: any[]): T;
}

interface InitialValues {
  value: any;
  onChange: any;
  onTouched: any;
  isDisabled: boolean;
}

export function isInput(input: any): input is InputBase {
  return input.registerOnChange && input.registerOnTouched && input.writeValue;
}

export function hasControl(input: any): input is InputWithControls {
  return input.onSubmit && input.onCancel;
}
