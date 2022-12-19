import { Typography } from '@mui/material';
import React from 'react';
import DoorLocksTable from './components/DoorLocksTable';

const DoorLocksPage: React.FC = () => {
  return (
    <>
      <Typography variant='h4' component='h1' sx={{ textAlign: 'left', my: 4 }}>
        Seguros de puertas de carro
      </Typography>
      <DoorLocksTable />
    </>
  );
};

export default DoorLocksPage;
