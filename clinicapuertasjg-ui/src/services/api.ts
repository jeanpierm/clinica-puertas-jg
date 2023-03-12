import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { errorNotification } from '../redux/slices/notificationSlice';
import { isError } from '../utils/isError';

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

// const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   UnknownAsyncThunkAction,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);
//   if (result.error && result.error.status === 401) {
//     // try to get a new token
//     const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
//     if (refreshResult.data) {
//       // store the new token
//       api.dispatch(accessToken(refreshResult.data));
//       // retry the initial query
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(loggedOut());
//     }
//   }
//   return result;
// };

const baseQueryWithErrorHandler: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    const data = result.error.data;
    const message = isError(data) ? data.error : JSON.stringify(data);
    api.dispatch(errorNotification(message));
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithErrorHandler,
  tagTypes: ['Users', 'Roles'],
  // the endpoints are injected in the other files (user.ts, etc)
  endpoints: () => ({}),
});
