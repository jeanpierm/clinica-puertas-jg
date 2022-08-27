import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, InputAdornment, Paper, Skeleton, Stack, styled } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import RHFMultiCheckbox from '../../../components/RHFMultiCheckbox';
import RHFTextField from '../../../components/RHFTextField';
import { UserMessages } from '../../../constants/messages';
import { Option } from '../../../models/option';
import { UserFormData } from '../../../models/user';
import { notification } from '../../../redux/slices/notificationSlice';
import { useAppDispatch } from '../../../redux/store';
import { useGetRolesQuery } from '../../../services/roles';
import {
  useCreateUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from '../../../services/users';
import { RolesAdapter } from '../adapters/RolesAdapter';
import { UserFormAdapter } from '../adapters/UserFormAdapter';

// ------------------------------------------------------------------------------

const FormContainer = styled(Paper)(() => ({
  padding: 30,
  maxWidth: '900px',
  marginLeft: 'auto',
  marginRight: 'auto',
}));

// ------------------------------------------------------------------------------

type Props = { userId?: string };

const defaultValues: UserFormData = {
  name: '',
  surname: '',
  email: '',
  password: '',
  roleNames: [],
};

const UserSchema = z.object({
  name: z.string().optional(),
  surname: z.string().optional(),
  email: z
    .string()
    .min(3, 'El email debe tener al menos 3 caracteres')
    .email('El correo electrónico debe ser válido'),
  password: z.string().optional(),
  roleNames: z.array(z.string()).min(1, 'Al menos un rol es requerido'),
});

const UserForm: React.FC<Props> = ({ userId }) => {
  const isEdit = useMemo(() => !!userId, [userId]);
  const methods = useForm<UserFormData>({ resolver: zodResolver(UserSchema), defaultValues });
  const {
    watch: _watch,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { data: user, isLoading: isLoadingUser } = useGetUserQuery(userId!, { skip: !isEdit });
  const [updateUser, { isSuccess: isSuccessUpdate }] = useUpdateUserMutation();
  const [createUser, { isSuccess: isSuccessCreate }] = useCreateUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: roles = [], isLoading: isLoadingRoles } = useGetRolesQuery();
  const [roleOptions, setRoleOptions] = useState<Option[]>([]);

  // console.log(_watch('password'));

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    if (isEdit) {
      const user = UserFormAdapter.updateUser(userId!, data);
      await updateUser(user);
    } else {
      const user = UserFormAdapter.createUser(data);
      await createUser(user);
    }
  };

  const onSuccessUpdate = useCallback(() => {
    dispatch(notification({ message: UserMessages.update, severity: 'success' }));
    navigate('/usuarios');
  }, [dispatch, navigate]);

  const onSuccessCreate = useCallback(() => {
    dispatch(notification({ message: UserMessages.create, severity: 'success' }));
    navigate('/usuarios');
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!isLoadingUser && user) reset({ ...user });
    if (isSuccessUpdate) onSuccessUpdate();
    if (isSuccessCreate) onSuccessCreate();
    if (!isLoadingRoles && roles?.length) setRoleOptions(roles.map(RolesAdapter.option));
  }, [
    isLoadingUser,
    user,
    reset,
    isSuccessUpdate,
    onSuccessUpdate,
    isSuccessCreate,
    onSuccessCreate,
    isLoadingRoles,
    roles,
  ]);

  return (
    <>
      <FormContainer variant='outlined'>
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

              <Box>
                {isLoadingRoles ? (
                  <>
                    <Skeleton variant='text' width='100%' sx={{ fontSize: '1.7rem' }} />
                    <Skeleton variant='text' width='100%' sx={{ fontSize: '1.7rem' }} />
                  </>
                ) : (
                  <RHFMultiCheckbox
                    label='Asignar roles'
                    name='roleNames'
                    options={roleOptions}
                    required={true}
                  />
                )}
              </Box>

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
