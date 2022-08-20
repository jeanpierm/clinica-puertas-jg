import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const auth = useAuth();

  return (
    <>
      <Typography variant="h1">HomePage</Typography>
      <Typography variant="h2" color="initial">
        Welcome back, {auth.currentUser.email}
      </Typography>

      <Typography variant="body1" color="initial">
        This page is protected!!
      </Typography>

      <div>
        <button onClick={() => auth.signOut()}>Logout</button>
      </div>
    </>
  );
};

export default HomePage;
