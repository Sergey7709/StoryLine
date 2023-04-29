import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../common/types';
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
  },
});

export const { userReceived } = userSlice.actions;
export default userSlice.reducer;
