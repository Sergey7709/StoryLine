import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  CartItem,
  InitialStateCartSlice,
  Item,
  handleChangeCountItemProps,
} from "../common/types";
import { updateCartTotals, updateLocalStorage } from "../common/constants";

const initialStateFromStorage = JSON.parse(
  localStorage.getItem("cartItems") ?? "null"
);

const initialState: InitialStateCartSlice = {
  cartItems: initialStateFromStorage ? initialStateFromStorage.cartItems : [],
  totalCount: initialStateFromStorage ? initialStateFromStorage.totalCount : 0,
  totalPrice: initialStateFromStorage ? initialStateFromStorage.totalPrice : 0,
};

const calculatePrice = (item: CartItem) => {
  return item.discount || item.price;
};

const findCartItemById = (cartItems: CartItem[], id: number) =>
  cartItems.find((item) => item.id === id);

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
      // const cartItem = findCartItemById(state.cartItems, action.payload.id);
      // if (cartItem) {
      //   cartItem.count = action.payload.count;
      // }
      // updateLocalStorage(state);

      const cartItem = findCartItemById(
        state.cartItems,
        action.payload.book.id
      ); //!

      const cartItemCount = cartItem?.count || 0;
      const cartItemPrice = cartItem?.discount
        ? cartItemCount * cartItem.discount
        : cartItemCount * (cartItem?.price || 0);

      const bookCount = action.payload.count;
      const bookPrice = action.payload.book.discount
        ? action.payload.book.discount * bookCount
        : action.payload.book.price * bookCount;

      const incrementTotalPrice = state.totalPrice - cartItemPrice + bookPrice; //!

      const incrementTotalCount =
        state.totalCount - (cartItem?.count ?? 0) + action.payload.count;

      if (cartItem) {
        cartItem.count = action.payload.count;
        updateCartTotals(
          state,
          incrementTotalPrice,
          "handleChange",
          // action.payload.count
          incrementTotalCount //!
        ); //!
        updateLocalStorage(state); //!
      } else {
        state.cartItems.push({
          ...action.payload.book,
          count: action.payload.count,
        });
        updateCartTotals(
          state,
          incrementTotalPrice,
          "handleChange",
          action.payload.count
        ); //!
        updateLocalStorage(state); //!
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
