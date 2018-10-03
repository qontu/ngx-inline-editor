import { Disable, Enable, UpdateDirtyValue, CommitValue, PreventCommit, Editing } from '../actions/config.actions';
import { Store, Action } from '@qontu/component-store/actions';

export interface Config {
  value: any;
  dirty: any;
  isDisabled: boolean;
  isEditing: boolean;
  isCanceled: boolean;
}

@Store<Config>({
  value: '',
  dirty: '',
  isDisabled: false,
  isEditing: false,
  isCanceled: false
})
export class TextConfigStore {
  @Action(Disable)
  disable(state: Config, action: Disable): Config {
    return {
      ...state,
      isDisabled: true
    };
  }

  @Action(Enable)
  enable(state: Config, action: Enable): Config {
    return {
      ...state,
      isDisabled: false
    };
  }

  @Action(UpdateDirtyValue)
  updateDirtyValue(state: Config, { payload: { value } }: UpdateDirtyValue): Config {
    return {
      ...state,
      dirty: value
    };
  }

  @Action(CommitValue)
  commitValue(state: Config, { payload: { value } }: CommitValue): Config {
    return {
      ...state,
      dirty: value,
      value
    };
  }

  @Action(PreventCommit)
  preventCommit(state: Config): Config {
    return {
      ...state,
      isCanceled: true
    };
  }

  @Action(Editing)
  editing(state: Config, { isEditing }: Editing): Config {
    return {
      ...state,
      isEditing,
      isCanceled: isEditing ? false : state.isCanceled
    };
  }
}
