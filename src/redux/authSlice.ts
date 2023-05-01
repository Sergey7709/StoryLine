import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post, User } from '../common/types';
type InitialStateUserSlice = {
  user: User | null;
  isAuth: boolean;
};
const initialState: InitialStateUserSlice = {
  user: null,
  isAuth: false,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    userReceived: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuth = !!action.payload;
    },
    updateUserPosts: (state, action: PayloadAction<Post[]>) => {
      if (state.user) state.user.posts = action.payload;
    },
  },
});

export const { userReceived, updateUserPosts } = userSlice.actions;
export default userSlice.reducer;
