import {
  Grid,
  Card,
  Group,
  Badge,
  Rating,
  ActionIcon,
  Button,
  Image,
  Text,
  Flex,
  Popover,
  Modal,
} from '@mantine/core';
import { FC, useEffect, useState } from 'react';
import { BsBookmarkCheck, BsBookmarkCheckFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Item, User } from '../../common/types';
import { useStyles } from './BooksListStyles';
import { useDisclosure } from '@mantine/hooks';
import PricesDiscount from './UI/PricesDiscount';
import { useAppSelector } from '../../redux/redux.hooks';
import { useMutation } from 'react-query';
import axios from 'axios';
import { BASE_URL } from '../../common/constants';
import { useCurrentUser } from '../../hooks/useCurrenUser';
import { notifications } from '@mantine/notifications';
import { Authorization } from '../authorization/Authorization';

type SingleBookListProps = {
  book: Item;
};
const SingleBookList: FC<SingleBookListProps> = ({ book }) => {
  const { id, discount, reviews, price } = book;
  const { classes } = useStyles();
  const [opened, { close, open }] = useDisclosure(false);

  const [openedAuth, handlers] = useDisclosure(false);

  const getCurrentUser = useCurrentUser();

  const user: User | null = useAppSelector((state) => state.auth.user);

  const isFavorite = user?.favoriteItems.some((el) => el.id === book.id) ?? false;

  const [favoriteBook, setFavoriteBook] = useState<boolean>(isFavorite);

  // useEffect(() => {
  //   // setFavoriteBook(isFavorite);
  //   console.log(
  //     book.id,
  //     "isFavorite:",
  //     isFavorite,
  //     "favoriteBook:",
  //     favoriteBook
  //   );
  // }, [isFavorite]);

  const { mutateAsync } = useMutation(
    (param: string) => {
      console.log('mutate:', param, 'token:', user?.token, user?.favoriteItems);
      return axios.post(`${BASE_URL}${param}`, undefined, {
        headers: {
          Authorization: user?.token ?? '',
        },
      });
    },
    {
      onSuccess: () => {
        if (favoriteBook === false) {
          notifications.show({
            message: 'Книга добавлена в избранное',
            autoClose: 2000,
            color: 'green',
          });
          console.log(' book is favorite');
          getCurrentUser();
          setFavoriteBook(true);
        }
        if (favoriteBook === true) {
          notifications.show({
            message: 'Книга удалена из избранного',
            autoClose: 2000,
            color: 'yellow',
          });
          console.log('book not favorite');
          getCurrentUser();
          setFavoriteBook(false);
        }
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

  const favoritesHandler = async (bookId: number) => {
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
      if (favoriteBook === false) {
        await mutateAsync(`user/favorites/${bookId}`);
      } else if (favoriteBook === true) {
        await mutateAsync(`user/favorites-remove/${bookId}`);
      }
    }
  };

  return (
    <>
      <Modal size={500} opened={openedAuth} onClose={handlers.close} centered>
        <Authorization close={handlers.close} />
      </Modal>
      <Grid.Col xs={6} sm={4} md={4} lg={3} xl={2} className={classes.gridCol}>
        <Card key={id} className={classes.card} shadow="sm" padding="md" radius="md" withBorder>
          <Group position="center">
            <Link to={`/books-list/${id}`}>
              <Image width={'8rem'} height={'12rem'} src={book.itemImageUrl} alt="book img" />
            </Link>
            {discount > 0 && (
              <Badge className={classes.discount} color="orange" variant="filled">
                <Text fz={'md'} fw={500}>{`-${discount}%`}</Text>
              </Badge>
            )}
            <Flex>
              <Rating value={book.averageRate} readOnly />
              <Text ml={5} fz={13} color="dimmed">
                (оценило: {reviews.length})
              </Text>
            </Flex>

            <ActionIcon variant="transparent" className={classes.action_favorite}>
              {favoriteBook === false && (
                <BsBookmarkCheck
                  className={classes.favorite_off}
                  size="4rem"
                  onClick={async () => favoritesHandler(id, user?.token ?? '', 'favorites')}
                />
              )}
              {favoriteBook === true && (
                <BsBookmarkCheckFill
                  className={classes.favorite_on}
                  size="4rem"
                  onClick={() => favoritesHandler(id, user?.token ?? '', 'favorites-remove')}
                />
              )}
            </ActionIcon>
          </Group>
          <Grid mt={10} pl={10} mb={5} gutter={0}>
            <Grid.Col span={12}>
              <Text align="start" size="sm" color="dimmed" lineClamp={1}>
                {book.authorBook}
              </Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Popover width={200} position="bottom" withArrow shadow="md" opened={opened}>
                <Popover.Target>
                  <Text weight={500} lineClamp={1} onMouseEnter={open} onMouseLeave={close}>
                    {book.title}
                  </Text>
                </Popover.Target>
                <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
                  <Text>{book.title}</Text>
                </Popover.Dropdown>
              </Popover>
            </Grid.Col>
          </Grid>
          <Flex justify="space-between">
            <PricesDiscount price={price} discount={discount} />
          </Flex>
          <Button
            className={classes.buy}
            variant="gradient"
            gradient={{ from: 'teal', to: 'blue', deg: 60 }}
            color="blue"
            radius="md"
            w={'12rem'}>
            КУПИТЬ
          </Button>
        </Card>
      </Grid.Col>
    </>
  );
};

export default SingleBookList;
