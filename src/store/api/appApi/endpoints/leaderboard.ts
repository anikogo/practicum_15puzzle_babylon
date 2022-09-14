import appApi from '..';

const licenseUsersEndpoints = appApi
  .enhanceEndpoints({
    addTagTypes: ['Leaderboard'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      addUser: builder.query({
        query: (body) => ({
          url: '/leaderboard',
          method: 'POST',
          data: body,
        }),
      }),
      getAllUsers: builder.query({
        query: (body) => ({
          url: '/leaderboard/all',
          method: 'POST',
          data: body,
        }),
      }),
      getTeamUsers: builder.query({
        query: ({ body, teamName }) => ({
          url: `/leaderboard/${teamName}`,
          method: 'POST',
          data: body,
        }),
      }),
    }),
  });

export const {
  useAddUserQuery,
  useGetAllUsersQuery,
  useGetTeamUsersQuery,
} = licenseUsersEndpoints;
