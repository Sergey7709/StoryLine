import { useState } from "react";
import styles from "./cart.module.css";
import {
  ActionIcon,
  Button,
  Flex,
  NumberInput,
  Text,
  rem,
} from "@mantine/core";
import { useAppDispatch } from "../../redux/redux.hooks";
import {
  decrementCartItem,
  handleChangeCountItem,
  incrementCartItem,
} from "../../redux/cartSlice";

type CartBarProps = {
  bookId?: number;
  cartCount?: number;
};

const CartBar = ({ bookId = 0, cartCount = 1 }: CartBarProps) => {
  const dispatch = useAppDispatch();

  const increment = () => {
    dispatch(incrementCartItem(bookId));
  };

  const decrement = () => {
    if (cartCount > 1) {
      dispatch(decrementCartItem(bookId));
    }
  };

  const handleChangeCount = (value: number | "") => {
    value === ""
      ? dispatch(handleChangeCountItem({ id: bookId, count: 1 }))
      : dispatch(handleChangeCountItem({ id: bookId, count: Number(value) }));
  };

  return (
    <Flex gap="5px">
      <Button size="xs" variant="outline" px={13} onClick={decrement}>
        <Text align="center" fz={"lg"}>
          -
        </Text>
      </Button>
      <ActionIcon
        size={30}
        px={20}
        variant="outline"
        color="indigo.4"
        radius="sm"
      >
        <NumberInput
          hideControls
          color="green"
          variant="unstyled"
          min={1}
          max={100}
          value={cartCount}
          styles={{ input: { width: rem(54), textAlign: "center" } }}
          onChange={handleChangeCount}
        />
      </ActionIcon>

      <Button size="xs" variant="outline" px={11} onClick={increment}>
        <Text align="center" fz={"lg"}>
          +
        </Text>
      </Button>
    </Flex>
  );
};

export default CartBar;
