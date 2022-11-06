import { store } from '../store';

import { User } from '../../types/user';
import { AuthActions } from './types';

export function login(user: User) {
  alert(user.name)
  store.dispatch({
    type: AuthActions.LOGIN,
    payload: { user },
  });
}
