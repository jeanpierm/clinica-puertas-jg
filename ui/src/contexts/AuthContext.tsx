import { createContext, useContext } from 'react';
import { LoginRequest } from '../features/auth/interfaces/login';
import { User } from '../features/dashboard/interfaces/user';

export type AuthContextProps = {
  currentUser: User;
  login: (body: LoginRequest) => Promise<void>;
  logout: VoidFunction;
  refresh: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export function useAuth() {
  return useContext(AuthContext);
}
