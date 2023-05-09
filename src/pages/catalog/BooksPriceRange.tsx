import { Grid, Group, Input, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';

type PriceRangeProps = {
  onPriceChange: (minPrice: number, maxPrice: number) => void;
};

const PriceRange = ({ onPriceChange }: PriceRangeProps) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [debouncedMin] = useDebouncedValue(minPrice, 300);
  const [debouncedMax] = useDebouncedValue(maxPrice, 300);

  useEffect(() => {
    onPriceChange(Number(minPrice), Number(maxPrice));
  }, [debouncedMin, debouncedMax, onPriceChange, minPrice, maxPrice]);

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.match(/^\d*$/)) {
      setMinPrice(value);
      // onPriceChange(Number(value), Number(maxPrice));
    }
  };
  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.match(/^\d*$/)) {
      setMaxPrice(value);
      // onPriceChange(Number(minPrice), Number(value));
    }
  };

  const isPriceNotValid =
    minPrice !== '' && maxPrice !== '' && Number(minPrice) >= Number(maxPrice);

  return (
    <Grid w={400} justify="start" align="center">
      <Grid.Col>
        <Group noWrap spacing={5}>
          <Text color="violet">Стоимость</Text>
          <Text color="violet">от</Text>
          <Input
            value={minPrice}
            onChange={handleMinPriceChange}
            w={100}
            size="xs"
            placeholder="min"
            error={isPriceNotValid}
          />

          <Text color="violet">до</Text>
          <Input
            value={maxPrice}
            onChange={handleMaxPriceChange}
            w={100}
            size="xs"
            placeholder="max"
          />
        </Group>
      </Grid.Col>
    </Grid>
  );
};

export default PriceRange;
