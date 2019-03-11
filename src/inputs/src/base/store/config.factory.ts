import { Store } from '@qontu/component-store';

import { State } from './config.state';
import * as fromReducer from './config.reducer';

export function createStore() {
  return new Store<State>(fromReducer.BaseConfigStore, { debug: false });
}
