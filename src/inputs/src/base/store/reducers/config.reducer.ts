import {
  Disable,
  Enable,
  UpdateDirtyValue,
  CommitValue,
  PreventCommit,
  Editing,
  InvalidValue,
} from '../actions/config.actions';
import { Store, Action } from '@qontu/component-store/actions';

export interface Config {
  value: any;
  dirty: any;
  isDisabled: boolean;
  isEditing: boolean;
  isCanceled: boolean;
  hasChanged: boolean;
  isInvalid: boolean;
}

@Store<Config>({
  value: '',
  dirty: '',
  isDisabled: false,
  isEditing: false,
  isCanceled: false,
  hasChanged: false,
  isInvalid: false,
})
export class BaseConfigStore {
  @Action(Disable)
  disable(state: Config) {
    state.isDisabled = true;
  }

  @Action(Enable)
  enable(state: Config) {
    state.isDisabled = false;
  }

  @Action(UpdateDirtyValue)
  updateDirtyValue(state: Config, { payload: { value } }: UpdateDirtyValue) {
    state.dirty = value;
    state.hasChanged = true;
  }

  @Action(CommitValue)
  commitValue(state: Config, { payload: { value } }: CommitValue) {
    state.value = state.dirty = value;
    state.hasChanged = false;
    state.isInvalid = false;
  }

  @Action(PreventCommit)
  preventCommit(state: Config) {
    state.isCanceled = true;
    state.isInvalid = false;
    state.hasChanged = false;
  }

  @Action(InvalidValue)
  invalidValue(state: Config) {
    state.isInvalid = true;
  }

  @Action(Editing)
  editing(state: Config, { isEditing }: Editing) {
    state.isEditing = isEditing;
    state.isCanceled = isEditing ? false : state.isCanceled;
  }
}
