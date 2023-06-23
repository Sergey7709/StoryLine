import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useMutation } from "react-query";
import { BASE_URL } from "../../common/constants";
import { useCurrentUser } from "../../hooks/useCurrenUser";
import { useAppSelector } from "../../redux/redux.hooks";
import {
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  Modal,
  SimpleGrid,
  Space,
} from "@mantine/core";
import SingleBookList from "../catalog/SingleBookBlock";
import EmptyData from "../userAccount/assetsUserAccount/EmptyData";
import { Title } from "@mantine/core";
import { useCallback, useEffect, useMemo } from "react";
import React from "react";
import { Footer } from "../../components/footer/Footer";
import { useDisclosure } from "@mantine/hooks";
import { Authorization } from "../authorization/Authorization";

export const Favorites = React.memo(() => {
  const user = useAppSelector((state) => state.auth.user);

  const [onAuth, { open: openAuth, close: closeAuth }] = useDisclosure(false);

  const getCurrentUser = useCurrentUser();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const { mutateAsync } = useMutation(
    (param: string) => {
      return axios.post(`${BASE_URL}${param}`, undefined, {
        headers: {
          Authorization: user?.token ?? "",
        },
      });
    },
    {
      onSuccess: () => {
        getCurrentUser();
      },
      onError: () => {
        notifications.show({
          message: "Ошибка при добавлении книги в избранное!",
          autoClose: 2000,
          color: "red",
        });
      },
    }
  );

  const favoritesChange = useCallback(
    async (bookId: number, favorite: boolean) => {
      if (!user) {
        notifications.show({
          message: "Войдите в аккаунт, что бы добавить книгу в избранное!",
          autoClose: 5000,
          color: "red",
          fz: "md",
        });
        return;
      }

      if (user?.token) {
        if (favorite === false) {
          await mutateAsync(`user/favorites/${bookId}`);

          notifications.show({
            message: "Книга добавлена в избранное",
            autoClose: 2000,
            color: "green",
          });
        } else if (favorite === true) {
          await mutateAsync(`user/favorites-remove/${bookId}`);

          notifications.show({
            message: "Книга удалена из избранного",
            autoClose: 2000,
            color: "yellow",
          });
        }
      }
    },
    [user?.favoriteItems]
  );

  const openAuthHandler = () => {
    openAuth();
  };

  const favoriteItems = useMemo(
    () => user?.favoriteItems ?? [],
    [user?.favoriteItems]
  );

  return (
    <>
      <Modal size={500} opened={onAuth} onClose={closeAuth} centered>
        <Authorization close={closeAuth} />
      </Modal>

      <Container h={"100vh"} size={"xl"}>
        {!user && (
          <Center h={"50%"}>
            <SimpleGrid>
              <Title order={2} align="center" tt={"uppercase"}>
                Войдите в аккаунт, что бы добавить в избранное!
              </Title>
              <Button onClick={openAuthHandler} color="red" tt={"uppercase"}>
                Войти/зарегистрироваться
              </Button>
            </SimpleGrid>
          </Center>
        )}
        {user && (
          <>
            <Flex justify={"center"} align={"center"}>
              <Title
                pb={"sm"}
                variant="gradient"
                gradient={{ from: "indigo", to: "green", deg: 45 }}
                order={1}
              >
                МОИ ИЗБРАННЫЕ КНИГИ
              </Title>
            </Flex>
            <Divider size="xs" variant="solid" color="gray" />
            <Space h="md" />
            {favoriteItems.length ? (
              <Grid pl={5}>
                {favoriteItems.map((favoriteBook) => (
                  <SingleBookList
                    key={favoriteBook.id}
                    book={favoriteBook}
                    favorite={true}
                    favoritesChange={favoritesChange}
                  />
                ))}
              </Grid>
            ) : (
              <EmptyData text="У вас нет избранных товаров" />
            )}
          </>
        )}
      </Container>
      <Footer />
    </>
  );
});
