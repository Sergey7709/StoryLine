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
} from "../../redux/sortSlice";

const PriceRange = () => {
  const { reset, minPrice, maxPrice } = useAppSelector((state) => state.sort);

  const dispatch = useDispatch();

  const [min, setMin] = useState(minPrice);
  const [max, setMax] = useState(maxPrice);

  const [debouncedMin] = useDebouncedValue(min, 1000);
  const [debouncedMax] = useDebouncedValue(max, 1000);

  const isPriceNotValid =
    min !== "" && max !== "" && Number(min) >= Number(max);

  useEffect(() => {
    if (reset) {
      dispatch(setReset(false));
    } else if (Number(min) > 0 && Number(max) >= Number(min)) {
      min !== "" && dispatch(setMinPrice(debouncedMin));
      max !== "" && dispatch(setMaxPrice(debouncedMax)); //!!!
    }
  }, [debouncedMin, debouncedMax, reset]);

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.match(/^\d*$/)) {
      setMin(value);
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.match(/^\d*$/)) {
      setMax(value);
    }
  };

  const handleReset = () => {
    setMin("");
    setMax("");
    dispatch(setMinPrice(""));
    dispatch(setMaxPrice(""));
    dispatch(setReset(true));
    dispatch(setCategorySort(""));
  };

  return (
    <Grid w={400} justify="start" align="center">
      <Grid.Col>
        <Group noWrap spacing={5}>
          <Text tt="uppercase" size="sm" color="blue" weight={400}>
            Стоимость
          </Text>
          <Text tt="uppercase" size="sm" color="blue" weight={400}>
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

          <Text tt="uppercase" size="sm" color="blue" weight={400}>
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
