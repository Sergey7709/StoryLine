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
} from "@mantine/core";
import React from "react";
import CartBar from "../../components/cartCount/CartBar";
import { notifications } from "@mantine/notifications";
import { useAppDispatch, useAppSelector } from "../../redux/redux.hooks";
import { deleteCartItems } from "../../redux/cartSlice";
import { CartItem } from "../../common/types";

export const Cart = () => {
  const user = useAppSelector((state) => state.auth.user);

  const cart = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const handleDeleteCartItem = (bookID: number) => {
    dispatch(deleteCartItems(bookID));
  };

  console.log("cart", cart.cartItems);
  console.log("totalCount", cart.totalCount, "totalPrice", cart.totalPrice);

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
            <Title order={1} pb={10}>
              Корзина товаров
            </Title>
            <Divider size="xs" variant="solid" color="gray" />
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
                    <Image
                      width={100}
                      height={150}
                      src={book.itemImageUrl}
                      alt="book img"
                    />
                  </Grid.Col>

                  <Grid.Col span={7}>
                    <Badge color="cyan" size="lg" radius="xs" variant="outline">
                      <Text color="black" w={130}>{`ЦЕНА: ${
                        book.discount || book.price
                      } руб.`}</Text>
                    </Badge>
                    <Space h="xs" />

                    <Badge color="cyan" size="lg" radius="xs" variant="outline">
                      <Text color="black" w={130}>{`СУММА: ${
                        book.discount * book.count || book.price * book.count
                      } руб.`}</Text>
                    </Badge>
                    <Space h="lg" />
                    <CartBar bookId={book.id} cartCount={book.count} />
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
