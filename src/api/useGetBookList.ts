import { useQuery } from "react-query";
import { fetchItem } from "./itemsApi";
import { ItemsResponse } from "../common/types";
import { useAppSelector } from "../redux/redux.hooks";
import { QUANTITY_PAGES, categoryNewBooks } from "./../common/constants";

export const useGetBookList = () => {
  const { categorySort, searchBooksValue, minPrice, maxPrice } = useAppSelector(
    (state) => state.sort
  );

  const param = useAppSelector((state) => state.filter.param);

  const paginationPage = useAppSelector((state) => state.sort.paginationPage);

  const offset = (paginationPage - 1) * QUANTITY_PAGES;

  const priceSort =
    Number(minPrice) > 0 && Number(maxPrice) >= Number(minPrice)
      ? `&priceFrom=${Number(minPrice)}&priceTo=${Number(maxPrice)}`
      : "";

  const pagination =
    offset === 0
      ? `&limit=${QUANTITY_PAGES + 3}`
      : `&limit=${QUANTITY_PAGES}&offset=${offset + 3}`;

  const requestLink =
    param === categoryNewBooks
      ? categoryNewBooks
      : `${param}${categorySort}${priceSort}${pagination}`;

  const requestBookList =
    searchBooksValue.length > 0 ? searchBooksValue : requestLink;

  const { data: allDataBooks } = useQuery<ItemsResponse>(
    ["allItems", requestBookList],
    () => fetchItem(param)
  );

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
    categorySort,
    param,
    allDataBooks,
  };
};
