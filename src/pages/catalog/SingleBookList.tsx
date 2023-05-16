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
} from "@mantine/core";
import React, { FC } from "react";
import { BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Item } from "../../common/types";
import { useStyles } from "./BooksListStyles";
import { useDisclosure } from "@mantine/hooks";
import PricesDiscount from "./UI/PricesDiscount";
import { Loader } from "@mantine/core";

type SingleBookListProps = {
  book: Item;
  favorite: boolean;
  favoritesHandler: (bookId: number, favorite: boolean) => void;
  loading?: boolean;
};
const SingleBookList: FC<SingleBookListProps> = ({
  book,
  favorite,
  favoritesHandler,
  loading,
}) => {
  const { id, discount, reviews, price } = book;
  const { classes } = useStyles();
  const [opened, { close, open }] = useDisclosure(false);

  console.log("render single");

  return (
    <>
      <Grid.Col xs={6} sm={4} md={4} lg={3} xl={2} className={classes.gridCol}>
        <Card
          key={id}
          className={classes.card}
          shadow="sm"
          padding="md"
          radius="md"
          withBorder
        >
          <Group position="center">
            <Link to={`/books-list/${id}`}>
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
                <Text fz={"md"} fw={500}>{`-${discount}%`}</Text>
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

            <ActionIcon
              variant="transparent"
              className={classes.action_favorite}
            >
              {favorite === false && (
                <>
                  {!loading && (
                    <BsBookmarkCheck
                      className={classes.favorite_off}
                      size="4rem"
                      onClick={() => favoritesHandler(id, favorite)}
                    />
                  )}

                  {loading && <Loader color="grape" size="sm" />}
                </>
              )}
              {favorite === true && (
                <>
                  {!loading && (
                    <BsBookmarkCheckFill
                      className={classes.favorite_on}
                      size="4rem"
                      onClick={() => favoritesHandler(id, favorite)}
                    />
                  )}
                  {loading && <Loader color="grape" size="sm" />}
                </>
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
              <Popover
                width={200}
                position="bottom"
                withArrow
                shadow="md"
                opened={opened}
              >
                <Popover.Target>
                  <Text
                    weight={500}
                    lineClamp={1}
                    onMouseEnter={open}
                    onMouseLeave={close}
                  >
                    {book.title}
                  </Text>
                </Popover.Target>
                <Popover.Dropdown sx={{ pointerEvents: "none" }}>
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
            gradient={{ from: "teal", to: "blue", deg: 60 }}
            color="blue"
            radius="md"
            w={"12rem"}
          >
            КУПИТЬ
          </Button>
        </Card>
      </Grid.Col>
    </>
  );
};

export default React.memo(SingleBookList);
