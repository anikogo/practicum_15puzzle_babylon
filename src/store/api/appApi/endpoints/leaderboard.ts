import appApi from '..';

type TeamUsersQueryParams = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

const leaderboardEndpoints = appApi
  .enhanceEndpoints({
    addTagTypes: ['Leaderboard'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      addUser: builder.mutation({
        query: (body) => ({
          url: '/leaderboard',
          method: 'POST',
          data: body,
        }),
      }),
      getAllUsers: builder.query<User & { score: number; }, TeamUsersQueryParams>({
        query: (body) => ({
          url: '/leaderboard/all',
          method: 'POST',
          data: body,
        }),
      }),
      getTeamUsers: builder.mutation<LeaderboardApiResponse, TeamUsersQueryParams>({
        query: (data) => ({
          url: '/leaderboard/babylon',
          method: 'POST',
          data,
        }),
        invalidatesTags: ['Leaderboard'],
      }),
    }),
  });

export const {
  useAddUserMutation,
  useGetAllUsersQuery,
  useGetTeamUsersMutation,
} = leaderboardEndpoints;
