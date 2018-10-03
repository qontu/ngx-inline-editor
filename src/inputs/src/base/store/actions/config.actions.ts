export class Disable {
  readonly type = "[INLINE_EDITOR_TEXT] Disable";
  constructor() {}
}

export class Enable {
  readonly type = "[INLINE_EDITOR_TEXT] Enable";
  constructor() {}
}

export class UpdateDirtyValue {
  readonly type = "[INLINE_EDITOR_TEXT] Update dirty value";
  constructor(public payload: { value: any }) {}
}

export class CommitValue {
  readonly type = "[INLINE_EDITOR_TEXT] Commit value";
  constructor(public payload: { value: any }) {}
}

export class PreventCommit {
  readonly type = "[INLINE_EDITOR_TEXT] Prevent commit";
  constructor() {}
}

export class Editing {
  readonly type = "[INLINE_EDITOR_TEXT] Editing state";
  constructor(public isEditing: boolean) {}
}
