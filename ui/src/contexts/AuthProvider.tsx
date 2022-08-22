import axios from 'axios';
import React, { useState } from 'react';
import { LoginRequest, LoginResponse } from '../features/auth/interfaces/login';
import { RefreshResponse } from '../features/auth/interfaces/refresh';
import { User } from '../features/dashboard/interfaces/user';
import { AuthContext } from './AuthContext';

type Props = {
  children: React.ReactNode;
};

const LOGIN_API = 'api/auth/sign-in';
const REFRESH_API = 'api/auth/refresh';

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(null!);

  const login = async (body: LoginRequest) => {
    const res = await axios.post<LoginResponse>(LOGIN_API, body);
    const { accessToken, userData } = res.data;

    localStorage.setItem('accessToken', accessToken);
    setCurrentUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    setCurrentUser(null!);
  };

  const refresh = async () => {
    const jwt = localStorage.getItem('accessToken');
    if (!jwt) {
      logout();
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
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
