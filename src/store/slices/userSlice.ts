import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';

export type AuthState = {
  data: User | null
};

export const initialState: AuthState = {
  data: null,
};

const slice = createSlice({
  name: 'auth',
  initialState: { data: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: data }: PayloadAction<User | null>,
    ) => (data ? {
      ...state,
      data: {
        ...data,
        avatar: data?.avatar ? `https://ya-praktikum.tech/api/v2/resources${data.avatar}` : undefined,
      },
    } : { ...state, data: null }),
  },
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.user.data;
