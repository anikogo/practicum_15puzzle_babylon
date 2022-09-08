import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

type AuthState = {
  data: User | null
};

const slice = createSlice({
  name: 'auth',
  initialState: { data: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: data }: PayloadAction<User | null>,
    ) => ({ ...state, data }),
  },
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.user.data;
