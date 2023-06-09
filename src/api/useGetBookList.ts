import { useQuery } from "react-query";
import { fetchItem } from "./itemsApi";
import { ItemsResponse } from "../common/types";
import { useAppSelector } from "../redux/redux.hooks";
import { QUANTITY_PAGES, categoryNewBooks } from "./../common/constants";

export const useGetBookList = () => {
  const { categorySort, maxDiscount, searchBooksValue, minPrice, maxPrice } =
    useAppSelector((state) => state.sort);

  const param = useAppSelector((state) => state.filter.param);

  const paginationPage = useAppSelector((state) => state.sort.paginationPage); //!

  // const pagination = `limit=${QUANTITY_PAGES}&offset=${numPages}`;//!
  // const pagination = `limit=${12}&offset=${14}`; //!
  const numPages = (paginationPage - 1) * 24;
  const pagination = `&limit=${24}&offset=${numPages}`; //!

  const priceSort =
    Number(minPrice) > 0 && Number(maxPrice) >= Number(minPrice)
      ? `&priceFrom=${Number(minPrice)}&priceTo=${
          Number(maxPrice) + Number(maxDiscount)
        }`
      : "";

  const requestLink =
    param === categoryNewBooks
      ? categoryNewBooks
      : `${param}${pagination}${categorySort}${priceSort}`; //! //???
  // : `${param}${categorySort}${priceSort}`;

  const requestBookList =
    searchBooksValue.length > 0 ? searchBooksValue : requestLink;

  // console.log(requestBookList);

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
