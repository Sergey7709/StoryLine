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
import { useParams } from "react-router-dom";
import { GoBackButton } from "../../components/GoBackButton";

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

  const { link } = useParams();

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

      <Grid>
        <Modal size={500} opened={openedAuth} onClose={handlersClose} centered>
          <Authorization close={handlersClose} />
        </Modal>
        <Grid.Col span={12}>
          <Group ml={"2%"} mb={5}>
            {param !== categoryNewBooks ? (
              <>
                <GoBackButton
                  variant={"gradient"}
                  size={"xs"}
                  gradient={{ from: "yellow", to: "orange" }}
                  text={"ВЕРНУТЬСЯ"}
                />
                {!searchBooksValue && <BooksFilter sortHandler={sortHandler} />}
                {!searchBooksValue && <PriceRange />}
              </>
            ) : (
              <GoBackButton
                variant={"gradient"}
                size={"xs"}
                gradient={{ from: "yellow", to: "orange" }}
                text={"ВЕРНУТЬСЯ"}
              />
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
                  {link?.toLocaleUpperCase()}
                </Title>
              </Grid.Col>
            </Grid>
          </Group>
          <Divider color={"coral"} size="xs" variant="solid" />
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
