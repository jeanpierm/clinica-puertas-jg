import { RolesResponse } from '../models/role';
import { providesList } from './util/providesList';
import { api } from './api';

export const rolesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRoles: build.query<RolesResponse, void>({
      query: () => ({ url: 'roles' }),
      providesTags: (result) => providesList(result, 'Roles'),
    }),
  }),
});

export const { useGetRolesQuery } = rolesApi;
