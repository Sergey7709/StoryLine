import { Group, Grid, RangeSlider } from '@mantine/core';
import { useStyles } from './BooksListStyles';
import { useQuery } from 'react-query';
import { fetchItem } from '../../api/itemsApi';
import { Item, ItemsResponse } from '../../common/types';
import { useAppSelector } from '../../redux/redux.hooks';
import { Loader } from '../../components/loader/Loader';
import { BooksFilter } from './BooksFilter';
import SingleBookList from './SingleBookList';

export const BooksList = () => {
  const param = useAppSelector((state) => state.filter.param);
  const { data, isLoading } = useQuery<ItemsResponse>(['item', param], () => fetchItem(param));
  const { classes } = useStyles();
  if (isLoading) {
    return <Loader />;
  }
  console.log(data);
  return (
    <Grid>
      <Group ml={'20%'} mt={20}>
        <BooksFilter />
        <RangeSlider w={200} size="md" color="green" min={0} max={2000} />
      </Group>
      <Grid className={classes.grid} align="center">
        {data && data.items.map((book: Item) => <SingleBookList book={book} key={book.id} />)}
      </Grid>
    </Grid>
  );
};
