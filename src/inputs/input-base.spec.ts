import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement, EventEmitter, Injector } from "@angular/core";

import { InputBase } from "./input-base";
import { inject } from "@angular/core/testing";
import { InlineEditorService } from "../inline-editor.service";
import { InlineEditorEvent, Events, ExternalEvent } from "../types/inline-editor-events.class";
import { InlineEditorState } from "../types/inline-editor-state.class";

let inputBaseFixture: ComponentFixture<InputBase>;
let component: InputBase;

let inlineEditorService: InlineEditorService;

function inlineEditorSpyFactory(): InlineEditorService {
    const createObservableSpy = () => ({
        subscribe: jasmine.createSpy("subscribe")
            .and.returnValue(jasmine.createSpyObj("observable", ["unsubscribe"])),
    });

    const spy = {
        getConfig: jasmine.createSpy("getConfig").and.returnValue({ disabled: false }),
        getState: jasmine.createSpy("getState"),
        events: {
            internal: {
                onUpdateConfig: createObservableSpy(),
                onSave: {
                    emit: jasmine.createSpy("emitº"),
                },
                onUpdateStateOfChild: createObservableSpy(),
            },
        },
        onUpdateStateOfService: {
            emit: jasmine.createSpy("emit"),
        },
    };

    return spy as any as InlineEditorService;
}


describe("InputBaseComponent", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [InputBase],
            providers: [
                {
                    provide: InlineEditorService,
                    useFactory: inlineEditorSpyFactory,
                },
                {
                    provide: Injector,
                    useValue: TestBed,
                },
            ],
        });
    });

    beforeEach(() => {
        inputBaseFixture = TestBed.createComponent(InputBase);
        component = inputBaseFixture.componentInstance;
    });


    beforeEach(inject([InlineEditorService],
        (_inlineEditorService: InlineEditorService) => {
            inlineEditorService = _inlineEditorService;
        }),
    );

    it("should be defined", () => {
        expect(inputBaseFixture).toBeDefined();
    });
    /*
        it("should capture state when call onSave event", () => {
            component.save();
            expect(inlineEditorService.events.internal.onSave.emit).toHaveBeenCalledTimes(1);
            expect(inlineEditorService.events.internal.onSave.emit).toHaveBeenCalledWith(jasmine.objectContaining({
                state: jasmine.objectContaining({
                    empty: true,
                    value: "",
                    editing: false,
                    disabled: false,
                }),
            }));
        });
    */
});
