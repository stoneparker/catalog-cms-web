import { User } from '../../types/user';

export enum AuthActions {
  LOGIN = 'LOGIN'
};

export interface AuthReducerProps {
  user: User | null,
  isLogged: boolean,
}
