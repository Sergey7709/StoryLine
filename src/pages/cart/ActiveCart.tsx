import {
  Grid,
  Group,
  Title,
  Divider,
  UnstyledButton,
  Badge,
  Button,
  Space,
  Card,
  Text,
  Image,
} from "@mantine/core";
import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import { ActiveCartProps, CartItem } from "../../common/types";
import { CartCount } from "../../components/cartCount/CartCount";

export const ActiveCart: FC<ActiveCartProps> = (props) => {
  console.log("render activecart");
  const {
    handleDeleteCartItem,
    handleAddOrder,
    cartItems,
    totalCount,
    totalPrice,
  } = props;
  return (
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
            <Text>ОФОРМИТЬ ЗАКАЗ</Text>
          </Button>
        </Group>
        <Space h="xl" />
      </Grid.Col>

      {cartItems.map((book: CartItem) => (
        <Grid.Col xl={3} lg={4} md={4} sm={6} xs={6} key={book.id}>
          <Card shadow="sm" padding="xs" radius="md" w={300} h={325} withBorder>
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
                <CartCount book={book} />
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
        <Title order={3}>{`Итого кол-во: ${totalCount} шт.`}</Title>
      </Grid.Col>
      <Grid.Col span={12} py={0}>
        <Title order={3}>{`Итого сумма заказа: ${totalPrice} руб. `}</Title>
      </Grid.Col>
    </Grid>
  );
};
