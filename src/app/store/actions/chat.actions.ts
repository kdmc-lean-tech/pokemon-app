import { createAction, props } from '@ngrx/store';
import { UserChat } from '../../models/user.model';

export const setUsers = createAction(
  '[Chat] Set Users', props<{ users: UserChat[] }>()
);

export const setSocketUser = createAction(
  '[Chat]', props<{ user: UserChat }>()
);
