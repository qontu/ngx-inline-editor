import { InlineConfig } from "./input-config";
import { Subscription } from "rxjs/Subscription";
import { Events } from "./types/inline-editor-events.class";
import { InlineEditorState } from "./types/inline-editor-state.class";
import { EventEmitter } from "@angular/core";

export class InlineEditorService {
    constructor(
        public events: Events,
        public config?: InlineConfig,
    ) {
        this.subscriptions.onUpdateStateSubscription = this.onUpdateStateOfService.subscribe(
            (state: InlineEditorState) => this.state = state,
        );
    }

    public onUpdateStateOfService: EventEmitter<InlineEditorState> = new EventEmitter<InlineEditorState>();

    private state: InlineEditorState;
    private subscriptions: { [key: string]: Subscription } = {};


    public setConfig(config: InlineConfig) {
        this.config = config;
    }

    public getConfig(): InlineConfig | undefined {
        return this.config;
    }

    public getState(): InlineEditorState {
        return this.state.clone();
    }

    public destroy() {
        Object.values(this.subscriptions).forEach(subscription => subscription.unsubscribe());
    }
}
