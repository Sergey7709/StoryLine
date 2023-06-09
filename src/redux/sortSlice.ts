import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BsPaypal } from "react-icons/bs";

type initialStateSortSlice = {
  categorySort: string;
  sortMinMaxPrice: [number, number];
  maxDiscount: number;
  searchBooksValue: string;
  reset: boolean;
  minPrice: string;
  maxPrice: string;
  paginationPage: number; //!
};

const initialState: initialStateSortSlice = {
  categorySort: "",
  sortMinMaxPrice: [0, 0],
  maxDiscount: 0,
  searchBooksValue: "",
  reset: false,
  minPrice: "",
  maxPrice: "",
  paginationPage: 1, //!
};

const sortSlice = createSlice({
  name: "sortSlice",
  initialState,
  reducers: {
    setCategorySort: (state, action: PayloadAction<string>) => {
      state.categorySort = action.payload;
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
    setMinPrice: (state, action: PayloadAction<string>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<string>) => {
      state.maxPrice = action.payload;
    },
    setReset: (state, action: PayloadAction<boolean>) => {
      state.reset = action.payload;
    },
    setPaginationPage: (state, action: PayloadAction<number>) => {
      state.paginationPage = action.payload;
    }, //!
  },
});

export const {
  setCategorySort,
  setSortMinMaxPrice,
  setMaxDiscount,
  setSearchBooksValue,
  setReset,
  setMinPrice,
  setMaxPrice,
  setPaginationPage, //!
} = sortSlice.actions;
export default sortSlice.reducer;
