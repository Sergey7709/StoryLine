import { useStyles } from "./BooksListStyles";
import { useMutation, useQuery } from "react-query";
import { fetchItem } from "../../api/itemsApi";
import { ItemsResponse, User } from "../../common/types";
import { useAppDispatch, useAppSelector } from "../../redux/redux.hooks";
import SingleBookList from "./SingleBookList";
import React, { useCallback, useEffect, useMemo } from "react";
import axios from "axios";
import { BASE_URL, categoryNewBooks } from "../../common/constants";
import { notifications } from "@mantine/notifications";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";

import {
  setMaxDiscount,
  setMaxPrice,
  setMinPrice,
  setSortMinMaxPrice,
  setCategorySort,
  setReset,
} from "../../redux/sortSlice";
import { BookListLayout } from "./BookListLayout";

export const BooksList = React.memo(() => {
  const user: User | null = useAppSelector((stateAuth) => stateAuth.auth.user);

  const param = useAppSelector((state) => state.filter.param);

  const {
    categorySort,
    sortMinMaxPrice,
    maxDiscount,
    searchBooksValue,
    minPrice,
    maxPrice,
  } = useAppSelector((state) => state.sort);

  // const [minPrice, maxPrice] = sortMinMaxPrice;

  const [debouncedMin] = useDebouncedValue(minPrice, 1500); //!
  const [debouncedMax] = useDebouncedValue(maxPrice, 1500); //!
  // console.log("debouncedMin", debouncedMin, "debouncedMax", debouncedMax);

  const priceSort =
    // Number(debouncedMin) > 0 && Number(debouncedMax) >= Number(debouncedMin) //!
    // Number(debouncedMin) > 0 && Number(debouncedMax) >= Number(debouncedMin) //!
    Number(minPrice) > 0 && Number(maxPrice) >= Number(minPrice)
      ? `&priceFrom=${Number(minPrice)}&priceTo=${
          Number(maxPrice) + Number(maxDiscount)
        }`
      : "";

  const dispatch = useAppDispatch();

  const { classes } = useStyles();

  const [openedAuth, handlers] = useDisclosure(false);

  // const sortLink = param === categoryNewBooks ? categoryNewBooks : param;
  const requestLink =
    param === categoryNewBooks
      ? categoryNewBooks
      : `${param}${categorySort}${priceSort}`;

  const requestBookList =
    searchBooksValue.length > 0
      ? `${searchBooksValue}`
      : // : `${sortLink}${categorySort}${priceSort}`; //!
        `${requestLink}`; //!

  const { data, isLoading, isLoadingError } = useQuery<ItemsResponse>(
    [
      "item",
      // param,
      // categorySort,
      // priceSort,
      // requestLink,
      // searchBooksValue,
      requestBookList,
      // debouncedMax,
      // debouncedMin,
    ],
    // () => fetchItem(`${sortLink}${valueSort}${priceSort}${searchBooksValue}`) //!
    () => fetchItem(requestBookList) //!
  );

  // console.log(`${requestBookList}`);
  // console.log(data?.items);
  // console.log(`${sortLink}${valueSort}${priceSort}${searchBooksValue}`);

  useEffect(() => {
    data?.items
      ?.filter((book) => book.discount > 0)
      .reduce((minDiscount, book) => {
        const newMinDiscount =
          book.discount > minDiscount ? book.discount : minDiscount;
        dispatch(setMaxDiscount(newMinDiscount));
        return newMinDiscount;
      }, 0);
  }, [data]);

  const dataDiscount = useMemo(
    () =>
      data?.items.filter((book) => {
        if (book.discount !== 0) {
          return (
            book.discount >= Number(minPrice) &&
            book.discount <= Number(maxPrice)
          );
        } else {
          return (
            book.price >= Number(minPrice) && book.price <= Number(maxPrice)
          );
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
    const filteredBooks =
      user && Number(minPrice) > 0 && searchBooksValue.length === 0 //!
        ? dataDiscount
        : data?.items;

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
    dispatch(setCategorySort(valueSort));
  }, []);

  // const handlePriceChange = useCallback(
  //   (priceMin: number, priceMax: number) => {
  //     // dispatch(setSortMinMaxPrice([priceMin, priceMax]));
  //     // dispatch(setMinPrice(priceMin.toString()));
  //     // dispatch(setMaxPrice(priceMax.toString()));
  //     // dispatch(setValueSort(""));
  //   },
  //   []
  // );

  // console.log("render BookList");

  return (
    <>
      <BookListLayout
        isLoading={isLoading}
        isLoadingError={isLoadingError}
        openedAuth={openedAuth}
        handlersClose={handlers.close}
        sortHandler={sortHandler}
        // handlePriceChange={handlePriceChange}
        clasess={classes.grid}
        data={data}
        books={books}
        param={param}
      />
    </>
  );
});
