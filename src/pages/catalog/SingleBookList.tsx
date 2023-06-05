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
  Tooltip,
  ThemeIcon,
  HoverCard,
  UnstyledButton,
} from "@mantine/core";
import React, { FC, useCallback, useEffect, useState } from "react";
import { BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Item } from "../../common/types";
import { useStyles } from "./BooksListStyles";
import PricesDiscount from "./UI/PricesDiscount";
import { useAppDispatch } from "../../redux/redux.hooks";
import { addCartItems } from "../../redux/cartSlice";
import {
  GiBookmark,
  GiBookmarklet,
  GiBurningBook,
  GiChainedHeart,
} from "react-icons/gi";
import { useDisclosure } from "@mantine/hooks";

type SingleBookListProps = {
  book: Item;
  favorite: boolean;
  favoritesChange: (bookId: number, favorite: boolean) => void;
};
const SingleBookList: FC<SingleBookListProps> = React.memo(
  ({ book, favorite, favoritesChange }) => {
    const [favoriteState, setFavoriteState] = useState(favorite);

    const dispatch = useAppDispatch();

    const [opened, { close, open }] = useDisclosure(false);

    const handleFavoritesChange = useCallback(() => {
      setFavoriteState(!favoriteState);
      favoritesChange(book.id, favoriteState);
    }, [book.id, favoriteState, favoritesChange]);

    const handleAddCartItem = () => {
      // console.log("Добавлен товар в корзину", book);
      dispatch(addCartItems(book));
    };

    const { id, discount, reviews, price } = book;
    const { classes } = useStyles();

    useEffect(() => {
      setFavoriteState(favorite);
    }, [favorite]);

    console.log("render single");

    return (
      <>
        <Grid.Col
          xs={6}
          sm={4}
          md={4}
          lg={3}
          xl={2}
          className={classes.gridCol}
        >
          <Card
            key={id}
            className={classes.card}
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
          >
            <Group position="center">
              <Link to={`/book-card/${id}`}>
                <Image
                  width={"8rem"}
                  height={"12rem"}
                  src={book.itemImageUrl}
                  alt="book img"
                />
              </Link>
              {discount > 0 && (
                <Badge
                  className={classes.discount}
                  color="orange"
                  variant="filled"
                >
                  <Text fz={"md"} fw={500}>{`-${
                    ((price - discount) / price) * 100
                  }%`}</Text>
                </Badge>
              )}
              <Flex>
                <Rating value={book.averageRate} readOnly />

                {reviews && (
                  <Text ml={5} fz={13} color="dimmed">
                    (оценило: {reviews.length})
                  </Text>
                )}
              </Flex>

              <Tooltip
                label={
                  favoriteState
                    ? "Удалить из избранного"
                    : "Добавить в избранное"
                }
                color="cyan"
                position="bottom"
                withArrow
                transitionProps={{ transition: "skew-up", duration: 300 }}
              >
                <ActionIcon
                  variant="transparent"
                  className={classes.action_favorite}
                >
                  <GiBookmarklet
                    className={
                      favoriteState ? classes.favorite_on : classes.favorite_off
                    }
                    size="4rem"
                    onClick={handleFavoritesChange}
                  />
                </ActionIcon>
              </Tooltip>
            </Group>

            <Grid mt={10} pl={10} mb={5} gutter={0}>
              <Grid.Col span={12}>
                <Text align="start" size="sm" color="dimmed" lineClamp={1}>
                  {book.authorBook}
                </Text>
              </Grid.Col>
              <Grid.Col span={12}>
                {/* <Popover
                  width={200}
                  position="bottom"
                  withArrow
                  shadow="md"
                  // opened={opened}
                >
                  <Popover.Target> */}
                <Link to={`/book-card/${id}`}>
                  <UnstyledButton>
                    <Text
                      weight={500}
                      lineClamp={1}
                      // onMouseEnter={open}
                      // onMouseLeave={close}
                    >
                      {book.title}
                    </Text>
                  </UnstyledButton>
                </Link>
                {/* </Popover.Target>
                  <Popover.Dropdown sx={{ pointerEvents: "none" }}>
                    <Text>{book.title}</Text>
                  </Popover.Dropdown>
                </Popover> */}
              </Grid.Col>
            </Grid>
            <Flex justify="space-between">
              <PricesDiscount price={price} discount={discount} />
            </Flex>
            <Button
              className={classes.buy}
              variant="gradient"
              gradient={{ from: "teal", to: "blue", deg: 60 }}
              color="blue"
              radius="md"
              w={"12rem"}
              onClick={handleAddCartItem}
            >
              В КОРЗИНУ
            </Button>
          </Card>
        </Grid.Col>
      </>
    );
  }
);

export default SingleBookList;
