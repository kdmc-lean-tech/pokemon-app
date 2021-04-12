import { createAction, props } from '@ngrx/store';
import { UserChat } from '../../models/user.model';

export const setUsers = createAction(
  '[Chat] Set Users', props<{ users: UserChat[], page: 1 }>()
);

export const resetUsers = createAction(
  '[Chat] Reset Users'
);

export const setSocketUser = createAction(
  '[Chat] Set User',
  props<{ user: UserChat }>()
);

// TODO: Add new action -> insertUserConnected....
