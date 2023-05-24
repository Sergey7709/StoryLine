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
  totalCount: number;
  totalPrice: number;
};

type handleChangeCountItemProps = {
  id: number;
  count: number;
};

const initialState: InitialStateCartSlice = {
  cartItems: [],
  totalCount: 0,
  totalPrice: 0,
};

const calculatePrice = (item: CartItem) => {
  return item.discount || item.price;
};

const findCartItemById = (cartItems: CartItem[], id: number) =>
  cartItems.find((item) => item.id === id);

const updateCartTotals = (
  state: InitialStateCartSlice,
  price: number,
  type: string
) => {
  switch (type) {
    case "add":
      state.totalCount += 1;
      state.totalPrice = price;
      break;
    case "increment":
      state.totalCount += 1;
      state.totalPrice += price;
      break;
    case "decrement":
      state.totalCount -= 1;
      state.totalPrice -= price;
      break;
    default:
      break;
  }
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addCartItems: (state, action: PayloadAction<Item>) => {
      const { discount, price, id } = action.payload;

      const incrementTotal = state.totalPrice + (discount ? discount : price);

      const cartItem = findCartItemById(state.cartItems, id);

      if (cartItem) {
        cartItem.count += 1;
        updateCartTotals(state, incrementTotal, "add");
      } else {
        state.cartItems.push({
          ...action.payload,
          count: 1,
        });
        updateCartTotals(state, incrementTotal, "add");
      }
    },
    incrementCartItem: (state, action: PayloadAction<number>) => {
      const cartItem = findCartItemById(state.cartItems, action.payload);

      if (cartItem) {
        cartItem.count += 1;
        updateCartTotals(state, calculatePrice(cartItem), "increment");
      }
    },

    decrementCartItem: (state, action: PayloadAction<number>) => {
      const cartItem = findCartItemById(state.cartItems, action.payload);

      if (cartItem) {
        cartItem.count -= 1;
        updateCartTotals(state, calculatePrice(cartItem), "decrement");
      }
    },

    handleChangeCountItem: (
      state,
      action: PayloadAction<handleChangeCountItemProps>
    ) => {
      const cartItem = findCartItemById(state.cartItems, action.payload.id);
      if (cartItem) {
        cartItem.count = action.payload.count;
      }
    },

    deleteCartItems: (state, action: PayloadAction<number>) => {
      const cartItem = findCartItemById(state.cartItems, action.payload);
      if (cartItem) {
        state.totalCount -= cartItem.count;
        state.totalPrice -=
          cartItem.count * (cartItem.discount || cartItem.price);
      }

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
