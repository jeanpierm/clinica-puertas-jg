import axios from 'axios';
import React, { useState } from 'react';
import { LoginRequest, LoginResponse } from '../models/login';
import { RefreshResponse } from '../models/refresh';
import { User } from '../models/user';
import { AuthContext } from './AuthContext';

type Props = {
  children: React.ReactNode;
};

const LOGIN_API = '/api/auth/sign-in';
const REFRESH_API = '/api/auth/refresh';

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(null!);
  const [refreshing, setRefreshing] = useState<boolean>(true);

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
    setRefreshing(true);

    const jwt = localStorage.getItem('accessToken');
    if (!jwt) {
      logout();
      setRefreshing(false);
      return;
    }

    try {
      const res = await axios.post<RefreshResponse>(REFRESH_API, null, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const { accessToken, userData } = res.data;
      localStorage.setItem('accessToken', accessToken);
      setCurrentUser(userData);
      setRefreshing(false);
    } catch (err) {
      logout();
      setRefreshing(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        refresh,
        refreshing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
