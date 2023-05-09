import { Group, Grid } from '@mantine/core';
import { useStyles } from './BooksListStyles';
import { useQuery } from 'react-query';
import { fetchItem } from '../../api/itemsApi';
import { Item, ItemsResponse } from '../../common/types';
import { useAppSelector } from '../../redux/redux.hooks';
import { Loader } from '../../components/loader/Loader';
import { BooksFilter } from './BooksFilter';
import React from 'react';
import SingleBookList from './SingleBookList';
import PriceRange from './BooksPriceRange';
export const BooksList = React.memo(() => {
  const param = useAppSelector((state) => state.filter.param);
  const { data, isLoading } = useQuery<ItemsResponse>(['item', param], () => fetchItem(param));
  const { classes } = useStyles();

  const handlePriceChange = (minPrice: number, maxPrice: number) => {
    console.log('Минимальная цена:', minPrice);
    console.log('Максимальная цена:', maxPrice);
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Grid>
      <Grid.Col span={12}>
        <Group ml={'2%'} mb={5}>
          <BooksFilter />
          <PriceRange onPriceChange={handlePriceChange} />
        </Group>
      </Grid.Col>
      <Grid.Col span={12}>
        <Grid className={classes.grid} align="center">
          {data && data.items.map((book: Item) => <SingleBookList book={book} key={book.id} />)}
        </Grid>
      </Grid.Col>
    </Grid>
  );
});
