import { createReducer, on, Action } from '@ngrx/store';
import { AuthState } from '../models/auth.model';
import { setUser } from '../actions/auth.actions';

const initialState: AuthState = {
  user: null,
  token: null
};

// tslint:disable-next-line: variable-name
const _authReducer = createReducer(initialState,
  on(setUser, (state, { user, token }) => {
    return {
      ...state,
      user,
      token
    };
  }),
);

export function authReducer(state: AuthState, action: Action) {
  return _authReducer(state, action);
}
