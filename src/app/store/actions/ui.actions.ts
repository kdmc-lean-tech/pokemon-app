import { createAction, props } from '@ngrx/store';

export const setLoading = createAction('[UI] isLoading', props<{ isLoading: boolean }>());
