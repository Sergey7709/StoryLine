import { Group, Grid } from '@mantine/core';
import { useStyles } from './BooksListStyles';
import { useQuery } from 'react-query';
import { fetchItem } from '../../api/itemsApi';
import { Item, ItemsResponse } from '../../common/types';
import { useAppSelector } from '../../redux/redux.hooks';
import { Loader } from '../../components/loader/Loader';
import { BooksFilter } from './BooksFilter';
import SingleBookList from './SingleBookList';
import PriceRange from './BooksPriceRange';
import React, { useState } from 'react';
import { ServerError } from '../../components/errorNetwork/ServerError';

export const BooksList = React.memo(() => {
  const [value, setValue] = useState('');
  const [priceSort, setPriceSort] = useState('');
  const param = useAppSelector((state) => state.filter.param);
  const { classes } = useStyles();
  const categoryNewBooks = 'all?sortBy=releaseDate&sortOrder=desc&limit=8';

  const sortLink = param === categoryNewBooks ? categoryNewBooks : param;

  const { data, isLoading, isLoadingError } = useQuery<ItemsResponse>(
    ['item', param, value, priceSort],
    () => fetchItem(`${sortLink}${value}${priceSort}`),
  );

  const sortHandler = (value: string) => {
    setValue(value);
  };

  const handlePriceChange = (price: string) => {
    setPriceSort(price);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isLoadingError) {
    return <ServerError />;
  }

  return (
    <Grid>
      <Grid.Col span={12}>
        <Group ml={'2%'} mb={5}>
          {param !== categoryNewBooks && (
            <>
              <BooksFilter sortHandler={sortHandler} />
              <PriceRange onPriceChange={handlePriceChange} />
            </>
          )}
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
