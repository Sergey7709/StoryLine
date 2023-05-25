import {
  ActionIcon,
  Button,
  Flex,
  NumberInput,
  Text,
  rem,
} from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../redux/redux.hooks";
import {
  addCartItems,
  decrementCartItem,
  handleChangeCountItem,
  incrementCartItem,
} from "../../redux/cartSlice";
import { Item } from "../../common/types";

type CartBarProps = {
  book: Item;
  cartCount: number | undefined;
};

const CartBar = ({ book, cartCount = 0 }: CartBarProps) => {
  // console.log("bookId", book.id, "cartCount", cartCount);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const item = cartItems.some((item) => item.id === book.id);

  const increment = () => {
    console.log("incr", "item", item);
    item ? dispatch(incrementCartItem(book.id)) : dispatch(addCartItems(book));
  };

  const decrement = () => {
    if (cartCount > 1) {
      dispatch(decrementCartItem(book.id));
    }
  };

  const handleChangeCount = (value: number | "") => {
    if (!item) {
      dispatch(handleChangeCountItem({ book, count: Number(value) }));
    } else {
      dispatch(handleChangeCountItem({ book, count: Number(value) }));
    }
  };

  return (
    <Flex gap="5px">
      <Button
        disabled={cartCount <= 1}
        size="xs"
        variant="outline"
        px={13}
        onClick={decrement}
      >
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
