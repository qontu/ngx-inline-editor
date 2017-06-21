export interface InlineEditorStateOptions {
    value: any;
    editing?: boolean;
    disabled?: boolean;
    empty?: boolean;
    name: string;
}

export class InlineEditorState {

    constructor({
        value,
        disabled = false,
        editing = false,
        empty = false,
        name
    }: InlineEditorStateOptions = { value: "", name: "" }) {
        this.value = value;
        this.disabled = disabled;
        this.editing = editing;
        this.empty = empty;
        this.name = name;
    }

    private empty: boolean;
    private value: any;
    private disabled: boolean;
    private editing: boolean;
    private name: string;

    public newState(state: InlineEditorState | InlineEditorStateOptions) {
        return new InlineEditorState(state instanceof InlineEditorState ?
            state.getState() : state);
    }

    public getState(): InlineEditorStateOptions {
        const { value, editing, disabled, empty, name } = this;

        return {
            value,
            editing,
            disabled,
            empty,
            name
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
