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
  decrementCartItem,
  handleChangeCountItem,
  incrementCartItem,
} from "../../redux/cartSlice";
import { Item } from "../../common/types";

type CartBarProps = {
  book: Item;
  countBar?: number;
  incrementCountBar?: () => void;
  decrementCountBar?: () => void;
  handleChangeCountBar?: (value: number) => void;
};

const CartBar = ({
  book,
  countBar,
  incrementCountBar,
  decrementCountBar,
  handleChangeCountBar,
}: CartBarProps) => {
  // console.log("bookId", book.id, "cartCount", cartCount);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const item = cartItems.some((item) => item.id === book.id);

  const itemCount = cartItems.find((item) => item.id === book?.id)?.count; //!

  const cartCount = countBar || itemCount || 1; //!

  // console.log("cartCount", cartCount, "countBar", countBar);

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
    <Flex gap="5px">
      <Button
        disabled={cartCount <= 1}
        size="xs"
        variant="outline"
        px={13}
        onClick={handleDecrementClick}
        color="cyan"
      >
        <Text align="center" fz={"lg"}>
          -
        </Text>
      </Button>
      <ActionIcon size={30} px={20} variant="outline" color="cyan">
        <NumberInput
          hideControls
          variant="unstyled"
          min={1}
          max={100}
          value={cartCount}
          styles={{
            input: {
              width: rem(39),
              height: rem(28),
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "bold",
            },
          }}
          onChange={handleChangeCount}
        />
      </ActionIcon>

      <Button
        size="xs"
        variant="outline"
        px={11}
        onClick={handleIncrementClick}
        color="cyan"
      >
        <Text align="center" fz={"lg"}>
          +
        </Text>
      </Button>
    </Flex>
  );
};

export default CartBar;
