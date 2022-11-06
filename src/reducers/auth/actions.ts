import { store } from '../store';

import { User } from '../../types/user';
import { AuthActions } from './types';

export function login(user: User) {
  store.dispatch({
    type: AuthActions.LOGIN,
    payload: { user },
  });
}

export function logout() {
  store.dispatch({
    type: AuthActions.LOGOUT,
  });
}
