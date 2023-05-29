import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  InitialStateCartSlice,
  Item,
  handleChangeCountItemProps,
} from "../common/types";
import {
  handleChangeTotal,
  findCartItemById,
  updateCartTotals,
  updateLocalStorage,
  calculatePrice,
} from "../common/commonFunctions";

const cartItemsFromStorage = localStorage.getItem("cartItems");
const initialStateFromStorage = cartItemsFromStorage
  ? JSON.parse(cartItemsFromStorage)
  : null;

const initialState: InitialStateCartSlice = {
  cartItems: initialStateFromStorage ? initialStateFromStorage.cartItems : [],
  totalCount: initialStateFromStorage ? initialStateFromStorage.totalCount : 0,
  totalPrice: initialStateFromStorage ? initialStateFromStorage.totalPrice : 0,
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addCartItems: (state, action: PayloadAction<Item>) => {
      const { discount, price, id } = action.payload;

      const incrementTotal = state.totalPrice + (discount || price);

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
      updateLocalStorage(state);
    },
    incrementCartItem: (state, action: PayloadAction<number>) => {
      const cartItem = findCartItemById(state.cartItems, action.payload);

      if (cartItem) {
        cartItem.count += 1;
        updateCartTotals(state, calculatePrice(cartItem), "increment");
      }
      updateLocalStorage(state);
    },

    decrementCartItem: (state, action: PayloadAction<number>) => {
      const cartItem = findCartItemById(state.cartItems, action.payload);

      if (cartItem) {
        cartItem.count -= 1;
        updateCartTotals(state, calculatePrice(cartItem), "decrement");
      }
      updateLocalStorage(state);
    },

    handleChangeCountItem: (
      state,
      action: PayloadAction<handleChangeCountItemProps>
    ) => {
      const { incrementTotalPrice, incrementTotalCount, cartItem } =
        handleChangeTotal(state, action);

      if (cartItem) {
        cartItem.count = action.payload.count;
      } else {
        state.cartItems.push({
          ...action.payload.book,
          count: action.payload.count,
        });
      }
      updateCartTotals(
        state,
        incrementTotalPrice,
        "handleChange",
        incrementTotalCount
      );
      updateLocalStorage(state);
    },

    deleteCartItems: (state, action: PayloadAction<number>) => {
      const cartItem = findCartItemById(state.cartItems, action.payload);
      if (cartItem) {
        state.totalCount -= cartItem.count;
        state.totalPrice -=
          cartItem.count * (cartItem.discount || cartItem.price);
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      } else if (action.payload === 0) {
        state.cartItems = [];
        state.totalCount = 0;
        state.totalPrice = 0;
      }

      updateLocalStorage(state);
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
