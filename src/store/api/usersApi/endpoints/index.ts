/* eslint-disable import/prefer-default-export */
import usersApi from '..';

const usersApiEndpoints = usersApi
  .enhanceEndpoints({
    addTagTypes: ['Users'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUsersInfo: builder.query({
        query: (id) => ({
          url: `/user/${id}`,
          method: 'GET',
        }),
        providesTags: ['Users'],
      }),
    }),
  });

export const {
  useGetUsersInfoQuery,
} = usersApiEndpoints;
