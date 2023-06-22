import { Grid, Title, Divider, Modal, Group } from "@mantine/core";
import React, { memo } from "react";
import {
  QUANTITY_PAGES,
  categoryNewBooks,
  serchQuery,
} from "../../common/constants";
import { ServerError } from "../../components/errorNetwork/ServerError";
import { Authorization } from "../authorization/Authorization";
import { BooksFilter } from "./BooksFilter";
import PriceRange from "./BooksPriceRange";
import { BookListLayoutProps } from "../../common/types";
import { Loader } from "../../components/loader/Loader";
import { useAppSelector } from "../../redux/redux.hooks";
import { useLocation } from "react-router-dom";
import { GoBackButton } from "../../components/GoBackButton";
import { Paginator } from "../../components/pagination/Paginator";
import { setPaginationPage } from "../../redux/sortSlice";
import { Footer } from "../../components/footer/Footer";
import queryString from "query-string";

export const BookListLayout: React.FC<BookListLayoutProps> = memo((props) => {
  const { searchBooksValue } = useAppSelector((state) => state.sort);

  const paginationPage = useAppSelector((state) => state.sort.paginationPage);

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const querySearchName = decodeURIComponent(location.search);

  console.log(querySearchName);

  const title =
    typeof queryParams.category === "string"
      ? queryParams.category.toUpperCase()
      : querySearchName === serchQuery
      ? "НОВИНКИ"
      : "ВСЕ КНИГИ";

  const {
    isLoading,
    isLoadingError,
    isSuccess,
    param,
    openedAuth,
    handlersClose,
    sortHandler,
    clasess,
    data,
    books,
    allDataBooks,
  } = props;

  return (
    <>
      {isLoadingError && <ServerError />}
      {isLoading && <Loader title={"Ищем книги..."} />}
      {isSuccess && (
        <>
          <Grid>
            <Modal
              size={500}
              opened={openedAuth}
              onClose={handlersClose}
              centered
            >
              <Authorization close={handlersClose} />
            </Modal>
            <Grid.Col span={12}>
              <Group ml={"2%"} mb={5}>
                {isSuccess && param !== categoryNewBooks ? (
                  <>
                    <GoBackButton
                      variant={"gradient"}
                      size={"xs"}
                      gradient={{ from: "yellow", to: "orange" }}
                      text={"ВЕРНУТЬСЯ"}
                    />

                    {!searchBooksValue && (
                      <BooksFilter sortHandler={sortHandler} />
                    )}
                    {!searchBooksValue && <PriceRange />}
                  </>
                ) : (
                  isSuccess && (
                    <GoBackButton
                      variant={"gradient"}
                      size={"xs"}
                      gradient={{ from: "yellow", to: "orange" }}
                      text={"ВЕРНУТЬСЯ"}
                    />
                  )
                )}
                <Grid>
                  <Grid.Col span={12}>
                    <Title
                      align="center"
                      variant="gradient"
                      gradient={{ from: "coral", to: "red", deg: 45 }}
                      order={2}
                      italic
                    >
                      {!isLoading && title}
                    </Title>
                  </Grid.Col>
                </Grid>
              </Group>
              {isSuccess && (
                <Divider color={"coral"} size="xs" variant="solid" />
              )}
            </Grid.Col>
            <Grid.Col span={12}>
              <Grid className={clasess} align="start">
                {data && books}
              </Grid>
            </Grid.Col>
          </Grid>
          <Paginator
            currentPage={paginationPage}
            action={setPaginationPage}
            totalPage={Math.ceil(
              (allDataBooks?.items?.length ?? 0) / QUANTITY_PAGES
            )}
          />
          <Footer />
        </>
      )}
    </>
  );
});
