import { EventEmitter } from "@angular/core";
import { InlineError } from "./inline-error.interface";
import { InlineConfig } from "../input-config";
import { InlineEditorState, InlineEditorStateOptions } from "./inline-editor-state.class";

export interface Events {
    internal: InternalEvents;
    external: ExternalEvents;
}
export class InternalEvents {
    public onUpdateState: EventEmitter<InlineEditorState> = new EventEmitter();
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
    public onChange: EventEmitter<ExternalEvent> = new EventEmitter();
    public onSave: EventEmitter<ExternalEvent> = new EventEmitter();
    public onKeyPress: EventEmitter<ExternalEvent> = new EventEmitter();
    public onFocus: EventEmitter<ExternalEvent> = new EventEmitter();
    public onBlur: EventEmitter<ExternalEvent> = new EventEmitter();
    public onEnter: EventEmitter<ExternalEvent> = new EventEmitter();
    public onEscape: EventEmitter<ExternalEvent> = new EventEmitter();
    public onEdit: EventEmitter<ExternalEvent> = new EventEmitter();
    public onCancel: EventEmitter<ExternalEvent> = new EventEmitter();
    public onError: EventEmitter<InlineError | InlineError[]> = new EventEmitter();
}

export interface InternalEvent {
    event?: Event;
    state: InlineEditorState;
}

export interface ExternalEvent {
    event?: Event;
    state: InlineEditorStateOptions;
}
