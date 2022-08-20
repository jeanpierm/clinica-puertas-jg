import { createContext, useContext } from 'react';
import { LoginRequest, LoginResponse } from '../interfaces/auth';
import { User } from '../interfaces/user';

export type AuthContextProps = {
  currentUser: User;
  signIn: (body: LoginRequest) => Promise<void>;
  signOut: VoidFunction;
  refresh: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export function useAuth() {
  return useContext(AuthContext);
}
