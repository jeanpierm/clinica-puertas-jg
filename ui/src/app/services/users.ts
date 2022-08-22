import { User } from '../../features/dashboard/interfaces/user';
import { providesList } from '../../utils/providesList';
import { api } from './api';

type UsersResponse = User[];

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<UsersResponse, void>({
      query: () => ({ url: 'users' }),
      providesTags: (result) => providesList(result, 'Users'),
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
