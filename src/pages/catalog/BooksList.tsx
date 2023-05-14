import { Group, Grid, Modal } from '@mantine/core';
import { useStyles } from './BooksListStyles';
import { useMutation, useQuery } from 'react-query';
import { fetchItem } from '../../api/itemsApi';
import { Item, ItemsResponse, User } from '../../common/types';
import { useAppSelector } from '../../redux/redux.hooks';
import { Loader } from '../../components/loader/Loader';
import { BooksFilter } from './BooksFilter';
import SingleBookList from './SingleBookList';
import PriceRange from './BooksPriceRange';
import React, { useState } from 'react';
import { ServerError } from '../../components/errorNetwork/ServerError';
import { useCurrentUser } from '../../hooks/useCurrenUser';
import axios from 'axios';
import { BASE_URL } from '../../common/constants';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { Authorization } from '../authorization/Authorization';

export const BooksList = React.memo(() => {
  const getCurrentUser = useCurrentUser(); //!
  const user: User | null = useAppSelector((stateAuth) => stateAuth.auth.user); //!
  const [openedAuth, handlers] = useDisclosure(false); //!

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

  // console.log(priceSort);

  //!----
  const { mutateAsync, isSuccess } = useMutation(
    (param: string) => {
      // console.log("mutate:", param, "token:", user?.token, user?.favoriteItems);
      return axios.post(`${BASE_URL}${param}`, undefined, {
        headers: {
          Authorization: user?.token ?? '',
        },
      });
    },
    {
      onSuccess: () => {
        getCurrentUser();
      },
      onError: () => {
        notifications.show({
          message: 'Ошибка при добавлении книги в избранное!',
          autoClose: 2000,
          color: 'red',
        });
      },
    },
  );

  const favoritesHandler = async (bookId: number, favorite: boolean) => {
    if (!user) {
      notifications.show({
        message: 'Войдите в аккаунт, что бы добавить книгу в избранное!',
        autoClose: 5000,
        color: 'red',
        fz: 'md',
      });
      handlers.open();
      return;
    }

    if (user?.token) {
      if (favorite === false) {
        await mutateAsync(`user/favorites/${bookId}`);
        isSuccess &&
          notifications.show({
            message: 'Книга добавлена в избранное',
            autoClose: 2000,
            color: 'green',
          });
      } else if (favorite === true) {
        await mutateAsync(`user/favorites-remove/${bookId}`);
        isSuccess &&
          notifications.show({
            message: 'Книга удалена из избранного',
            autoClose: 2000,
            color: 'yellow',
          });
      }
    }
  };

  const books = data?.items.map((book: Item) => (
    <SingleBookList
      favorite={user?.favoriteItems.some((el) => el.id === book.id) ?? false}
      book={book}
      key={book.id}
      favoritesHandler={favoritesHandler}
    />
  ));

  //!---

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

  console.log('render BookList');
  console.log(user?.favoriteItems);

  return (
    <Grid>
      <Modal size={500} opened={openedAuth} onClose={handlers.close} centered>
        <Authorization close={handlers.close} />
      </Modal>
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
          {data && books}
        </Grid>
      </Grid.Col>
    </Grid>
  );
});
