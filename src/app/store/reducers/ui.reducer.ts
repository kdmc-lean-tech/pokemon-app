import { createReducer, on } from '@ngrx/store';
import { setLoading } from 'src/app/store/actions/ui.actions';
import { UI } from 'src/app/store/models/ui.model';

export const initialState: UI = {
  isLoading: false
};

// tslint:disable-next-line: variable-name
const _uiReducer = createReducer(initialState,
  on(setLoading, (state, { isLoading }) => {
    return {
      ...state,
      isLoading
    };
  }),
);

export function uiReducer(state, action) {
  return _uiReducer(state, action);
}
