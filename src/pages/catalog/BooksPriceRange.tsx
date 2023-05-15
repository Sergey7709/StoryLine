import { Grid, Group, Input, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';

type PriceRangeProps = {
  onPriceChange: (price: string) => void;
};

const PriceRange = ({ onPriceChange }: PriceRangeProps) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [debouncedMin] = useDebouncedValue(minPrice, 1000);
  const [debouncedMax] = useDebouncedValue(maxPrice, 1000);

  useEffect(() => {
    if (Number(minPrice) > 0 && Number(maxPrice) >= Number(minPrice))
      onPriceChange(`&priceFrom=${debouncedMin}&priceTo=${debouncedMax}`);
  }, [debouncedMin, debouncedMax, minPrice, maxPrice, onPriceChange]);

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.match(/^\d*$/)) {
      setMinPrice(value);
    }
  };
  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.match(/^\d*$/)) {
      setMaxPrice(value);
    }
  };

  const isPriceNotValid =
    minPrice !== '' && maxPrice !== '' && Number(minPrice) >= Number(maxPrice);

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
            value={minPrice}
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
            value={maxPrice}
            onChange={handleMaxPriceChange}
            w={100}
            size="xs"
            placeholder="максимум"
          />
        </Group>
      </Grid.Col>
    </Grid>
  );
};

export default PriceRange;
