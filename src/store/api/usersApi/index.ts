import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '../../baseQuery';

const baseQuery = getBaseQuery('https://ya-praktikum.tech/api/v2/');

const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery,
  tagTypes: ['Users'],
  keepUnusedDataFor: 5 * 60,
  refetchOnMountOrArgChange: 30 * 60,
  endpoints: () => ({}),
});

export default usersApi;
