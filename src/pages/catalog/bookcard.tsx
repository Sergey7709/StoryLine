import {
  Container,
  Grid,
  Group,
  Image,
  Text,
  Title,
  Badge,
  Button,
  Avatar,
  Divider,
} from '@mantine/core';
import { Rating } from '@mantine/core';
import { Spoiler } from '@mantine/core';
import CartBar from '../../components/cartCount/CartBar';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchItem } from '../../api/itemsApi';
import { Loader } from '../../components/loader/Loader';
import { Item } from '../../common/types';
export const BookCard = () => {
  const slug = useParams();
  const { data, isLoading } = useQuery<Item>(['item', slug.id], () => fetchItem(slug.id ?? ''));

  console.log(data);

  return (
    <Container my="xl">
      <Link to="/books-list">
        <Button>Назад</Button>
      </Link>
      {isLoading ? (
        <Loader />
      ) : (
        data && (
          <Grid gutter="lg">
            <Grid.Col offsetSm={3} span={12} style={{ height: '5rem' }}>
              <Title size="h3">{data.title}</Title>
            </Grid.Col>
            <Grid.Col xs={12} sm={4} offsetXs={3} offsetSm={3} style={{ height: '30rem' }}>
              <Image maw={'18rem'} src={data.itemImageUrl} alt="book img" />
            </Grid.Col>
            <Grid.Col xs={12} sm={4} offsetXs={3} offsetSm={0}>
              <Grid gutter="sm" ml={30}>
                <Grid.Col xs={12} style={{ height: '5rem' }}>
                  <Text>Оценить (оценило: )</Text>
                  <Group>
                    <Badge variant="outline">Рейтинг</Badge>
                    <Rating fractions={1} value={data.averageRate} readOnly />
                  </Group>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Text>Автор: {data.authorBook}</Text>
                  <Text>Издательство: {data.publisher}</Text>
                  <Text>Жанр: {data.genre}</Text>
                  <Text>Тип обложки: {data.typeOfCover}</Text>
                  <Text>Дата релиза: {data.releaseDate}</Text>
                  <Text>Страниц: {data.pagesCount}</Text>
                  <Text>ID товара: {data.id}</Text>
                </Grid.Col>
                <Grid.Col span={6} style={{ height: '10rem' }}>
                  <Group>
                    <Text fz={20} color="green">
                      Цена: {data.price} руб.
                    </Text>
                    <CartBar initialQuantity={0} />
                  </Group>
                  <Button
                    variant="gradient"
                    mt={10}
                    fullWidth
                    gradient={{ from: 'teal', to: 'lime', deg: 105 }}>
                    КУПИТЬ
                  </Button>
                </Grid.Col>
              </Grid>
            </Grid.Col>
            <Grid.Col span={12} style={{ height: '100%' }}>
              <Title my={20} order={3}>
                О книге:
              </Title>
              <Text>{data.description}</Text>
            </Grid.Col>
            <Grid.Col span={12} style={{ height: '20rem' }}>
              <Title my={20} order={3}>
                Отзывы читателей:
              </Title>
              <Divider my="sm" />
              <Group>
                <Avatar radius="xl" />
                <div>
                  <Text size="sm">{'Васисуалий Лоханкин'}</Text>
                  <Text size="xs" color="dimmed">
                    05.05.2023 г.
                  </Text>
                </div>
              </Group>
              <Spoiler maxHeight={90} showLabel="Показать больше" hideLabel="Показать меньше">
                <Text size="sm">
                  Гарри Поттер и Тайная комната" - это увлекательное продолжение приключений юного
                  волшебника, которое смогло захватить меня с первых страниц. Я был увлечен
                  уникальной атмосферой магического мира, которую так мастерски создает Джоан
                  Роулинг, и не мог оторваться от книги до последней страницы. Персонажи, включая
                  Гарри, Рона и Гермиону, были так живо и убедительно описаны, что я чувствовал,
                  будто сам нахожусь в Хогвартсе и учусь там вместе с ними. "Тайная комната" - это
                  остроумный и захватывающий роман, который порадует любого поклонника жанра
                  фэнтези. Я рекомендую его всем, кто ищет захватывающую и захватывающую историю,
                  полную магии, приключений и дружбы.
                </Text>
              </Spoiler>
            </Grid.Col>
          </Grid>
        )
      )}
    </Container>
  );
};
