import { Post } from "../common/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initialStateReaderBlogsSlice = {
  dataReaderBlogs: Post[] | undefined;
};

const initialState: initialStateReaderBlogsSlice = {
  dataReaderBlogs: [],
};

export const ReaderBlogsSlice = createSlice({
  name: "ReaderBlogsSlice",
  initialState,
  reducers: {
    getDataReaderBlogs: (state, action: PayloadAction<Post[]>) => {
      state.dataReaderBlogs = action.payload;
    },
  },
});

export const { getDataReaderBlogs } = ReaderBlogsSlice.actions;
export default ReaderBlogsSlice.reducer;
