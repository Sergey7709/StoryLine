import { Post } from "../common/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initialStateReaderBlogsSlice = {
  dataReaderBlogs: Post[] | undefined;
  pageReaderBlogs: number; //!
};

const initialState: initialStateReaderBlogsSlice = {
  dataReaderBlogs: [],
  pageReaderBlogs: 1, //!
};

export const ReaderBlogsSlice = createSlice({
  name: "ReaderBlogsSlice",
  initialState,
  reducers: {
    setDataReaderBlogs: (state, action: PayloadAction<Post[]>) => {
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
    setPageReaderBlogs: (state, action: PayloadAction<number>) => {
      state.pageReaderBlogs = action.payload;
    }, //!
  },
});

export const { setDataReaderBlogs, updLikeReaderBlog, setPageReaderBlogs } =
  ReaderBlogsSlice.actions;
export default ReaderBlogsSlice.reducer;
