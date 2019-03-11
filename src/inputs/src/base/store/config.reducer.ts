import {
  Disable,
  Enable,
  UpdateDirtyValue,
  CommitValue,
  PreventCommit,
  Editing,
  InvalidValue,
  Override,
} from './config.actions';
import { Store, Action } from '@qontu/component-store/actions';
import { State } from './config.state';

@Store<State>({
  value: '',
  dirty: '',
  isDisabled: false,
  isEditing: false,
  isCanceled: false,
  hasChanged: false,
  isValid: true,
})
export class BaseConfigStore {
  @Action(Disable)
  disable(state: State) {
    state.isDisabled = true;
    state.isCanceled = false;
  }

  @Action(Enable)
  enable(state: State) {
    state.isDisabled = false;
    state.isCanceled = false;
  }

  @Action(UpdateDirtyValue)
  updateDirtyValue(state: State, { payload: { value } }: UpdateDirtyValue) {
    return {
      ...state,
      dirty: value,
      hasChanged: true,
      isCanceled: false,
    };
  }

  @Action(CommitValue)
  commitValue(state: State, { payload: { value } }: CommitValue) {
    return {
      ...state,
      value,
      dirty: value,
      hasChanged: true,
      isValid: true,
      isCanceled: false,
    };
  }

  @Action(PreventCommit)
  preventCommit(state: State) {
    return {
      ...state,
      dirty: state.value,
      isCanceled: true,
      isValid: true,
      hasChanged: false,
    };
  }

  @Action(InvalidValue)
  invalidValue(state: State) {
    state.isValid = false;
    state.isCanceled = false;
  }

  @Action(Editing)
  editing(state: State, { isEditing }: Editing) {
    state.isEditing = isEditing;
    state.isCanceled = isEditing ? false : state.isCanceled;
  }

  @Action(Override)
  override(state: State, { payload: newState }: Override) {
    return {
      ...state,
      ...newState,
    };
  }
}
