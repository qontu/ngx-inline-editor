export interface InlineEditorStateOptions {
    value: any;
    editing?: boolean;
    disabled?: boolean;
    empty?: boolean;
}

export class InlineEditorState {

    constructor({
        value,
        disabled = false,
        editing = false,
        empty = false,
    }: InlineEditorStateOptions = { value: "" }) {
        this.value = value;
        this.disabled = disabled;
        this.editing = editing;
        this.empty = empty;
    }

    private empty: boolean;
    value: any;
    private disabled: boolean;
    private editing: boolean;

    public newState(state: InlineEditorState | InlineEditorStateOptions) {
        return new InlineEditorState(state instanceof InlineEditorState ?
            state.getState() : state);
    }

    public getState(): InlineEditorStateOptions {
        const { value, editing, disabled, empty } = this;

        return {
            value,
            editing,
            disabled,
            empty,
        };
    }

    public clone(): InlineEditorState {
        return this.newState(this);
    }

    public isEmpty() {
        return this.empty;
    }

    public isEditing() {
        return this.editing;
    }

    public isDisabled() {
        return this.disabled;
    }
}
