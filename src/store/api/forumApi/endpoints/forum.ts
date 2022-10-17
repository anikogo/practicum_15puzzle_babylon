import forumApi from '..';

const licenseForumEndpoints = forumApi
  .enhanceEndpoints({
    addTagTypes: ['Forum'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      postTopic: builder.mutation({
        query: (body) => ({
          url: '/topics/add',
          method: 'POST',
          data: body,
        }),
        invalidatesTags: ['Forum'],
      }),
      getTopics: builder.query({
        query: () => ({
          url: '/topics',
          method: 'GET',
          // data: body,
        }),
        providesTags: ['Forum'],
      }),
      getComments: builder.query({
        query: (body) => ({
          url: '/comments',
          method: 'GET',
          data: body,
        }),
      }),
      getTopic: builder.query({
        query: (path) => ({
          url: path,
          method: 'GET',
        }),
      }),
      patchTopic: builder.mutation({
        query: (body) => ({
          url: '/topics/edit',
          method: 'PATCH',
          data: body,
        }),
        invalidatesTags: (_result, _error, arg) => [{ type: 'Forum', id: arg.id }],
      }),
      patchComment: builder.mutation({
        query: (body) => ({
          url: '/comments/edit',
          method: 'PATCH',
          data: body,
        }),
      }),
      deleteTopic: builder.mutation({
        query: (id) => ({
          url: `/topics/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Forum'],
      }),
      deleteComment: builder.mutation({
        query: (id) => ({
          url: `/comments/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Forum'],
      }),
      postLike: builder.mutation({
        query: (body) => ({
          url: '/likes/add',
          method: 'POST',
          data: body,
        }),
        invalidatesTags: ['Forum'],
      }),
      getLikes: builder.query({
        query: (body) => ({
          url: `/likes/${body.comment_id}`,
          method: 'GET',
          data: body,
        }),
        providesTags: ['Forum'],
      }),
      deleteLike: builder.mutation({
        query: (id) => ({
          url: `/likes/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Forum'],
      }),
      postComment: builder.mutation({
        query: (body) => ({
          url: '/comments/add',
          method: 'POST',
          data: body,
        }),
        invalidatesTags: ['Forum'],
      }),
    }),
  });

export const {
  usePostTopicMutation,
  usePatchTopicMutation,
  useGetTopicsQuery,
  useGetTopicQuery,
  useGetLikesQuery,
  useDeleteTopicMutation,
  usePostCommentMutation,
  usePatchCommentMutation,
  useGetCommentsQuery,
  useDeleteCommentMutation,
  useDeleteLikeMutation,
  usePostLikeMutation,
} = licenseForumEndpoints;
