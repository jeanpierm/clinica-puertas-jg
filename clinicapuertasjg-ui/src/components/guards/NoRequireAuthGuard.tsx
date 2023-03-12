import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

type Props = { children: JSX.Element };
const NoRequireAuthGuard: React.FC<Props> = ({ children }) => {
  const { currentUser } = useAuth();

  if (currentUser) {
    // Redirect them to the previous page
    return <Navigate to='..' />;
  }

  return children;
};

export default NoRequireAuthGuard;
