import { Facebook, Google, Twitter } from '@mui/icons-material';
import { Button, Divider, Stack, Typography } from '@mui/material';
import React from 'react';

const AuthSocial: React.FC = () => {
  return (
    <>
      <Stack direction='row' spacing={2}>
        <Button fullWidth size='large' color='primary' variant='outlined'>
          <Google height={22} width={22} htmlColor='#DF3E30' />
        </Button>
        <Button fullWidth size='large' color='primary' variant='outlined'>
          <Facebook height={22} width={22} htmlColor='#1877F2' />
        </Button>
        <Button fullWidth size='large' color='primary' variant='outlined'>
          <Twitter height={22} width={22} htmlColor='#1C9CEA' />
        </Button>
      </Stack>
      <Divider sx={{ my: 3 }}>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
};

export default AuthSocial;
