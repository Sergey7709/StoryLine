import { PayloadAction } from "@reduxjs/toolkit";
import {
  CartItem,
  InitialStateCartSlice,
  handleChangeCountItemProps,
} from "./types";

export const idOrder = (Number(Date.now()) % 1000) + 100;

export const updateCartTotals = (
  state: InitialStateCartSlice,
  totalPrice: number,
  type: string,
  count = 1
) => {
  switch (type) {
    case "add":
      state.totalCount += 1;
      state.totalPrice = totalPrice;
      break;
    case "increment":
      state.totalCount += 1;
      state.totalPrice += totalPrice;
      break;
    case "decrement":
      state.totalCount -= 1;
      state.totalPrice -= totalPrice;
      break;
    case "handleChange":
      state.totalCount = count;
      state.totalPrice = totalPrice;
      break;
    default:
      break;
  }
};

export const updateLocalStorage = (state: InitialStateCartSlice) => {
  localStorage.setItem("cartItems", JSON.stringify(state));
};

export const findCartItemById = (cartItems: CartItem[], id: number) =>
  cartItems.find((item) => item.id === id);

export const handleChangeTotal = (
  state: InitialStateCartSlice,
  action: PayloadAction<handleChangeCountItemProps>
) => {
  const cartItem = findCartItemById(state.cartItems, action.payload.book.id);

  const cartItemCount = cartItem?.count || 0;
  const cartItemPrice = cartItem?.discount
    ? cartItemCount * cartItem.discount
    : cartItemCount * (cartItem?.price || 0);

  const bookCount = action.payload.count;
  const bookPrice = action.payload.book.discount
    ? action.payload.book.discount * bookCount
    : action.payload.book.price * bookCount;

  const incrementTotalPrice = state.totalPrice - cartItemPrice + bookPrice;

  const incrementTotalCount =
    state.totalCount - (cartItem?.count ?? 0) + action.payload.count;

  return { incrementTotalPrice, incrementTotalCount, cartItem };
};

export const calculatePrice = (item: CartItem) => {
  return item.discount || item.price;
};
