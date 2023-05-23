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

export const Cart = () => {
  const user = useAppSelector((state) => state.auth.user);
  const cart = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();
  const handleDeleteCartItem = (bookID: number) => {
    dispatch(deleteCartItems(bookID));
  }; //!
  console.log("cart", cart);
  return (
    <>
      <Container size="100%" h={"100vh"} px="xs" py={"lg"}>
        <Grid pl={"5%"}>
          <Grid.Col span={12}>
            <Title order={1} pb={10}>
              Корзина товаров
            </Title>
            <Divider size="xs" variant="solid" color="gray" />
            <Space h="xl" />
          </Grid.Col>

          {cart.map((book) => (
            <Grid.Col xl={3} lg={4} md={5} sm={6}>
              <Card
                key={book.id}
                shadow="sm"
                padding="xs"
                radius="md"
                w={310}
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
                    {/* <Badge
                  radius="xs"
                  size="lg"
                  variant="gradient"
                  gradient={{ from: "indigo", to: "cyan" }}
                >
                  <Text w={130}>{`ЦЕНА: ${sumBook} руб.`}</Text>
                </Badge> */}
                    <Badge color="cyan" size="lg" radius="xs" variant="outline">
                      <Text color="black" w={130}>{`ЦЕНА: ${
                        book.discount ? book.discount : book.price
                      } руб.`}</Text>
                    </Badge>
                    <Space h="xs" />
                    {/* <Badge
                  radius="xs"
                  size="lg"
                  variant="gradient"
                  gradient={{ from: "teal", to: "lime", deg: 105 }}
                >
                  <Text w={130}>{`СУММА: ${priceBook} руб.`}</Text>
                </Badge> */}
                    <Badge color="cyan" size="lg" radius="xs" variant="outline">
                      <Text color="black" w={130}>{`СУММА: ${
                        book.discount
                          ? book.discount * book.count
                          : book.price * book.count
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
        </Grid>
      </Container>
    </>
  );
};
