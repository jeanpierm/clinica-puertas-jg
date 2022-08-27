import React from 'react';
import { Link, useParams } from 'react-router-dom';
import UserForm from './components/UserForm';
import { Button, Container, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const EditUserPage: React.FC = () => {
  const { userId } = useParams();

  return (
    <>
      <Button startIcon={<ArrowBack />} component={Link} to='/usuarios'>
        Volver
      </Button>
      <Typography variant='h4' component='h1' sx={{ textAlign: 'center', my: 4 }}>
        Editar usuario
      </Typography>
      <Container>
        <UserForm userId={userId} />
      </Container>
    </>
  );
};

export default EditUserPage;
