import axios from 'axios';
import React, { useState } from 'react';
import {
  LoginRequest,
  LoginResponse,
  RefreshResponse,
} from '../interfaces/auth';
import { User } from '../interfaces/user';
import { AuthContext } from './AuthContext';

type Props = {
  children: React.ReactNode;
};

const LOGIN_API = 'api/auth/sign-in';
const REFRESH_API = 'api/auth/refresh';

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(null!);

  const signIn = async (body: LoginRequest) => {
    const res = await axios.post<LoginResponse>(LOGIN_API, body);
    const { accessToken, userData } = res.data;

    localStorage.setItem('accessToken', accessToken);
    setCurrentUser(userData);
  };

  const signOut = () => {
    localStorage.clear();
    setCurrentUser(null!);
  };

  const refresh = async () => {
    const jwt = localStorage.getItem('accessToken');
    if (!jwt) {
      signOut();
      return;
    }

    try {
      const res = await axios.post<RefreshResponse>(REFRESH_API, null, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const { accessToken, userData } = res.data;
      localStorage.setItem('accessToken', accessToken);
      setCurrentUser(userData);
    } catch (err) {
      signOut();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signIn,
        signOut,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
