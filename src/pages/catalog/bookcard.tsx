import {
  Container,
  Grid,
  Group,
  Image,
  Skeleton,
  Text,
  Title,
  Badge,
  Button,
  Avatar,
  Divider,
  Space,
} from "@mantine/core";
import { useState } from "react";
import { Rating } from "@mantine/core";
import CartBar from "./cart/cart";

export function Bookcard() {
  const [value, setValue] = useState(0);
  return (
    <Container my="xl">
      <Grid gutter="md">
        <Grid.Col span={12} style={{ height: "5rem" }}>
          {/* <Skeleton height="100%" radius="md" animate={false} /> */}
          <Title size="h3">Джоан Роулинг: Гарри Поттер и Тайная комната</Title>
        </Grid.Col>
        <Grid.Col xs={12} sm={4} style={{ height: "30rem" }}>
          {/* <Skeleton height="100%" radius="md" animate={false} /> */}
          <Image
            maw={"18rem"}
            src={
              "https://img2.labirint.ru/rcimg/94daf1348859617b6b90d8be4a6a2e88/1920x1080/books44/435204/ph_15.jpg?1670073964"
            }
            alt="book img"
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={4}>
          <Grid gutter="sm">
            <Grid.Col xs={12} style={{ height: "5rem" }}>
              {/* <Skeleton height="100%" radius="md" animate={false} /> */}
              <Text>Оценить (оценило: 502)</Text>
              <Group>
                <Badge variant="outline">Рейтинг</Badge>
                <Rating fractions={2} value={value} onChange={setValue} />
              </Group>
            </Grid.Col>
            <Grid.Col span={12} style={{ height: "15rem" }}>
              {/* <Skeleton height="100%" radius="md" animate={false} /> */}

              <Text>Автор: Роулинг Джоан Кэтлин</Text>
              <Text>Издательство: Махаон</Text>
              <Text>Жанр: роман</Text>
              <Text>Тип обложки: твердый переплет</Text>
              <Text>Дата релиза: 1998-07-02</Text>
              <Text>Страниц: 480</Text>
              <Text>ID товара: 5</Text>
            </Grid.Col>

            <Grid.Col span={6} style={{ height: "10rem" }}>
              {/* <Skeleton height="100%" radius="md" animate={false} /> */}
              <Group>
                <Text fz={20} color="green">
                  Цена: 450 руб.
                </Text>
                <CartBar />
              </Group>
              <Button
                variant="gradient"
                mt={10}
                // w={"18rem"}
                fullWidth
                gradient={{ from: "teal", to: "lime", deg: 105 }}
              >
                КУПИТЬ
              </Button>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={12} style={{ height: "100%" }}>
          {/* <Skeleton height="100%" radius="md" animate={false} /> */}
          <Title my={20} order={3}>
            О книге:
          </Title>
          <Text>
            Книга, покорившая мир, эталон литературы для читателей всех
            возрастов, синоним успеха. Книга, сделавшая Дж.К. Роулинг самым
            читаемым писателем современности. "Гарри Поттер и Тайная комната" –
            история продолжается.
          </Text>
        </Grid.Col>
        <Grid.Col span={12} style={{ height: "20rem" }}>
          {/* <Skeleton height="100%" radius="md" animate={false} /> */}
          <Title my={20} order={3}>
            Отзывы читателей:
          </Title>
          <Divider my="sm" />
          <Group>
            <Avatar radius="xl" />
            <div>
              <Text size="sm">{"Васисуалий Лоханкин"}</Text>
              <Text size="xs" color="dimmed">
                05.05.2023 г.
              </Text>
            </div>
          </Group>
          <Text size="sm">
            Гарри Поттер и Тайная комната" - это увлекательное продолжение
            приключений юного волшебника, которое смогло захватить меня с первых
            страниц. Я был увлечен уникальной атмосферой магического мира,
            которую так мастерски создает Джоан Роулинг, и не мог оторваться от
            книги до последней страницы. Персонажи, включая Гарри, Рона и
            Гермиону, были так живо и убедительно описаны, что я чувствовал,
            будто сам нахожусь в Хогвартсе и учусь там вместе с ними. "Тайная
            комната" - это остроумный и захватывающий роман, который порадует
            любого поклонника жанра фэнтези. Я рекомендую его всем, кто ищет
            захватывающую и захватывающую историю, полную магии, приключений и
            дружбы.
          </Text>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
