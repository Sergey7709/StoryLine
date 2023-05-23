import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Review } from "../common/types";

type Item = {
  id: number;
  inStock: boolean;
  title: string;
  itemImageUrl: string;
  description: string;
  price: number;
  category: string;
  publisher: string;
  genre: string;
  pagesCount: number;
  discount: number;
  authorBook: string;
  releaseDate: string;
  reviews: Review[];
  averageRate: number;
  typeOfCover: string;
};

export type CartItem = Item & {
  count: number;
};

type InitialStateCartSlice = {
  cartItems: CartItem[];
};

type handleChangeCountItemProps = {
  id: number;
  count: number;
};

const initialState: InitialStateCartSlice = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addCartItems: (state, action: PayloadAction<Item>) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (cartItem) {
        cartItem.count += 1;
      } else {
        state.cartItems.push({ ...action.payload, count: 1 });
      }
    },
    incrementCartItem: (state, action: PayloadAction<number>) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (cartItem) {
        cartItem.count += 1;
      }
    },

    decrementCartItem: (state, action: PayloadAction<number>) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (cartItem) {
        cartItem.count -= 1;
      }
    },

    handleChangeCountItem: (
      state,
      action: PayloadAction<handleChangeCountItemProps>
    ) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (cartItem) {
        cartItem.count = action.payload.count;
      }
    },

    deleteCartItems: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  addCartItems,
  deleteCartItems,
  incrementCartItem,
  decrementCartItem,
  handleChangeCountItem,
} = cartSlice.actions;
export default cartSlice.reducer;
