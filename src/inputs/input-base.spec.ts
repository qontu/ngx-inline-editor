//import { TestBed, fakeAsync, tick } from "@angular/core/testing";
//import { Renderer, Injector } from "@angular/core";

//import { InputBase } from "./input-base";
//import { inject } from "@angular/core/testing";
//import { InlineEditorService } from "../inline-editor.service";
//import { InlineEditorEvent, Events, ExternalEvent } from "../types/inline-editor-events.class";
//import { InlineEditorState } from "../types/inline-editor-state.class";

//let component: InputBase;

//let inlineEditorService: InlineEditorService;
//let renderer: Renderer;

//function inlineEditorSpyFactory(): InlineEditorService {
//  const createObservableSpy = () => ({
//    subscribe: jasmine.createSpy("subscribe")
//      .and.returnValue(jasmine.createSpyObj("observable", ["unsubscribe"])),
//  });

//  const spy = {
//    getConfig: jasmine.createSpy("getConfig").and.returnValue({ disabled: false }),
//    getState: jasmine.createSpy("getState"),
//    events: {
//      internal: {
//        onUpdateConfig: createObservableSpy(),
//        onSave: {
//          emit: jasmine.createSpy("emit"),
//        },
//        onCancel: {
//          emit: jasmine.createSpy("emit"),
//        },
//        onEnter: {
//          emit: jasmine.createSpy("emit"),
//        },
//        onEscape: {
//          emit: jasmine.createSpy("emit"),
//        },
//        onBlur: {
//          emit: jasmine.createSpy("emit"),
//        },
//        onFocus: {
//          emit: jasmine.createSpy("emit"),
//        },
//        onClick: {
//          emit: jasmine.createSpy("emit"),
//        },
//        onUpdateStateOfChild: createObservableSpy(),
//      },
//    },
//    onUpdateStateOfService: {
//      emit: jasmine.createSpy("emit"),
//    },
//  };

//  return spy as any as InlineEditorService;
//}

//function rendererSpyFactory(): Renderer {
//  const spy = jasmine.createSpyObj("Renderer", ["invokeElementMethod"]);

//  return spy as Renderer;
//}

//describe("InputBaseComponent", () => {
//  beforeEach(() => {
//    TestBed.configureTestingModule({
//      declarations: [],
//      providers: [
//        {
//          provide: InlineEditorService,
//          useFactory: inlineEditorSpyFactory,
//        },
//        {
//          provide: Renderer,
//          useFactory: rendererSpyFactory,
//        },
//      ],
//    });
//  });

//  beforeEach(() => {
//    component = new InputBase(TestBed);
//  });


//  beforeEach(inject([InlineEditorService, Renderer],
//    (_inlineEditorService: InlineEditorService, _renderer: Renderer) => {
//      inlineEditorService = _inlineEditorService;
//      renderer = _renderer;
//    }),
//  );

//  describe("should capture state when", () => {

//    it("Call onSave event", () => {
//      component.save();
//      expect(inlineEditorService.events.internal.onSave.emit).toHaveBeenCalledTimes(1);
//      expect(inlineEditorService.events.internal.onSave.emit).toHaveBeenCalledWith(jasmine.objectContaining({
//        state: jasmine.objectContaining({
//          value: "",
//          editing: false,
//          disabled: false,
//          empty: true,
//        }),
//      }));
//    });

//    it("Call onCancel event", () => {
//      component.cancel();

//      expect(inlineEditorService.events.internal.onCancel.emit).toHaveBeenCalledTimes(1);
//      expect(inlineEditorService.events.internal.onCancel.emit).toHaveBeenCalledWith(jasmine.objectContaining({
//        state: jasmine.objectContaining({
//          value: "",
//          editing: false,
//          disabled: false,
//          empty: true,
//        }),
//      }));
//    });

//    it("Call onEnter event", () => {
//      event = null;
//      component.onEnter(event);

//      expect(inlineEditorService.events.internal.onEnter.emit).toHaveBeenCalledTimes(1);
//      expect(inlineEditorService.events.internal.onEnter.emit).toHaveBeenCalledWith(jasmine.objectContaining({
//        event,
//        state: jasmine.objectContaining({
//          value: "",
//          editing: false,
//          disabled: false,
//          empty: true,
//        }),
//      }));
//    });

//    it("Call onEscape event", () => {
//      event = null;
//      component.onEscape(event);

//      expect(inlineEditorService.events.internal.onEscape.emit).toHaveBeenCalledTimes(1);
//      expect(inlineEditorService.events.internal.onEscape.emit).toHaveBeenCalledWith(jasmine.objectContaining({
//        event,
//        state: jasmine.objectContaining({
//          value: "",
//          editing: false,
//          disabled: false,
//          empty: true,
//        }),
//      }));
//    });

//    it("Call onBlur event", () => {
//      event = null;
//      component.onBlur(event);

//      expect(inlineEditorService.events.internal.onBlur.emit).toHaveBeenCalledTimes(1);
//      expect(inlineEditorService.events.internal.onBlur.emit).toHaveBeenCalledWith(jasmine.objectContaining({
//        event,
//        state: jasmine.objectContaining({
//          value: "",
//          editing: false,
//          disabled: false,
//          empty: true,
//        }),
//      }));
//    });

//    it("Call onClick event", () => {
//      event = null;
//      component.onClick(event);

//      expect(inlineEditorService.events.internal.onClick.emit).toHaveBeenCalledTimes(1);
//      expect(inlineEditorService.events.internal.onClick.emit).toHaveBeenCalledWith(jasmine.objectContaining({
//        event,
//        state: jasmine.objectContaining({
//          value: "",
//          editing: false,
//          disabled: false,
//          empty: true,
//        }),
//      }));
//    });

//    it("Call onFocus event", () => {
//      event = null;
//      component.onFocus(event);

//      expect(inlineEditorService.events.internal.onFocus.emit).toHaveBeenCalledTimes(1);
//      expect(inlineEditorService.events.internal.onFocus.emit).toHaveBeenCalledWith(jasmine.objectContaining({
//        event,
//        state: jasmine.objectContaining({
//          value: "",
//          editing: false,
//          disabled: false,
//          empty: true,
//        }),
//      }));
//    });

//  });

//  describe("should call funtion invokeElementMethod from renderer object when", () => {

//    it("Call focus ", fakeAsync(() => {
//      component.focus();
//      tick();

//      expect(renderer.invokeElementMethod).toHaveBeenCalledTimes(1);
//      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(component.inputElement, "focus", []);
//    }));

//    it("Call select", fakeAsync(() => {
//      component.select();
//      tick();

//      expect(renderer.invokeElementMethod).toHaveBeenCalledTimes(1);
//      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(component.inputElement, "select", []);
//    }));
//  });
//});
