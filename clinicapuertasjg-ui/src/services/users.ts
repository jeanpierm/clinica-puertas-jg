import {
  CreateUserRequest,
  PatchUserRequest,
  User,
  UserResponse,
  UsersResponse,
} from '../models/user';
import { providesList } from './util/providesList';
import { api } from './api';
import { ID_LIST, TYPE_USERS } from '../constants/users';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => ({ url: 'users' }),
      transformResponse: (res: UsersResponse) => res.result?.users || [],
      providesTags: (result) => providesList(result, TYPE_USERS),
    }),
    getUser: build.query<UserResponse, string>({
      query: (id) => ({ url: `users/${id}` }),
      providesTags: (_result, _err, id) => [{ type: TYPE_USERS, id }],
    }),
    createUser: build.mutation<User, CreateUserRequest>({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: TYPE_USERS, id: ID_LIST }],
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
      invalidatesTags: [{ type: TYPE_USERS, id: ID_LIST }],
    }),
    deleteUser: build.mutation<void, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: TYPE_USERS, id: ID_LIST }],
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
