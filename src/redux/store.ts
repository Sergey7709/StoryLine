import filter from "./filterSlice";
import { configureStore } from "@reduxjs/toolkit";

import auth from "./authSlice";
export const store = configureStore({
  reducer: {
    auth,
    filter,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
