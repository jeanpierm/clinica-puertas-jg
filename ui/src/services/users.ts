import {
  CreateUserRequest,
  PatchUserRequest,
  User,
  UserResponse,
  UsersResponse,
} from '../models/user';
import { providesList } from './util/providesList';
import { api } from './api';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<UsersResponse, void>({
      query: () => ({ url: 'users' }),
      providesTags: (result) => providesList(result, 'Users'),
    }),
    getUser: build.query<UserResponse, string>({
      query: (id) => ({ url: `users/${id}` }),
      providesTags: (_result, _err, id) => [{ type: 'Users', id }],
    }),
    createUser: build.mutation<User, CreateUserRequest>({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    updateUser: build.mutation<void, PatchUserRequest>({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `users/${id}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    deleteUser: build.mutation<void, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
