import {
  Card,
  Grid,
  Text,
  Title,
  Image,
  Space,
  Button,
  Divider,
  Badge,
  Container,
  Group,
  UnstyledButton,
} from "@mantine/core";
import CartBar from "../../components/cartCount/CartBar";
import { useAppDispatch, useAppSelector } from "../../redux/redux.hooks";
import { deleteCartItems } from "../../redux/cartSlice";
import { CartItem } from "../../common/types";
import { Link, NavLink } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useMutation } from "react-query";
import { BASE_URL } from "../../common/constants";
import { useCallback } from "react";

export const Cart = () => {
  const user = useAppSelector((state) => state.auth.user);

  const cart = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const handleDeleteCartItem = (bookID: number) => {
    dispatch(deleteCartItems(bookID));
  };
  const idOrder = (Number(Date.now()) % 1000) + 100; //!

  const cartItems = cart.cartItems.map((book) => ({
    imageUrl: book.itemImageUrl,
    price: book.discount ? book.discount : book.price,
    count: book.count,
    title: book.title,
  })); //!

  console.log(user?.id); //!

  const order = {
    id: idOrder,
    userId: user?.id,
    userName: user?.name,
    userEmail: user?.email,
    userPhone: user?.phone,
    userAddress: user?.address,
    items: JSON.stringify([...cartItems]),
    date: new Date(),
    totalPrice: cart.totalPrice,
  }; //!
  console.log("order", order);

  const { mutateAsync } = useMutation(
    (param: string) => {
      return axios.post(`${BASE_URL}${param}`, order, {
        headers: {
          "Content-Type": "application/json",
          Authorization: user?.token ?? "",
        },
      });
    },
    {
      onSuccess: () => {
        notifications.show({
          message: "Заказ успешно отправлен!",
          autoClose: 2000,
          color: "green",
        });
        // getCurrentUser();
      },
      onError: () => {
        notifications.show({
          message: "Ошибка при добавлении заказа!",
          autoClose: 2000,
          color: "red",
        });
      },
    }
  ); //! перенести в api

  const handleAddOrder = useCallback(async () => {
    if (user?.token) {
      await mutateAsync(`order`);

      // notifications.show({
      //   message: "Книга добавлена в избранное",
      //   autoClose: 2000,
      //   color: "green",
      // });
    }
  }, []); //!

  // console.log("cart", cart.cartItems);
  // console.log("totalCount", cart.totalCount, "totalPrice", cart.totalPrice);

  if (cart.cartItems.length === 0) {
    return (
      <Grid>
        <Title align="center" order={1} pb={10}>
          Товары в корзине отсутствуют
        </Title>
      </Grid>
    );
  }

  return (
    <>
      <Container size="100%" h={"100%"} px="xs" py={"lg"}>
        <Grid pl={"3%"}>
          <Grid.Col span={12}>
            <Group spacing="xs">
              <Title order={1} pb={10}>
                Корзина товаров
              </Title>
              <Divider size="xs" variant="solid" color="gray" />
              <UnstyledButton>
                <Badge
                  color="black"
                  onClick={() => {
                    handleDeleteCartItem(0);
                  }}
                >
                  <Text> очистить всю корзину</Text>
                </Badge>
              </UnstyledButton>
              <Button onClick={handleAddOrder}>
                <Text>ОФОРМИТЬ ЗАКАЗ</Text>{" "}
              </Button>
            </Group>
            <Space h="xl" />
          </Grid.Col>

          {cart.cartItems.map((book: CartItem) => (
            <Grid.Col xl={3} lg={4} md={4} sm={6} xs={6} key={book.id}>
              <Card
                shadow="sm"
                padding="xs"
                radius="md"
                w={300}
                h={325}
                withBorder
              >
                <Grid gutter="sm">
                  <Grid.Col span={5} color="gray">
                    <Link to={`/books-list/${book.id}`}>
                      <Image
                        width={100}
                        height={150}
                        src={book.itemImageUrl}
                        alt="book img"
                      />
                    </Link>
                  </Grid.Col>

                  <Grid.Col span={7}>
                    <Badge color="cyan" size="lg" radius="xs" variant="filled">
                      <Text w={130}>{`ЦЕНА: ${
                        book.discount || book.price
                      } руб.`}</Text>
                    </Badge>
                    <Space h="xs" />

                    <Badge color="cyan" size="lg" radius="xs" variant="filled">
                      <Text w={130}>{`СУММА: ${
                        book.discount * book.count || book.price * book.count
                      } руб.`}</Text>
                    </Badge>
                    <Space h="lg" />
                    <CartBar book={book} />
                    <Space h="xs" />
                  </Grid.Col>

                  <Grid.Col span={12} pb={2}>
                    <Divider />
                    <Title order={6}>
                      <Text color="yellow">{`${book.authorBook}`}</Text>
                    </Title>
                    <Divider my={5} />
                  </Grid.Col>

                  <Grid.Col span={12} pr={10} h={75} py={0}>
                    <NavLink to={`/books-list/${book.id}`}>
                      <UnstyledButton>
                        <Text
                          py={0}
                          sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                          ta="start"
                          fz="lg"
                          fw={700}
                          italic
                          lineClamp={2}
                        >
                          {`${book.title}`}
                        </Text>
                      </UnstyledButton>
                    </NavLink>
                    <Divider my={5} />
                  </Grid.Col>
                  <Grid.Col span={12} py={0}>
                    <Button
                      variant="light"
                      color="red"
                      w={"100%"}
                      compact
                      onClick={() => handleDeleteCartItem(book.id)}
                    >
                      <Text fz="10px">УДАЛИТЬ ИЗ КОРЗИНЫ</Text>
                    </Button>
                  </Grid.Col>
                </Grid>
              </Card>
            </Grid.Col>
          ))}
          <Grid.Col span={12} py={0}>
            <Title order={3}>{`Итого кол-во: ${cart.totalCount} шт.`}</Title>
          </Grid.Col>
          <Grid.Col span={12} py={0}>
            <Title
              order={3}
            >{`Итого сумма заказа: ${cart.totalPrice} руб. `}</Title>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};
