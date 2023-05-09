import { Group, Grid } from "@mantine/core";
import { useStyles } from "./BooksListStyles";
import { useQuery } from "react-query";
import { fetchItem } from "../../api/itemsApi";
import { Item, ItemsResponse } from "../../common/types";
import { useAppSelector } from "../../redux/redux.hooks";
import { Loader } from "../../components/loader/Loader";
import { BooksFilter } from "./BooksFilter";
import SingleBookList from "./SingleBookList";
import PriceRange from "./BooksPriceRange";
import React, { useState } from "react";

export const BooksList = React.memo(() => {
  const [value, setValue] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const param = useAppSelector((state) => state.filter.param);
  const { classes } = useStyles();

  const { data, isLoading } = useQuery<ItemsResponse>(
    ["item", param, value, priceSort],
    () => fetchItem(`${param}${value}${priceSort}`)
  );
  console.log(priceSort);

  const sortHandler = (value: string) => {
    setValue(value);
  };

  console.log("render BookList");

  const handlePriceChange = (price: string) => {
    setPriceSort(price);
  };

  if (isLoading) {
    return <Loader />;
  }
  // console.log(data);
  return (
    <Grid>
      <Grid.Col span={12}>
        <Group ml={"2%"} mb={5}>
          <BooksFilter sortHandler={sortHandler} />
          <PriceRange onPriceChange={handlePriceChange} />
        </Group>
      </Grid.Col>
      <Grid.Col span={12}>
        <Grid className={classes.grid} align="center">
          {data &&
            data.items.map((book: Item) => (
              <SingleBookList book={book} key={book.id} />
            ))}
        </Grid>
      </Grid.Col>
    </Grid>
  );
});
