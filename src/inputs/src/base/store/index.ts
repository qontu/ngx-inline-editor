import { Store } from '@qontu/component-store';
import * as fromReducer from './reducers/config.reducer';

export type State = fromReducer.Config;

export function createStore(debug = false) {
  return new Store<State>(fromReducer.TextConfigStore, { debug });
}
