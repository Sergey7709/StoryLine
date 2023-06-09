import React, { useEffect, useState } from "react";
import { Pagination } from "@mantine/core";
import { useDispatch } from "react-redux";
import { setPaginationPage } from "../../redux/sortSlice";
import { useAppSelector } from "../../redux/redux.hooks";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

type PaginatorProps = {
  initialPage: number;
  action: ActionCreatorWithPayload<number, string>;
};

export const Paginator = (props: PaginatorProps) => {
  const { initialPage, action } = props;

  const dispatch = useDispatch(); //!
  // const paginationPage = useAppSelector((state) => state.sort.paginationPage); //!

  // const [activePage, setPage] = useState(paginationPage);

  const [activePage, setPage] = useState(initialPage);

  useEffect(() => {
    if (activePage !== initialPage) {
      // dispatch(setPaginationPage(activePage));
      dispatch(action(activePage));
    }
  }, [activePage]); //!

  // console.log(activePage);

  return (
    <Pagination mt={20} value={activePage} onChange={setPage} total={10} />
  );
};
