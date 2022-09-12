import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://ya-praktikum.tech/api/v2/' });

const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery,
  keepUnusedDataFor: 5 * 60,
  refetchOnMountOrArgChange: 30 * 60,
  endpoints: () => ({}),
});

export default appApi;
