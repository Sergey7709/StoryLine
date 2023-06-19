import { Pagination } from "@mantine/core";
import { useDispatch } from "react-redux";
import { PaginatorProps } from "../../common/types";

export const Paginator = ({
  currentPage,
  action,
  totalPage,
}: PaginatorProps) => {
  const dispatch = useDispatch();

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
