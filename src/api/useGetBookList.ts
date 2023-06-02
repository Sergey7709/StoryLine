import { useQuery } from "react-query";
import { fetchItem } from "./itemsApi";
import { ItemsResponse } from "../common/types";

export const useGetBookList = (
  categoryNewBooks: string,
  param: string,
  categorySort: string,
  priceSort: string,
  searchBooksValue: string
) => {
  const requestLink =
    param === categoryNewBooks
      ? categoryNewBooks
      : `${param}${categorySort}${priceSort}`;

  const requestBookList =
    searchBooksValue.length > 0 ? searchBooksValue : requestLink;

  const { data, isLoading, isLoadingError } = useQuery<ItemsResponse>(
    ["item", requestBookList],
    () => fetchItem(requestBookList)
  );
  return { data, isLoading, isLoadingError };
};
