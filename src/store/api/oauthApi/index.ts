import createApi from '../../createApi';

import { getBaseQuery } from '../../baseQuery';

const baseQuery = getBaseQuery('https://ya-praktikum.tech/api/v2/oauth/yandex/');

const oauthApi = createApi({
  reducerPath: 'oauthApi',
  baseQuery,
  tagTypes: ['Users'],
  keepUnusedDataFor: 5 * 60,
  refetchOnMountOrArgChange: 30 * 60,
  endpoints: () => ({}),
});

export default oauthApi;
