import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FullScreenLoader from './FullScreenLoader';

type Props = { children: JSX.Element };
const NoRequireAuth: React.FC<Props> = ({ children }) => {
  const { currentUser, refresh } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    refresh().then(() => setChecking(false));
  }, []);

  if (checking) return <FullScreenLoader />;

  if (currentUser) {
    // Redirect them to the previous page
    return <Navigate to=".." />;
  }

  return children;
};

export default NoRequireAuth;
