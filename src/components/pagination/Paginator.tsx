import { Pagination } from "@mantine/core";
import { useDispatch } from "react-redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

type PaginatorProps = {
  currentPage: number;
  action: ActionCreatorWithPayload<number, string>;
  totalPage: number;
};

export const Paginator = ({
  currentPage,
  action,
  totalPage,
}: PaginatorProps) => {
  const dispatch = useDispatch();

  // console.log(currentPage);
  const setPageHadler = (value: number) => dispatch(action(value));

  return (
    <Pagination
      mt={20}
      value={currentPage}
      onChange={setPageHadler}
      total={totalPage}
    />
  );
};
