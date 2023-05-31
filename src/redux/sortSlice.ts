import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initialStateSortSlice = {
  valueSort: string;
  sortMinMaxPrice: [number, number]; //!
  maxDiscount: number;
};

const initialState: initialStateSortSlice = {
  valueSort: "",
  sortMinMaxPrice: [0, 0], //!
  maxDiscount: 0,
};

const sortSlice = createSlice({
  name: "sortSlice",
  initialState,
  reducers: {
    setValueSort: (state, action: PayloadAction<string>) => {
      state.valueSort = action.payload;
    },
    setSortMinMaxPrice: (state, action: PayloadAction<[number, number]>) => {
      state.sortMinMaxPrice = action.payload;
    },
    setMaxDiscount: (state, action: PayloadAction<number>) => {
      state.maxDiscount = action.payload;
    },
  },
});

export const { setValueSort, setSortMinMaxPrice, setMaxDiscount } =
  sortSlice.actions;
export default sortSlice.reducer;
