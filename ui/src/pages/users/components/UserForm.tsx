import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Paper, Stack, styled } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../../services/helpers';
import { useGetUserQuery, useUpdateUserMutation } from '../../../services/users';
import { useAppDispatch } from '../../../redux/store';
import RHFTextField from '../../../components/RHFTextField';
import { UpdateUserRequest } from '../../../models/user';
import { notification, updateUserNotification } from '../../../redux/slices/notificationSlice';

// ------------------------------------------------------------------------------

const FormContainer = styled(Paper)(() => ({
  padding: 30,
  maxWidth: '900px',
  marginLeft: 'auto',
  marginRight: 'auto',
}));

// ------------------------------------------------------------------------------

type Props = { userId?: string };

type FormData = {
  name?: string;
  surname?: string;
  email: string;
  password?: string;
};

const defaultValues: FormData = {
  name: '',
  surname: '',
  email: '',
  password: '',
};

const UserSchema = z.object({
  name: z.string().optional(),
  surname: z.string().optional(),
  email: z.string().min(3, 'Email is required').email('Email must be a valid email address'),
  password: z.string().optional(),
});

const UserForm: React.FC<Props> = ({ userId }) => {
  const isEdit = useMemo(() => !!userId, [userId]);
  const methods = useForm<FormData>({ resolver: zodResolver(UserSchema), defaultValues });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { data: user, isLoading: isLoadingUser } = useGetUserQuery(userId!, { skip: !isEdit });
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!userId) return;
    const user: UpdateUserRequest = { ...data, id: userId };
    try {
      await updateUser(user).unwrap();
      dispatch(updateUserNotification());
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const message = 'error' in err ? err.error : JSON.stringify(err.data);
        dispatch(notification({ message, severity: 'error' }));
      } else if (isErrorWithMessage(err)) {
        dispatch(notification({ message: err.message, severity: 'error' }));
      }
    }
  };

  useEffect(() => {
    if (!isLoadingUser && user) {
      reset(user);
    }
  }, [isLoadingUser, user, reset]);

  return (
    <>
      <FormContainer>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <RHFTextField name='name' label='Nombre' />
              <RHFTextField name='surname' label='Apellido' />
              <RHFTextField name='email' label='Correo' required />
              {!isEdit && (
                <RHFTextField
                  name='password'
                  label='Password'
                  type={showPassword ? 'text' : 'password'}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              <LoadingButton
                fullWidth
                size='large'
                type='submit'
                variant='contained'
                loading={isSubmitting}
              >
                {isEdit ? 'Editar' : 'Crear'}
              </LoadingButton>
            </Stack>
          </form>
        </FormProvider>
      </FormContainer>
    </>
  );
};

export default UserForm;
