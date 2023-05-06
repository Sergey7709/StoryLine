import { useState } from "react";
import styles from "./cart.module.css";
import { Button, Text } from "@mantine/core";

interface CartProps {
  initialQuantity: number;
}

const CartBar = () => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    // <div className="cart">
    <Button.Group>
      <Button variant="outline" onClick={decrement}>
        -
      </Button>
      <Button variant="outline">
        <Text align="center" w={12}>
          {quantity}
        </Text>
      </Button>
      <Button variant="outline" onClick={increment}>
        +
      </Button>
    </Button.Group>
    // </div>
  );
};

export default CartBar;
