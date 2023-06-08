import filter from "./filterSlice";
import auth from "./authSlice";
import cart from "./cartSlice";
import sort from "./sortSlice";
import readerBlogs from "./readerBlogsSlice";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

export const store = configureStore({
  reducer: {
    auth,
    filter,
    cart,
    sort,
    readerBlogs,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
