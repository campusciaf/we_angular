import { createAction, props } from '@ngrx/store';

export const setUser = createAction(
  '[User] Set User',
  props<{ documento: number; credencial: number }>()
);

export const clearUser = createAction('[User] Clear User');
