import { useStyles } from "./BooksListStyles";
import { useAppDispatch, useAppSelector } from "../../redux/redux.hooks";
import SingleBookBlock from "./SingleBookBlock";
import React, { useCallback, useMemo } from "react";
import { useDisclosure } from "@mantine/hooks";
import { BookListLayout } from "./BookListLayout";
import { usePostFavorites } from "../../api/usePostFavorites";
import { useGetBookList } from "../../api/useGetBookList";
import { Item, User } from "../../common/types";
import { setCategorySort } from "../../redux/sortSlice";

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
    isSuccess,
    minPrice,
    maxPrice,
    searchBooksValue,
    categorySort,
    param, //!!!!
  } = useGetBookList();

  const sortedDataDiscount = useMemo(
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

  const sortBooksByCategoryAndPrice = () => {
    if (data && categorySort) {
      const sortedItems = [...data.items];

      sortedItems.sort((a, b) => {
        const aPrice = a.discount && a.discount > 0 ? a.discount : a.price;
        const bPrice = b.discount && b.discount > 0 ? b.discount : b.price;
        if (categorySort === "&sortBy=price&sortOrder=asc") {
          return aPrice - bPrice;
        } else if (categorySort === "&sortBy=price&sortOrder=desc") {
          return bPrice - aPrice;
        } else {
          return 0;
        }
      });

      return sortedItems;
    } else {
      return data?.items;
    }
  }; //???

  const sortedArray = sortBooksByCategoryAndPrice(); ///????

  const books = useMemo(() => {
    const filteredBooks =
      Number(minPrice) > 0 && searchBooksValue.length === 0
        ? sortedDataDiscount
        : sortedArray;

    return filteredBooks?.map((book) => {
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

  ////?????

  // const sortedDataDiscount = useMemo(() => {
  //   return data?.items.filter((book) => {
  //     if (book.discount !== 0) {
  //       return (
  //         book.discount >= Number(minPrice) && book.discount <= Number(maxPrice)
  //       );
  //     } else {
  //       return book.price >= Number(minPrice) && book.price <= Number(maxPrice);
  //     }
  //   });
  // }, [data?.items, minPrice, maxPrice]);

  // const sortBooksByPrice = (books: Item[], sortOrder: string): Item[] => {
  //   return books.sort((a, b) => {
  //     const aPrice = a.discount && a.discount > 0 ? a.discount : a.price;
  //     const bPrice = b.discount && b.discount > 0 ? b.discount : b.price;
  //     if (sortOrder === "asc") {
  //       return aPrice - bPrice;
  //     } else if (sortOrder === "desc") {
  //       return bPrice - aPrice;
  //     } else {
  //       return 0;
  //     }
  //   });
  // };

  // const sortedArray = useMemo(() => {
  //   if (data && categorySort) {
  //     const sortedItems = [...data.items];
  //     const sortOrder = categorySort.split("=")[2];

  //     if (categorySort.includes("price")) {
  //       return sortBooksByPrice(sortedItems, sortOrder);
  //     } else {
  //       return sortedItems;
  //     }
  //   } else {
  //     return data?.items;
  //   }
  // }, [data?.items, categorySort]);

  // const books = useMemo(() => {
  //   const filteredBooks =
  //     Number(minPrice) > 0 && searchBooksValue.length === 0
  //       ? sortedDataDiscount
  //       : sortedArray;

  //   return filteredBooks?.map((book) => {
  //     const isFavorite =
  //       user?.favoriteItems.some((el) => el.id === book.id) || false;

  //     return (
  //       <SingleBookBlock
  //         favorite={isFavorite}
  //         book={book}
  //         key={book.id}
  //         favoritesChange={favoritesChange}
  //       />
  //     );
  //   });
  // }, [sortedDataDiscount, sortedArray, user?.favoriteItems, searchBooksValue]);

  ///????

  const sortHandler = useCallback((valueSort: string) => {
    console.log(valueSort);
    dispatch(setCategorySort(valueSort));
  }, []);

  console.log("render booklist");

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
      />
    </>
  );
});
