import React from 'react';
import { useParams } from 'react-router-dom';
import UserForm from './components/UserForm';
import { Container, Typography } from '@mui/material';

const EditUserPage: React.FC = () => {
  const { userId } = useParams();

  return (
    <>
      <Typography variant='h4' component='h1' sx={{ textAlign: 'left', my: 4 }}>
        Editar usuario
      </Typography>
      <Container>
        <UserForm userId={userId} />
      </Container>
    </>
  );
};

export default EditUserPage;
