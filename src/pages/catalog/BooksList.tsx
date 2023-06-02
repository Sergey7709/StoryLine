import { useStyles } from "./BooksListStyles";
import { useAppDispatch, useAppSelector } from "../../redux/redux.hooks";
import SingleBookList from "./SingleBookList";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDisclosure } from "@mantine/hooks";
import { setMaxDiscount, setCategorySort } from "../../redux/sortSlice";
import { BookListLayout } from "./BookListLayout";
import { usePostFavorites } from "../../api/usePostFavorites";
import { useGetBookList } from "../../api/useGetBookList";
import { User } from "../../common/types";

export const BooksList = React.memo(() => {
  const user: User | null = useAppSelector((stateAuth) => stateAuth.auth.user);

  const dispatch = useAppDispatch();

  const { classes } = useStyles();

  const [openedAuth, handlers] = useDisclosure(false);

  const { favoritesChange } = usePostFavorites(handlers);

  const {
    data,
    isLoading,
    isLoadingError,
    minPrice,
    maxPrice,
    searchBooksValue,
    param,
  } = useGetBookList();

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

  const books = useMemo(() => {
    const filteredBooks =
      user && Number(minPrice) > 0 && searchBooksValue.length === 0
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

  return (
    <>
      <BookListLayout
        isLoading={isLoading}
        isLoadingError={isLoadingError}
        openedAuth={openedAuth}
        handlersClose={handlers.close}
        sortHandler={sortHandler}
        clasess={classes.grid}
        data={data}
        books={books}
        param={param}
      />
    </>
  );
});
