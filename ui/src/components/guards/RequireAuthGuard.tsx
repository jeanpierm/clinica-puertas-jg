import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import FullScreenLoader from '../FullScreenLoader';
import { useAuth } from '../../contexts/AuthContext';

type Props = { children: JSX.Element };
const RequireAuthGuard: React.FC<Props> = ({ children }) => {
  const { currentUser, refresh, refreshing } = useAuth();
  const location = useLocation();

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing]);

  if (refreshing) return <FullScreenLoader />;

  if (!currentUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuthGuard;
