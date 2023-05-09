import { Group, Grid } from "@mantine/core";
import { useStyles } from "./BooksListStyles";
import { useQuery } from "react-query";
import { fetchItem } from "../../api/itemsApi";
import { Item, ItemsResponse, SortType } from "../../common/types";
import { useAppDispatch, useAppSelector } from "../../redux/redux.hooks";
import { Loader } from "../../components/loader/Loader";
import { BooksFilter } from "./BooksFilter";
import React, { useState } from "react";
import SingleBookList from "./SingleBookList";
import PriceRange from "./BooksPriceRange";
import { initialState } from "../../common/constants";
import { currentFilter } from "../../redux/filterSlice";

export const BooksList = React.memo(() => {
  const param = useAppSelector((state) => state.filter.param);
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const [sortCategories, setSortCategories] = useState<SortType>(initialState);

  const { data, isLoading } = useQuery<ItemsResponse>(["item", param], () =>
    fetchItem(param)
  );

  const sortHandler = (key: keyof SortType, value: string) => {
    setSortCategories((prevState) => ({ ...prevState, [key]: value }));
  };

  const { sortName, sortRating, sortCost, sortData, price, priceEnd } =
    sortCategories;

  const queryBook = `${sortData}`; //! тест

  console.log("render BookList");
  console.log(param);
  console.log(queryBook);

  // sortData.length > 0 && dispatch(currentFilter(queryBook));

  const handlePriceChange = (minPrice: number, maxPrice: number) => {
    console.log("Минимальная цена:", minPrice);
    console.log("Максимальная цена:", maxPrice);
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
