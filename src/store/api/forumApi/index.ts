import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../../baseQuery';

const baseQuery = getBaseQuery('/api');

const forumApi = createApi({
  reducerPath: 'forumApi',
  baseQuery,
  tagTypes: ['Forum'],
  keepUnusedDataFor: 5 * 60,
  refetchOnMountOrArgChange: 30 * 60,
  endpoints: () => ({}),
});

export default forumApi;
