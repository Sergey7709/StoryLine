import { useQuery } from "react-query";
import { fetchItem } from "./itemsApi";
import { ItemsResponse } from "../common/types";
import { useAppSelector } from "../redux/redux.hooks";
import { categoryNewBooks } from "./../common/constants";

export const useGetBookList = () => {
  const { categorySort, maxDiscount, searchBooksValue, minPrice, maxPrice } =
    useAppSelector((state) => state.sort);

  const param = useAppSelector((state) => state.filter.param);

  const priceSort =
    Number(minPrice) > 0 && Number(maxPrice) >= Number(minPrice)
      ? `&priceFrom=${Number(minPrice)}&priceTo=${
          Number(maxPrice) + Number(maxDiscount)
        }`
      : "";
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
  return {
    data,
    isLoading,
    isLoadingError,
    minPrice,
    maxPrice,
    searchBooksValue,
    param,
  };
};
