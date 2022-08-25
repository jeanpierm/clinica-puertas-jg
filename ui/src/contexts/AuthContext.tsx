import { createContext, useContext } from 'react';
import { LoginRequest } from '../models/login';
import { User } from '../models/user';

export type AuthContextProps = {
  currentUser: User;
  login: (body: LoginRequest) => Promise<void>;
  logout: VoidFunction;
  refresh: () => Promise<void>;
  refreshing: boolean;
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function useAuth() {
  return useContext(AuthContext);
}
