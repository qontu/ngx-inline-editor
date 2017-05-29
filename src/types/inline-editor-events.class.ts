import { EventEmitter } from "@angular/core";
import { InlineEditorError } from "./inline-editor-error.interface";
import { InlineConfig } from "../types/inline-configs";
import { InlineEditorState, InlineEditorStateOptions } from "./inline-editor-state.class";

export interface Events {
    internal: InternalEvents;
    external: ExternalEvents;
}

export class InternalEvents {
    public onUpdateStateOfParent: EventEmitter<InlineEditorState> = new EventEmitter();
    public onUpdateStateOfChild: EventEmitter<InlineEditorState> = new EventEmitter();
    public onChange: EventEmitter<InternalEvent> = new EventEmitter();
    public onFocus: EventEmitter<InternalEvent> = new EventEmitter();
    public onBlur: EventEmitter<InternalEvent> = new EventEmitter();
    public onKeyPress: EventEmitter<InternalEvent> = new EventEmitter();
    public onEnter: EventEmitter<InternalEvent> = new EventEmitter();
    public onEscape: EventEmitter<InternalEvent> = new EventEmitter();
    public onSave: EventEmitter<InternalEvent> = new EventEmitter();
    public onEdit: EventEmitter<InternalEvent> = new EventEmitter();
    public onCancel: EventEmitter<InternalEvent> = new EventEmitter();
    public onUpdateConfig: EventEmitter<InlineConfig> = new EventEmitter();
}

export class ExternalEvents {
    public onChange: EventEmitter<InlineEditorEvent> = new EventEmitter();
    public onSave: EventEmitter<InlineEditorEvent> = new EventEmitter();
    public onKeyPress: EventEmitter<InlineEditorEvent> = new EventEmitter();
    public onFocus: EventEmitter<InlineEditorEvent> = new EventEmitter();
    public onBlur: EventEmitter<InlineEditorEvent> = new EventEmitter();
    public onEnter: EventEmitter<InlineEditorEvent> = new EventEmitter();
    public onEscape: EventEmitter<InlineEditorEvent> = new EventEmitter();
    public onEdit: EventEmitter<InlineEditorEvent> = new EventEmitter();
    public onCancel: EventEmitter<InlineEditorEvent> = new EventEmitter();
    public onError: EventEmitter<InlineEditorError | InlineEditorError[]> = new EventEmitter();
}

export interface InternalEvent {
    event?: Event;
    state: InlineEditorState;
}

export interface ExternalEvent {
    event?: Event;
    state: InlineEditorStateOptions;
}

export type InlineEditorEvent = ExternalEvent;
