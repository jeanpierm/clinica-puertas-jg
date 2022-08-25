import { Typography } from '@mui/material';
import React from 'react';
import UserForm from './components/UserForm';

const CreateUserPage: React.FC = () => {
  return (
    <>
      <Typography variant='h4' component='h1' sx={{ textAlign: 'left', my: 4 }}>
        Crear nuevo usuario
      </Typography>
      <UserForm />
    </>
  );
};

export default CreateUserPage;
