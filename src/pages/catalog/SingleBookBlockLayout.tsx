import {
  Grid,
  Card,
  Group,
  Badge,
  Flex,
  Rating,
  Tooltip,
  ActionIcon,
  UnstyledButton,
  Button,
  Image,
  Text,
} from "@mantine/core";
import { GiBookmarklet } from "react-icons/gi";
import { Link } from "react-router-dom";
import PricesDiscount from "./UI/PricesDiscount";
import { SingleBookBlockLayoutProps } from "../../common/types";

export const SingleBookBlockLayout = (props: SingleBookBlockLayoutProps) => {
  const {
    id,
    classes,
    book,
    discount,
    price,
    reviews,
    favoriteState,
    handleFavoritesChange,
    handleAddCartItem,
  } = props;

  return (
    <Grid.Col xs={6} sm={4} md={4} lg={3} xl={2} className={classes.gridCol}>
      <Card
        key={id}
        className={classes.card}
        shadow="sm"
        padding="md"
        radius="md"
      >
        <Group position="center">
          <Link to={`/book-card/${id}`}>
            <Image
              width={"8rem"}
              height={"12rem"}
              src={book.itemImageUrl}
              alt="book img"
            />
            {book.releaseDate === "2023" || book.releaseDate === "2022" ? (
              <Badge
                className={classes.newBooks}
                color="green"
                variant="filled"
                radius={0}
                p={10}
                w={130}
                h={25}
              >
                НОВИНКА
              </Badge>
            ) : null}
          </Link>
          {discount > 0 && (
            <Badge
              className={classes.discount}
              color="red"
              variant="filled"
              radius={0}
              p={5}
              w={100}
              h={25}
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
              favoriteState ? "Удалить из избранного" : "Добавить в избранное"
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
            <Link to={`/book-card/${id}`}>
              <UnstyledButton>
                <Text weight={500} lineClamp={1}>
                  {book.title}
                </Text>
              </UnstyledButton>
            </Link>
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
  );
};
