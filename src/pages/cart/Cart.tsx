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
import { useAppSelector } from "../../redux/redux.hooks";

const priceBook = 1000;
const sumBook = 1000;
const titleBook = "Настройщик";
const autor = "Автор: Мейсон Дэниел";

export const Cart = () => {
  const user = useAppSelector((state) => state.auth.user);

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

          <Card shadow="sm" padding="xs" radius="md" w={310} h={315} withBorder>
            <Grid>
              <Grid.Col span={5} color="gray">
                <Image
                  width={100}
                  height={150}
                  src={
                    "https://img3.labirint.ru/rc/ee6e588043d79197b30a7813e809460b/363x561q80/books94/939637/cover.jpg?1680103574"
                  }
                  alt="book img"
                />
              </Grid.Col>

              <Grid.Col span={7}>
                <Badge
                  radius="xs"
                  size="lg"
                  variant="gradient"
                  gradient={{ from: "indigo", to: "cyan" }}
                >
                  <Text w={130}>{`ЦЕНА: ${sumBook} руб.`}</Text>
                </Badge>
                <Space h="xs" />

                <Badge
                  radius="xs"
                  size="lg"
                  variant="gradient"
                  gradient={{ from: "teal", to: "lime", deg: 105 }}
                >
                  <Text w={130}>{`СУММА: ${priceBook} руб.`}</Text>
                </Badge>
                <Space h="lg" />
                <CartBar />
                <Space h="xs" />
              </Grid.Col>

              <Grid.Col span={12} pb={2}>
                <Divider />
                <Title order={6}>
                  <Text color="yellow">{`${autor}`}</Text>
                </Title>
                <Divider />
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
                  {`${titleBook}`}
                </Text>
                <Divider />
              </Grid.Col>
              <Grid.Col span={12} py={0}>
                <Button variant="light" color="red" w={"100%"} compact>
                  <Text fz="10px">УДАЛИТЬ ИЗ КОРЗИНЫ</Text>
                </Button>
              </Grid.Col>
            </Grid>
          </Card>
        </Grid>
      </Container>
    </>
  );
};
