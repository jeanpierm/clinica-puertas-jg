import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers) => {
    const jwt = localStorage.getItem('accessToken');
    if (jwt) {
      headers.set('Authorization', `Bearer ${jwt}`);
    }
    return headers;
  },
});

export const api = createApi({
  // reducerPath: 'requireAuthApis',
  baseQuery,
  tagTypes: ['Users', 'User'],
  endpoints: () => ({}),
});
