/* eslint-disable import/prefer-default-export */
import oauthApi from '..';

const oauthApiEndpoints = oauthApi
  .enhanceEndpoints({
    addTagTypes: ['Users'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getServiceId: builder.query<{ service_id: string }, string>({
        query: (redirect_uri) => ({
          url: '/service-id',
          method: 'GET',
          params: { redirect_uri },
        }),
      }),
      sendCode: builder.mutation<void, { code: string; redirect_uri: string }>({
        query: (data) => ({
          url: '',
          method: 'POST',
          data,
        }),
      }),
    }),
  });

export const {
  useGetServiceIdQuery,
  useSendCodeMutation,
} = oauthApiEndpoints;
