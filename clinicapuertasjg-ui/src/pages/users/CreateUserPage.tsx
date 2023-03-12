import { ArrowBack } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import UserForm from './components/UserForm';

const CreateUserPage: React.FC = () => {
  return (
    <>
      <Button startIcon={<ArrowBack />} component={Link} to='/usuarios'>
        Volver
      </Button>
      <Typography variant='h4' component='h1' sx={{ textAlign: 'center', my: 4 }}>
        Crear nuevo usuario
      </Typography>
      <UserForm />
    </>
  );
};

export default CreateUserPage;
