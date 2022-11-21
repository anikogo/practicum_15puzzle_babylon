import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type GameStatsState = {
  moves: number;
  time: number;
};

const slice = createSlice({
  name: 'stats',
  initialState: {
    moves: 0,
    time: 0,
  } as GameStatsState,
  reducers: {
    setMovesCount: (
      state,
      { payload: moves }: PayloadAction<number>,
    ) => ({ ...state, moves }),
    setTime: (
      state,
      { payload: time }: PayloadAction<number>,
    ) => ({ ...state, time }),
  },
});

export const { setMovesCount, setTime } = slice.actions;

export default slice.reducer;
