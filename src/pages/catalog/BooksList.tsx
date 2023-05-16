import { Group, Grid, Modal, Flex, Title } from "@mantine/core";
import { useStyles } from "./BooksListStyles";
import { useMutation, useQuery } from "react-query";
import { fetchItem } from "../../api/itemsApi";
import { Item, ItemsResponse, User } from "../../common/types";
import { useAppSelector } from "../../redux/redux.hooks";
import { Loader } from "../../components/loader/Loader";
import { BooksFilter } from "./BooksFilter";
import SingleBookList from "./SingleBookList";
import PriceRange from "./BooksPriceRange";
import React, { useCallback, useMemo, useState } from "react";
import { ServerError } from "../../components/errorNetwork/ServerError";
import { useCurrentUser } from "../../hooks/useCurrenUser";
import axios from "axios";
import { BASE_URL } from "../../common/constants";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { Authorization } from "../authorization/Authorization";

export const BooksList = React.memo(() => {
  const getCurrentUser = useCurrentUser(); //!
  const user: User | null = useAppSelector((stateAuth) => stateAuth.auth.user); //!
  const [openedAuth, handlers] = useDisclosure(false); //!

  const [value, setValue] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const param = useAppSelector((state) => state.filter.param);
  const { classes } = useStyles();
  const categoryNewBooks = "all?sortBy=releaseDate&sortOrder=desc&limit=8";

  const sortLink = param === categoryNewBooks ? categoryNewBooks : param;

  const { data, isLoading, isLoadingError } = useQuery<ItemsResponse>(
    ["item", param, value, priceSort],
    () => fetchItem(`${sortLink}${value}${priceSort}`)
  );

  // console.log(priceSort);

  //!----
  const [idLoad, setIdLoad] = useState<Array<number>>([]); //!

  const {
    mutateAsync,
    isLoading: loading,
    isSuccess,
  } = useMutation(
    (param: string) => {
      // console.log("mutate:", param, "token:", user?.token, user?.favoriteItems);
      return axios.post(`${BASE_URL}${param}`, undefined, {
        headers: {
          Authorization: user?.token ?? "",
        },
      });
    },
    {
      onSuccess: () => {},
      onError: () => {
        notifications.show({
          message: "Ошибка при добавлении книги в избранное!",
          autoClose: 2000,
          color: "red",
        });
      },
    }
  );

  const favoritesHandler = useCallback(
    async (bookId: number, favorite: boolean) => {
      setIdLoad([...idLoad, bookId]); //!

      if (!user) {
        notifications.show({
          message: "Войдите в аккаунт, что бы добавить книгу в избранное!",
          autoClose: 5000,
          color: "red",
          fz: "md",
        });

        handlers.open();
        return;
      }

      if (user) {
        if (favorite === false) {
          await mutateAsync(`user/favorites/${bookId}`, {
            onSuccess: () => {
              notifications.show({
                message: "Книга добавлена в избранное",
                autoClose: 2000,
                color: "green",
              });
            },
          });
        } else if (favorite === true) {
          await mutateAsync(`user/favorites-remove/${bookId}`, {
            onSuccess: () => {
              notifications.show({
                message: "Книга удалена из избранного",
                autoClose: 2000,
                color: "yellow",
              });
            },
          });
        }
        getCurrentUser();
        isSuccess && setIdLoad(idLoad.filter((el) => el === bookId)); //!
      }
    },
    [idLoad, user, handlers, getCurrentUser, isSuccess, mutateAsync]
  );

  const books = useMemo(() => {
    return data?.items.map((book: Item) => (
      <SingleBookList
        favorite={user?.favoriteItems.some((el) => el.id === book.id) ?? false}
        book={book}
        key={book.id}
        favoritesHandler={favoritesHandler}
        loading={idLoad.includes(book.id) ? loading : false}
      />
    ));
  }, [data, favoritesHandler, idLoad, loading, user?.favoriteItems]);

  //!---

  const sortHandler = useCallback((value: string) => {
    setValue(value);
  }, []);

  const handlePriceChange = useCallback((price: string) => {
    setPriceSort(price);
  }, []);

  console.log("render BookList");
  console.log(user?.favoriteItems);
  loading && console.log("load");

  return (
    <>
      {isLoading && <Loader />}
      {isLoadingError && <ServerError />}
      {!isLoading && param === categoryNewBooks && (
        <Flex justify={"center"} align={"center"}>
          <Title color="green" order={1}>
            КНИЖНЫЕ НОВИНКИ
          </Title>
        </Flex>
      )}
      <Grid>
        <Modal size={500} opened={openedAuth} onClose={handlers.close} centered>
          <Authorization close={handlers.close} />
        </Modal>
        <Grid.Col span={12}>
          <Group ml={"2%"} mb={5}>
            {param !== categoryNewBooks && (
              <>
                <BooksFilter sortHandler={sortHandler} />
                <PriceRange onPriceChange={handlePriceChange} />
              </>
            )}
          </Group>
        </Grid.Col>
        <Grid.Col span={12}>
          <Grid className={classes.grid} align="center">
            {data && books}
          </Grid>
        </Grid.Col>
      </Grid>
    </>
  );
});
