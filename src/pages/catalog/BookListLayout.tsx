import { Grid, Title, Divider, Modal, Group } from "@mantine/core";
import React, { memo } from "react";
import { categoryNewBooks } from "../../common/constants";
import { ServerError } from "../../components/errorNetwork/ServerError";
import { Authorization } from "../authorization/Authorization";
import { BooksFilter } from "./BooksFilter";
import PriceRange from "./BooksPriceRange";
import { ItemsResponse } from "../../common/types";
import { Loader } from "../../components/loader/Loader";
import { useAppSelector } from "../../redux/redux.hooks";

type BookListLayoutProps = {
  isLoading: boolean;
  isLoadingError: boolean;
  param: string;
  openedAuth: boolean;
  handlersClose: () => void;
  sortHandler: (valueSort: string) => void;
  clasess: string;
  data: ItemsResponse | undefined;
  books: JSX.Element[] | undefined;
};

export const BookListLayout: React.FC<BookListLayoutProps> = memo((props) => {
  const { searchBooksValue } = useAppSelector((state) => state.sort);

  const {
    isLoading,
    isLoadingError,
    param,
    openedAuth,
    handlersClose,
    sortHandler,
    clasess,
    data,
    books,
  } = props;

  return (
    <>
      {isLoading && <Loader />}
      {isLoadingError && <ServerError />}
      {!isLoading && param === categoryNewBooks && (
        <Grid>
          <Grid.Col span={12}>
            <Title
              pb={"sm"}
              align="center"
              variant="gradient"
              gradient={{ from: "indigo", to: "green", deg: 45 }}
              order={1}
            >
              КНИЖНЫЕ НОВИНКИ
            </Title>
            <Divider size="xs" variant="solid" color="gray" />
          </Grid.Col>
        </Grid>
      )}
      <Grid>
        <Modal size={500} opened={openedAuth} onClose={handlersClose} centered>
          <Authorization close={handlersClose} />
        </Modal>
        <Grid.Col span={12}>
          <Group ml={"2%"} mb={5}>
            {param !== categoryNewBooks && (
              <>
                {!searchBooksValue && <BooksFilter sortHandler={sortHandler} />}
                {!searchBooksValue && <PriceRange />}
              </>
            )}
          </Group>
        </Grid.Col>
        <Grid.Col span={12}>
          <Grid className={clasess} align="center">
            {data && books}
          </Grid>
        </Grid.Col>
      </Grid>
    </>
  );
});
