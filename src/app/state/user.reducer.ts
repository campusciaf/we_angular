import { createReducer, on } from '@ngrx/store';
import { setUser, clearUser } from './user.actions';

export interface UserState {
  documento: number | null;
  credencial: number | null;
}

export const initialState: UserState = {
  documento: null,
  credencial: null
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, { documento, credencial }) => ({ ...state, documento, credencial })),
  on(clearUser, () => initialState)
);
