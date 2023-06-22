import { useStyles } from "./BooksListStyles";
import { useAppDispatch, useAppSelector } from "../../redux/redux.hooks";
import SingleBookBlock from "./SingleBookBlock";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDisclosure } from "@mantine/hooks";
import { BookListLayout } from "./BookListLayout";
import { usePostFavorites } from "../../api/usePostFavorites";
import { useGetBookList } from "../../api/useGetBookList";
import { User } from "../../common/types";
import { setCategorySort, setPaginationPage } from "../../redux/sortSlice";
import { useLocation } from "react-router-dom";
import { currentFilter } from "../../redux/filterSlice";

export const BooksList = React.memo(() => {
  const user: User | null = useAppSelector((stateAuth) => stateAuth.auth.user);

  const location = useLocation();

  const querySearchName = decodeURIComponent(location.search);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (querySearchName.length === 0) {
      dispatch(currentFilter("all?"));
    } else {
      dispatch(currentFilter(`all${querySearchName}`));
      dispatch(setPaginationPage(1));
    }
  }, [location]);

  const { classes } = useStyles();

  const [openedAuth, handlers] = useDisclosure(false);

  const { favoritesChange } = usePostFavorites(handlers);

  const { data, isLoading, isLoadingError, isSuccess, param, allDataBooks } =
    useGetBookList();

  const books = useMemo(() => {
    return data?.items?.map((book) => {
      const isFavorite =
        user?.favoriteItems.some((el) => el.id === book.id) || false;

      return (
        <SingleBookBlock
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
        isSuccess={isSuccess}
        openedAuth={openedAuth}
        handlersClose={handlers.close}
        sortHandler={sortHandler}
        clasess={classes.grid}
        data={data}
        books={books}
        param={param}
        allDataBooks={allDataBooks}
      />
    </>
  );
});
