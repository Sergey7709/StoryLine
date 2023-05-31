import { Group, Grid, Modal, Flex, Title, Divider } from "@mantine/core";
import { useStyles } from "./BooksListStyles";
import { useMutation, useQuery } from "react-query";
import { fetchItem } from "../../api/itemsApi";
import { ItemsResponse, User } from "../../common/types";
import { useAppDispatch, useAppSelector } from "../../redux/redux.hooks";
import { Loader } from "../../components/loader/Loader";
import { BooksFilter } from "./BooksFilter";
import SingleBookList from "./SingleBookList";
import PriceRange from "./BooksPriceRange";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ServerError } from "../../components/errorNetwork/ServerError";
import axios from "axios";
import { BASE_URL, categoryNewBooks } from "../../common/constants";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { Authorization } from "../authorization/Authorization";
import {
  setMaxDiscount,
  setSortMinMaxPrice,
  setValueSort,
} from "../../redux/sortSlice";

export const BooksList = React.memo(() => {
  const user: User | null = useAppSelector((stateAuth) => stateAuth.auth.user);

  const [openedAuth, handlers] = useDisclosure(false);

  const { valueSort, sortMinMaxPrice, maxDiscount } = useAppSelector(
    (state) => state.sort
  ); //!

  const dispatch = useAppDispatch(); //!

  // const [valueSort, setValueSort] = useState("");
  // const [sortMinMaxPrice, setSortMinMaxPrice] = useState<Array<number>>([]);
  const [minPrice, maxPrice] = sortMinMaxPrice;
  // const [maxDiscount, setMaxDiscount] = useState<number>(0);

  const param = useAppSelector((state) => state.filter.param);
  const { classes } = useStyles();

  const priceSort =
    minPrice > 0
      ? `&priceFrom=${minPrice}&priceTo=${maxPrice + maxDiscount}`
      : "";

  const sortLink = param === categoryNewBooks ? categoryNewBooks : param;

  const { data, isLoading, isLoadingError } = useQuery<ItemsResponse>(
    ["item", param, valueSort, priceSort],
    () => fetchItem(`${sortLink}${valueSort}${priceSort}`)
  );

  useEffect(() => {
    data?.items
      ?.filter((book) => book.discount > 0)
      .reduce((minDiscount, book) => {
        const newMinDiscount =
          book.discount > minDiscount ? book.discount : minDiscount;
        // setMaxDiscount(newMinDiscount);
        dispatch(setMaxDiscount(newMinDiscount)); //!
        return newMinDiscount;
      }, 0);
  }, [data]);

  const dataDiscount = useMemo(
    () =>
      data?.items.filter((book) => {
        if (book.discount !== 0) {
          return book.discount >= minPrice && book.discount <= maxPrice;
        } else {
          return book.price >= minPrice && book.price <= maxPrice;
        }
      }),
    [data?.items]
  );

  const { mutateAsync } = useMutation(
    (param: string) => {
      return axios.post(`${BASE_URL}${param}`, undefined, {
        headers: {
          Authorization: user?.token ?? "",
        },
      });
    },
    {
      onSuccess: () => {
        console.log("favorite action");
      },
      onError: () => {
        notifications.show({
          message: "Ошибка при добавлении или удалении книги в избранном!",
          autoClose: 2000,
          color: "red",
        });
      },
    }
  );

  const favoritesChange = useCallback(
    async (bookId: number, favorite: boolean) => {
      if (!user) {
        notifications.show({
          message: "Войдите в аккаунт, что бы добавить книгу в избранное!",
          autoClose: 5000,
          color: "red",
          fz: "md",
        });

        handlers.open();
        return;
      }

      if (user) {
        if (favorite === false) {
          await mutateAsync(`user/favorites/${bookId}`, {});
          console.log("add favorite");
        } else if (favorite === true) {
          await mutateAsync(`user/favorites-remove/${bookId}`, {});
          console.log("del favorite");
        }
      }
    },

    [mutateAsync, user?.favoriteItems]
  );

  const books = useMemo(() => {
    const filteredBooks = user && minPrice > 0 ? dataDiscount : data?.items;

    return filteredBooks?.map((book) => {
      const isFavorite =
        user?.favoriteItems.some((el) => el.id === book.id) || false;

      return (
        <SingleBookList
          favorite={isFavorite}
          book={book}
          key={book.id}
          favoritesChange={favoritesChange}
        />
      );
    });
  }, [data?.items, user?.favoriteItems]);

  const sortHandler = useCallback((valueSort: string) => {
    // setValueSort(valueSort);
    dispatch(setValueSort(valueSort)); //!
  }, []);

  const handlePriceChange = useCallback(
    (priceMin: number, priceMax: number) => {
      // setSortMinMaxPrice([priceMin, priceMax]);
      dispatch(setSortMinMaxPrice([priceMin, priceMax])); //!
      // setValueSort("");
      dispatch(setValueSort(""));
    },
    []
  );

  console.log("render BookList");
  // console.log("избранных книг:", user?.favoriteItems);

  return (
    <>
      {isLoading && <Loader />}
      {isLoadingError && <ServerError />}
      {!isLoading && param === categoryNewBooks && (
        <Grid>
          <Grid.Col span={12}>
            <Title
              pb={"sm"}
              align="center"
              variant="gradient"
              gradient={{ from: "indigo", to: "green", deg: 45 }}
              order={1}
            >
              КНИЖНЫЕ НОВИНКИ
            </Title>
            <Divider size="xs" variant="solid" color="gray" />
          </Grid.Col>
        </Grid>
      )}
      <Grid>
        <Modal size={500} opened={openedAuth} onClose={handlers.close} centered>
          <Authorization close={handlers.close} />
        </Modal>
        <Grid.Col span={12}>
          <Group ml={"2%"} mb={5}>
            {param !== categoryNewBooks && (
              <>
                <BooksFilter sortHandler={sortHandler} />
                <PriceRange handlePriceChange={handlePriceChange} />
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
    </>
  );
});
