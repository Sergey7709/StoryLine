import { useQuery } from "react-query";
import { fetchItem } from "./itemsApi";
import { ItemsResponse } from "../common/types";
import { useAppDispatch, useAppSelector } from "../redux/redux.hooks";
import { QUANTITY_PAGES, categoryNewBooks } from "./../common/constants";
import { useEffect, useRef, useState } from "react";
import { setMaxDiscount } from "../redux/sortSlice";

export const useGetBookList = () => {
  const { categorySort, maxDiscount, searchBooksValue, minPrice, maxPrice } =
    useAppSelector((state) => state.sort);

  const param = useAppSelector((state) => state.filter.param);

  const paginationPage = useAppSelector((state) => state.sort.paginationPage);

  const offset = (paginationPage - 1) * QUANTITY_PAGES;

  const dispatch = useAppDispatch();

  // const [isActionExecutedDiscount, setIsActionExecutedDiscount] =
  //   useState(false); //???

  const previousMaxDiscount = useRef(0); //???
  console.log(previousMaxDiscount);

  // useEffect(() => {
  //   data?.items
  //     ?.filter((book) => book.discount > 0)
  //     .reduce((newDiscount, book) => {
  //       const newMaxDiscount =
  //         book.discount > newDiscount ? book.discount : newDiscount;
  //       dispatch(setMaxDiscount(newMaxDiscount));
  //       return newMaxDiscount;
  //     }, 0);
  // }, [maxPrice, minPrice, dispatch]);

  console.log(maxDiscount);

  const priceSort =
    Number(minPrice) > 0 && Number(maxPrice) >= Number(minPrice)
      ? `&priceFrom=${Number(minPrice)}&priceTo=${
          Number(maxPrice) + Number(maxDiscount)
        }`
      : "";

  const pagination =
    offset === 0
      ? `&limit=${QUANTITY_PAGES + 3}`
      : `&limit=${QUANTITY_PAGES}&offset=${offset + 3}`;

  const requestLink =
    param === categoryNewBooks
      ? categoryNewBooks
      : // : `${param}${categorySort}${priceSort}${pagination}`;
        `${param}${categorySort}${priceSort}${pagination}`;

  const requestBookList =
    searchBooksValue.length > 0 ? searchBooksValue : requestLink;

  const { data, isLoading, isLoadingError, isSuccess } =
    useQuery<ItemsResponse>(["item", requestBookList], () =>
      fetchItem(requestBookList)
    );

  useEffect(() => {
    if (isSuccess) {
      const newMaxDiscount = data.items
        ?.filter((book) => book.discount > 0)
        .reduce((newDiscount, book) => {
          const newMaxDiscount =
            book.discount > newDiscount ? book.discount : newDiscount;
          return newMaxDiscount;
        }, 0);

      if (newMaxDiscount > previousMaxDiscount.current) {
        dispatch(setMaxDiscount(newMaxDiscount));
        previousMaxDiscount.current = newMaxDiscount;
      }
    }
  }, [isSuccess, data?.items]);

  // useEffect(() => {
  //   if (isSuccess && !isActionExecutedDiscount) {
  //     data.items
  //       ?.filter((book) => book.discount > 0)
  //       .reduce((newDiscount, book) => {
  //         const newMaxDiscount =
  //           book.discount > newDiscount ? book.discount : newDiscount;
  //         dispatch(setMaxDiscount(newMaxDiscount));
  //         return newMaxDiscount;
  //       }, 0);

  //     setIsActionExecutedDiscount(true);
  //   }
  // }, [isSuccess, isActionExecutedDiscount, dispatch]); ///????

  return {
    data,
    isLoading,
    isLoadingError,
    isSuccess,
    minPrice,
    maxPrice,
    searchBooksValue,
    param,
  };
};
