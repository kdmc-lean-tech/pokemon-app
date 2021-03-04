import { createAction, props } from '@ngrx/store';

export const setSocketStatus = createAction(
  '[Socket] Status', props<{ online: boolean }>()
);
