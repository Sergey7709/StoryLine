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
} from '@mantine/core';
import { FC, useState } from 'react';
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
import { fetchFavorites } from '../../api/favoritesFecth';
import { Error404 } from '../error404/error404';
import { useCurrentUser } from '../../hooks/useCurrenUser';

type SingleBookListProps = {
  book: Item;
};
const SingleBookList: FC<SingleBookListProps> = ({ book }) => {
  const { id, discount, reviews, price } = book;
  const { classes } = useStyles();
  const [opened, { close, open }] = useDisclosure(false);
  const getCurrentUser = useCurrentUser();
  const [favoriteBook, setFavoriteBook] = useState<boolean>(false);
  const user = useAppSelector((state) => state.auth.user);

  const { mutateAsync, isSuccess, isError, isLoading } = useMutation(
    (args: { id: string; token: string; params: string }) =>
      fetchFavorites(`user/${args.params}/${args.id}`, args.token),
  );
  const favoritesHandler = async (bookId: number, token: string, type: string) => {
    if (!user) {
      return;
    }
    const isFavorite = user.favoriteItems.some((el) => el.id === bookId);
    setFavoriteBook(isFavorite);

    if (!isFavorite) {
      await mutateAsync({ id: bookId.toString(), token, params: type });
      getCurrentUser();
    } else {
      await mutateAsync({ id: bookId.toString(), token, params: type });
      getCurrentUser();
    }
  };

  return (
    <>
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
              {!favoriteBook && (
                <BsBookmarkCheck
                  className={classes.favorite_off}
                  size="4rem"
                  onClick={async () => favoritesHandler(id, user?.token ?? '', 'favorites')}
                />
              )}
              {favoriteBook && (
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
