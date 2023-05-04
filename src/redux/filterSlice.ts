import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialStateFilterSlice = {
  param: string;
};
const initialState: InitialStateFilterSlice = {
  param: "all",
};

export const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    currenFilter: (state, action: PayloadAction<string>) => {
      state.param = action.payload;
      console.log(action.payload, state.param);
    },
  },
});

export const { currenFilter } = filterSlice.actions;
export default filterSlice.reducer;
