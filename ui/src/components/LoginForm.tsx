import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';

type FormData = {
  email: string;
  password: string;
  remember: boolean;
};

const LoginSchema = yup.object({
  email: yup
    .string()
    .email('Email must be a valid email address')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

const defaultValues = {
  email: '',
  password: '',
  remember: true,
};

const LoginForm: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const [showPassword, setShowPassword] = useState({});
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/';

  const onSubmit: SubmitHandler<FormData> = async ({
    email,
    password,
    remember,
  }) => {
    const loginRequest = {
      username: email,
      password,
    };
    try {
      await auth.signIn(loginRequest);
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    } catch (err) {
      if (!axios.isAxiosError(err)) return;

      auth.signOut();
      if (err.response?.status === 401) {
        window.alert('Invalid credentials');
        return;
      }
      window.alert(`An unknown error has ocurred, please try again.`);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Email"
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register('password')}
          />

          <Stack
            direction={'row'}
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <FormControlLabel
              control={
                <Controller
                  name="remember"
                  control={control}
                  render={({ field }) => (
                    <Checkbox {...field} checked={field.value} />
                  )}
                />
              }
              label="Remember me"
            />
            <Link variant="subtitle2" underline="hover">
              Forgot password?
            </Link>
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
};

export default LoginForm;
