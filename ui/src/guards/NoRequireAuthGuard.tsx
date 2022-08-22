import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FullScreenLoader from '../components/FullScreenLoader';

type Props = { children: JSX.Element };
const NoRequireAuthGuard: React.FC<Props> = ({ children }) => {
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

export default NoRequireAuthGuard;
