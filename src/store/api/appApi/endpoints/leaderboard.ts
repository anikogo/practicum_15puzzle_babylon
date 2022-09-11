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
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        }),
      }),
      getAllUsers: builder.query({
        query: (body) => ({
          url: '/leaderboard/all',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        }),
      }),
      getTeamUsers: builder.query({
        query: ({ body, teamName }) => ({
          url: `/leaderboard/${teamName}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        }),
      }),
    }),
  });

export const {
  useAddUserQuery,
  useGetAllUsersQuery,
  useGetTeamUsersQuery,
} = licenseUsersEndpoints;
