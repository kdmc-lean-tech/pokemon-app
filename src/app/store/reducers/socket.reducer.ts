import { createReducer, on, Action } from '@ngrx/store';
import { setSocketStatus } from 'src/app/store/actions/socket.actions';
import { SocketState } from '../models/socket.model';

export const initialState: SocketState = {
  online: false
};

// tslint:disable-next-line: variable-name
const _socketReducer = createReducer(initialState,
  on(setSocketStatus, (state, { online }) => {
    return {
      ...state,
      online
    };
  }),
);

export function socketReducer(state: SocketState, action: Action) {
  return _socketReducer(state, action);
}
