import { createReducer, on, Action } from '@ngrx/store';
import { setUsers } from '../actions/chat.actions';
import { ChatState } from '../models/chat.model';

const initialState: ChatState = {
  users: []
};

// tslint:disable-next-line: variable-name
const _chatReducer = createReducer(initialState,
  on(setUsers, (state, { users }) => {
    return {
      ...state,
      users
    };
  })
);

export function chatReducer(state: ChatState, action: Action) {
  return _chatReducer(state, action);
}
