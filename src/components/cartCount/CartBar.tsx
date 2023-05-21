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

const CartBar = () => {
  const [quantity, setQuantity] = useState<number>(1);

  const increment = () => {
    setQuantity((prevQuantity: number) => prevQuantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity: number) => prevQuantity - 1);
    }
  };

  const handleQuantityChange = (value: number | "") => {
    setQuantity(value === "" ? 1 : Number(value));
  };

  return (
    // <div className="cart">
    <Flex gap="5px" justify={"center"}>
      <Button size="xs" variant="outline" px={13} onClick={decrement}>
        <Text align="center" fz={"lg"}>
          -
        </Text>
      </Button>
      <ActionIcon size={30} px={20} variant="outline" color="blue" radius="sm">
        <NumberInput
          hideControls
          color="green"
          variant="unstyled"
          min={1}
          max={100}
          value={quantity}
          styles={{ input: { width: rem(54), textAlign: "center" } }}
          onChange={handleQuantityChange}
        />
      </ActionIcon>

      <Button size="xs" variant="outline" px={11} onClick={increment}>
        <Text align="center" fz={"lg"}>
          +
        </Text>
      </Button>
    </Flex>
    // </div>
  );
};

export default CartBar;
