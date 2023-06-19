import { useAppDispatch, useAppSelector } from "../../redux/redux.hooks";
import {
  decrementCartItem,
  handleChangeCountItem,
  incrementCartItem,
} from "../../redux/cartSlice";
import { CartBarProps } from "../../common/types";
import { FC } from "react";
import { CounterButton } from "./CounterButton";

export const CartCount: FC<CartBarProps> = ({
  book,
  countBar,
  incrementCountBar,
  decrementCountBar,
  handleChangeCountBar,
}) => {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const item = cartItems.some((item) => item.id === book.id);

  const itemCount = cartItems.find((item) => item.id === book?.id)?.count;

  const cartCount = countBar || itemCount || 1;

  const handleIncrementClick = () => {
    if (incrementCountBar) {
      incrementCountBar();
      console.log("incrementCountBar");
    } else {
      dispatch(incrementCartItem(book.id));
    }
  };

  const handleDecrementClick = () => {
    if (decrementCountBar) {
      decrementCountBar();
    } else if (cartCount > 1) {
      dispatch(decrementCartItem(book.id));
    }
  };

  const handleChangeCount = (value: number | "") => {
    if (!countBar && item) {
      dispatch(
        handleChangeCountItem({
          book,
          count: Number(value) < 1 || "" ? 1 : Number(value),
        })
      );
    } else if (handleChangeCountBar) {
      handleChangeCountBar(Number(value) < 1 || "" ? 1 : Number(value));
    }
  };

  return (
    <>
      <CounterButton
        cartCount={cartCount}
        handleDecrementClick={handleDecrementClick}
        handleIncrementClick={handleIncrementClick}
        handleChangeCount={handleChangeCount}
      />
    </>
  );
};
