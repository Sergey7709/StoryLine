import { useQuery } from "react-query";
import { fetchItem } from "./itemsApi";
import { ItemsResponse } from "../common/types";
import { useAppDispatch, useAppSelector } from "../redux/redux.hooks";
import { QUANTITY_PAGES, categoryNewBooks } from "./../common/constants";
import { useEffect } from "react";
import { setMaxDiscount } from "../redux/sortSlice";

export const useGetBookList = () => {
  const { categorySort, maxDiscount, searchBooksValue, minPrice, maxPrice } =
    useAppSelector((state) => state.sort);

  const param = useAppSelector((state) => state.filter.param);

  const paginationPage = useAppSelector((state) => state.sort.paginationPage); //!

  const offset = (paginationPage - 1) * QUANTITY_PAGES; //!

  const dispatch = useAppDispatch(); //???

  useEffect(() => {
    data?.items
      ?.filter((book) => book.discount > 0)
      .reduce((minDiscount, book) => {
        const newMaxDiscount =
          book.discount > minDiscount ? book.discount : minDiscount;
        dispatch(setMaxDiscount(newMaxDiscount));
        return newMaxDiscount;
      }, 0);
  }, [maxPrice, minPrice, dispatch]); //!

  const priceSort =
    Number(minPrice) > 0 && Number(maxPrice) >= Number(minPrice)
      ? `&priceFrom=${Number(minPrice)}&priceTo=${
          Number(maxPrice) + Number(maxDiscount)
        }`
      : "";

  const pagination =
    offset === 0
      ? `&limit=${QUANTITY_PAGES + 3}`
      : `&limit=${QUANTITY_PAGES}&offset=${offset + 3}`; //!

  const requestLink =
    param === categoryNewBooks
      ? categoryNewBooks
      : `${param}${categorySort}${priceSort}${pagination}`; //!
  // : `${param}${categorySort}${priceSort}${pagination}`; //!

  console.log(`${param}${categorySort}${pagination}${priceSort}`);

  const requestBookList =
    searchBooksValue.length > 0 ? searchBooksValue : requestLink;

  const { data, isLoading, isLoadingError, isSuccess } =
    useQuery<ItemsResponse>(["item", requestBookList], () =>
      fetchItem(requestBookList)
    );

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
