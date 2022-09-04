import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://ya-praktikum.tech/api/v2/auth' });

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['User'],
  keepUnusedDataFor: 5 * 60,
  refetchOnMountOrArgChange: 30 * 60,
  endpoints: (builder) => ({
    signUp: builder.mutation<void, Omit<User, 'id' | 'display_name'>>({
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),
    signIn: builder.mutation<void, { login: string, password: string }>({
      query: (body) => ({
        url: '/signin',
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),
    getUser: builder.mutation<User, void>({
      query: () => ({
        url: '/user',
        method: 'GET',
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useGetUserMutation,
  useSignOutMutation,
} = authApi;

export default authApi;
