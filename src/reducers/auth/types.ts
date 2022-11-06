import { User } from '../../types/user';

export enum AuthActions {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
};

export interface AuthReducerProps {
  user: User | null,
  isLogged: boolean,
}
