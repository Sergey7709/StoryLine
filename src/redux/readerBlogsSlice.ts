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
    updLikeReaderBlog: (state, action: PayloadAction<number>) => {
      const currentBlog = state.dataReaderBlogs?.find(
        (blog) => blog.id === action.payload
      );
      if (currentBlog) {
        currentBlog.likes += 1;
      }
    },
  },
});

export const { getDataReaderBlogs, updLikeReaderBlog } =
  ReaderBlogsSlice.actions;
export default ReaderBlogsSlice.reducer;
