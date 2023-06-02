import { Button, Grid, Group, Input, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { useAppSelector } from "../../redux/redux.hooks";
import { useDispatch } from "react-redux";
import {
  setMaxPrice,
  setMinPrice,
  setReset,
  setCategorySort,
  setSearchBooksValue,
} from "../../redux/sortSlice";

// type PriceRangeProps = {
//   handlePriceChange: (priceMin: number, priceMax: number) => void;
// };

// const PriceRange = ({ handlePriceChange }: PriceRangeProps) => {
const PriceRange = () => {
  const { reset, minPrice, maxPrice } = useAppSelector((state) => state.sort); //!
  const dispatch = useDispatch(); //!

  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  // const [reset, setReset] = useState(false);
  const [debouncedMin] = useDebouncedValue(min, 1000);
  const [debouncedMax] = useDebouncedValue(max, 1000);

  useEffect(() => {
    if (reset) {
      setMin("");
      setMax("");
      // dispatch(setMinPrice("")); //!
      // dispatch(setMaxPrice("")); //!
      // handlePriceChange(0, 100000000);
      // setReset(false);
      dispatch(setReset(false));
    } else {
      console.log("dispatch");
      // handlePriceChange(Number(debouncedMin), Number(debouncedMax));
      dispatch(setMinPrice(debouncedMin));
      dispatch(setMaxPrice(debouncedMax));
    }
  }, [debouncedMin, debouncedMax, reset]);

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.match(/^\d*$/)) {
      setMin(value);
      // dispatch(setMinPrice(value)); //!
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.match(/^\d*$/)) {
      setMax(value);
      // dispatch(setMaxPrice(value)); //!
    }
  };

  const handleReset = () => {
    // setReset(true);
    dispatch(setMinPrice(""));
    dispatch(setMaxPrice(""));
    dispatch(setReset(true)); //!
    dispatch(setCategorySort("")); //!
    // dispatch(setSearchBooksValue(""));
  };

  const isPriceNotValid =
    minPrice !== "" && maxPrice !== "" && Number(minPrice) >= Number(maxPrice);

  return (
    <Grid w={400} justify="start" align="center">
      <Grid.Col>
        <Group noWrap spacing={5}>
          <Text size="md" color="blue" weight={400}>
            Стоимость
          </Text>
          <Text size="md" color="blue" weight={400}>
            от
          </Text>
          <Input
            value={min}
            onChange={handleMinPriceChange}
            w={100}
            size="xs"
            placeholder="минимум"
            error={isPriceNotValid}
          />

          <Text size="md" color="blue" weight={400}>
            до
          </Text>
          <Input
            value={max}
            onChange={handleMaxPriceChange}
            w={100}
            size="xs"
            placeholder="максимум"
          />

          <Button
            onClick={handleReset}
            size="xs"
            variant="gradient"
            gradient={{ from: "red", to: "violet", deg: 60 }}
          >
            Сбросить
          </Button>
        </Group>
      </Grid.Col>
    </Grid>
  );
};

export default PriceRange;
