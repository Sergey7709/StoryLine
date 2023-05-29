import {
  Flex,
  Button,
  ActionIcon,
  NumberInput,
  rem,
  Text,
} from "@mantine/core";
import { FC } from "react";

type CounterButtonProps = {
  cartCount: number;
  handleDecrementClick: () => void;
  handleIncrementClick: () => void;
  handleChangeCount: (value: number | "") => void;
};

export const CounterButton: FC<CounterButtonProps> = (props) => {
  const {
    cartCount,
    handleDecrementClick,
    handleChangeCount,
    handleIncrementClick,
  } = props;

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
