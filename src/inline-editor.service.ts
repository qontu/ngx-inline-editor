import { InlineConfig } from "./input-config";
import { Subscription } from "rxjs/Subscription";
import { Events } from "./types/inline-editor-events.class";
import { InlineEditorState } from "./types/inline-editor-state.class";

export class InlineEditorService {
    constructor(
        public events: Events,
        public config?: InlineConfig,
    ) {
        this.onUpdateStateSubscription = this.events.internal.onUpdateState.subscribe(
            (state: InlineEditorState) => this.state = state,
        );
    }

    private onUpdateStateSubscription: Subscription;

    private state: InlineEditorState;

    public setConfig(config: InlineConfig) {
        this.config = config;
    }

    public getConfig(): InlineConfig | undefined {
        return this.config;
    }

    public getState(): InlineEditorState {
        return this.state.clone();
    }
}
