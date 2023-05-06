import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialStateFilterSlice = {
  param: string;
};
const initialState: InitialStateFilterSlice = {
  param: 'all',
};

export const filterSlice = createSlice({
  name: 'filterSlice',
  initialState,
  reducers: {
    currentFilter: (state, action: PayloadAction<string>) => {
      state.param = action.payload;
    },
  },
});

export const { currentFilter } = filterSlice.actions;
export default filterSlice.reducer;
