export class Disable {
  readonly type = '[INLINE_EDITOR_BASE] Disable';
  constructor() {}
}

export class Enable {
  readonly type = '[INLINE_EDITOR_BASE] Enable';
  constructor() {}
}

export class UpdateDirtyValue {
  readonly type = '[INLINE_EDITOR_BASE] Update dirty value';
  constructor(public payload: { value: any }) {}
}

export class CommitValue {
  readonly type = '[INLINE_EDITOR_BASE] Commit value';
  constructor(public payload: { value: any }) {}
}

export class PreventCommit {
  readonly type = '[INLINE_EDITOR_BASE] Prevent commit';
  constructor() {}
}

export class InvalidValue {
  readonly type = '[INLINE_EDITOR_BASE] Invalid value';
  constructor() {}
}

export class Editing {
  readonly type = '[INLINE_EDITOR_BASE] Editing state';
  constructor(public isEditing: boolean) {}
}
