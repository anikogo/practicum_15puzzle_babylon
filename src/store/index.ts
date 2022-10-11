import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { appApi, authApi } from './api';
import userReducer from './slices/userSlice';
import gameStatsReducer from './slices/gameStatsSlice';

export * from './api/appApi/endpoints';
export * from './api/authApi/endpoints';
export * from './slices';

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    user: userReducer,
    gameStats: gameStatsReducer,
    [appApi.reducerPath]: appApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(appApi.middleware, authApi.middleware),
});

export default store;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
