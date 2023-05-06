import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Grid,
  ActionIcon,
  RangeSlider,
  Slider,
} from "@mantine/core";
import { useStyles } from "./BooksListStyles";
import { BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchItem } from "../../api/itemsApi";
import { ItemsResponse } from "../../common/types";
import { useAppSelector } from "../../redux/redux.hooks";
import { Loader } from "../../components/loader/Loader";
import { BooksFilter } from "./BooksFilter";
import { useState } from "react";

export const BooksList = () => {
  const [value, setValue] = useState(0);
  const [endValue, setEndValue] = useState(0);

  const param = useAppSelector((state) => state.filter.param);
  const { data, isLoading } = useQuery<ItemsResponse>(["item", param], () =>
    fetchItem(param)
  );

  const { classes } = useStyles();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Grid>
      <Group ml={100} mt={20}>
        <BooksFilter />
        <RangeSlider
          // defaultValue={[20, 60]}
          w={200}
          size="md"
          color="green"
          // label={null}
          min={0}
          max={2000}
          // value={[min, max]}
          // onChange={setValue}
          // onChangeEnd={setEndValue}

          // className={classes.slider_lable}
          // classNames={{
          //   // thumb: classes.slider_thumb,
          //   dragging: classes.slider_dragging,
          // }}
        />

        <Text>
          от {value} до {endValue}
        </Text>
      </Group>

      <Grid className={classes.grid} align="center">
        {data &&
          data.items.map((book, index) => (
            <Grid.Col
              xs={6}
              sm={4}
              md={4}
              lg={3}
              xl={2}
              className={classes.gridCol}
              key={index}
            >
              <Card
                key={book.id}
                className={classes.card}
                shadow="sm"
                padding="md"
                radius="md"
                withBorder
              >
                <Group position="apart">
                  <Link to="/BookCard">
                    <Image
                      width={"8rem"}
                      height={"12rem"}
                      src={book.itemImageUrl}
                      alt="book img"
                    />
                  </Link>
                  {book.discount > 0 && (
                    <Badge
                      className={classes.discount}
                      color="orange"
                      variant="filled"
                    >
                      <Text fz={"md"} fw={500}>{`-${book.discount}%`}</Text>
                    </Badge>
                  )}
                  <ActionIcon
                    variant="transparent"
                    className={classes.action_favorite}
                  >
                    {/* {book?.favorite ? (
                    <BsBookmarkCheckFill
                      className={classes.favorite_on}
                      size="4rem"
                    />
                  ) : ( */}
                    <BsBookmarkCheck
                      className={classes.favorite_off}
                      size="4rem"
                    />
                    {/* )} */}
                  </ActionIcon>
                </Group>
                <Grid mt={10} pl={10} mb={5} gutter={0}>
                  <Grid.Col span={12}>
                    <Text align="start" size="sm" color="dimmed" lineClamp={1}>
                      {book.authorBook}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Text weight={500} lineClamp={2}>
                      {book.title}
                    </Text>
                  </Grid.Col>
                </Grid>
                <Text
                  className={classes.text}
                  weight={600}
                  size="lg"
                  color="green"
                >
                  {`${book.price} руб.`}
                </Text>

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
          ))}
      </Grid>
    </Grid>
  );
};
