import { Action, createReducer, on } from '@ngrx/store';
import { login, logout } from '../actions/auth.actions';
import { User } from '../../shared/models/user';

export interface AuthState {
  user: User | null;
}

export const initialState: AuthState = {
  user: null,
};

const _authReducer = createReducer(
  initialState,
  on(login, (state, { user }) => ({ ...state, user })),
  on(logout, state => ({ ...state, user: null }))
);

export function authReducer(state: AuthState | undefined, action: Action<string>) {
  return _authReducer(state, action);
}
