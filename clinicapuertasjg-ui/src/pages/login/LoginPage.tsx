import { Link as RouterLink } from 'react-router-dom';
import { Card, Container, Link, Typography, styled } from '@mui/material';
import React from 'react';
import Page from '../../components/Page';
import LoginForm from './components/LoginForm';
import AuthSocial from './components/AuthSocial';
import useResponsive from '../../hooks/useResponsive';
import Logo from '../../components/Logo';

// ------------------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ------------------------------------------------------------------------------

const LoginPage: React.FC = () => {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  return (
    <Page title='Login'>
      <RootStyle>
        <HeaderStyle>
          <Logo />

          {smUp && (
            <Typography variant='body2' sx={{ mt: { md: -2 } }}>
              Don&apos;t have an account? {''}
              <Link variant='subtitle2' component={RouterLink} to='/register'>
                Get started
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant='h3' sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src='/static/illustrations/illustration_login.png' alt='login' />
          </SectionStyle>
        )}

        <Container maxWidth='sm'>
          <ContentStyle>
            <Typography variant='h4' gutterBottom>
              Sign in to
              <br />
              Clínica de Puertas J & G
              <br />
              Management System
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>
              Enter your details below.
            </Typography>

            <AuthSocial />

            <LoginForm />

            {!smUp && (
              <Typography variant='body2' color='initial' align='center' sx={{ mt: 3 }}>
                Don&apos;t have an account?{' '}
                <Link variant='subtitle2' component={RouterLink} to='/register'>
                  Get started
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
};

export default LoginPage;
