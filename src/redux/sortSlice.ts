import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initialStateSortSlice = {
  valueSort: string;
  sortMinMaxPrice: [number, number];
  maxDiscount: number;
  searchBooksValue: string;
};

const initialState: initialStateSortSlice = {
  valueSort: "",
  sortMinMaxPrice: [0, 0],
  maxDiscount: 0,
  searchBooksValue: "",
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
    setSearchBooksValue: (state, action: PayloadAction<string>) => {
      state.searchBooksValue = `${action.payload}`;
    },
  },
});

export const {
  setValueSort,
  setSortMinMaxPrice,
  setMaxDiscount,
  setSearchBooksValue,
} = sortSlice.actions;
export default sortSlice.reducer;
