import { AnyAction } from 'redux';

import { AuthActions, AuthReducerProps } from './types';

const initialState: AuthReducerProps = {
  user: null,
  isLogged: false,
};

export default function authReducer(state = initialState, action: AnyAction): AuthReducerProps {
  switch (action.type) {
  case AuthActions.LOGIN:
    const { user } = action.payload;
    return { ...state, user, isLogged: true };
  case AuthActions.LOGOUT:
    return { ...state, user: null, isLogged: false };
  default:
    return state;
  }
}
