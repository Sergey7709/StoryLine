import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { useMutation } from 'react-query';
import { BASE_URL } from '../../common/constants';
import { useCurrentUser } from '../../hooks/useCurrenUser';
import { useAppSelector } from '../../redux/redux.hooks';
import { Grid } from '@mantine/core';
import SingleBookList from '../catalog/SingleBookList';
import EmptyData from '../userAccount/assetsUserAccount/EmptyData';

export const Favorites = () => {
  const user = useAppSelector((state) => state.auth.user);
  const getCurrentUser = useCurrentUser();
  const { mutateAsync, isSuccess } = useMutation(
    (param: string) => {
      return axios.post(`${BASE_URL}${param}`, undefined, {
        headers: {
          Authorization: user?.token ?? '',
        },
      });
    },
    {
      onSuccess: () => {},
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
      getCurrentUser();
    }
  };
  return (
    <>
      {user?.favoriteItems.length ? (
        <Grid>
          {user?.favoriteItems.map((book) => (
            <SingleBookList book={book} favorite={true} favoritesHandler={favoritesHandler} />
          ))}
        </Grid>
      ) : (
        <EmptyData text="У вас нет избранных товаров" />
      )}
    </>
  );
};
