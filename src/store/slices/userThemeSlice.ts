import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ThemeState = {
  theme: string;
};

const slice = createSlice({
  name: 'theme',
  initialState: {
    theme: 'light',
  } as ThemeState,
  reducers: {
    setTheme: (
      state,
      { payload: theme }: PayloadAction<string>,
    ) => ({ ...state, theme }),
  },
});

export const { setTheme } = slice.actions;

export default slice.reducer;
