import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Grid,
  ActionIcon,
} from "@mantine/core";
import { useStyles } from "./BooksListStyles";
import { BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";

type ItemProps = {
  inStock: boolean;
  title: string;
  itemImageUrl: string;
  description: string;
  category: string;
  publisher: string;
  discount: number;
  pagesCount: number;
  price: number;
  genre: string;
  authorBook: string;
  releaseDate: string;
  typeOfCover: string;
  id: number;
  favorite?: boolean;
};

export const books: ItemProps[] = [
  {
    inStock: true,
    title: "Мастер и Маргарита",
    itemImageUrl:
      "https://www.moscowbooks.ru/image/book/710/orig/i710218.jpg?cu=20201230101528",
    description:
      "Роман Михаила Афанасьевича Булгакова, неоднократно издававшийся в период с 1966 по 1967 годы.",
    category: "Фантастика",
    publisher: "Художественная литература",
    discount: 0,
    pagesCount: 480,
    price: 500,
    genre: "Роман",
    authorBook: "Михаил Булгаков",
    releaseDate: "1966-01-01",
    typeOfCover: "Твердый переплет",
    id: 1,
  },
  {
    inStock: true,
    title: "Война и мир",
    itemImageUrl:
      "https://www.moscowbooks.ru/image/book/669/orig/i669023.jpg?cu=20190902123514",
    description:
      "Эпический роман-хроника Льва Толстого, описывающий события войн и жизнь российского общества в период 1805—1812 годов.",
    category: "Исторический роман",
    publisher: "Эксмо",
    discount: 0,
    pagesCount: 1274,
    price: 1000,
    genre: "Роман",
    authorBook: "Лев Толстой",
    releaseDate: "1869-01-01",
    typeOfCover: "Мягкая обложка",
    id: 2,
  },
  {
    inStock: true,
    title: "451° по Фаренгейту",
    itemImageUrl:
      "https://www.moscowbooks.ru/image/book/543/w259/i543138.jpg?cu=20180101000000",
    description:
      "Роман Рэя Брэдбери о жизни в будущем, в котором книги запрещены и сжигаются.",
    category: "Фантастика",
    publisher: "РИПОЛ классик",
    discount: 0,
    pagesCount: 256,
    price: 550,
    genre: "Роман",
    authorBook: "Рэй Брэдбери",
    releaseDate: "1953-01-01",
    typeOfCover: "Твердый переплет",
    id: 3,
  },
  {
    inStock: true,
    title: "О дивный новый мир",
    itemImageUrl:
      "https://www.moscowbooks.ru/image/book/564/w259/i564815.jpg?cu=20180101000000",
    description:
      "Роман Олдоса Хаксли, описывающий будущее общество, где все люди уравнены и живут по системе социального управления.",
    category: "Антиутопия",
    publisher: "Эксмо",
    discount: 25,
    pagesCount: 320,
    price: 800,
    genre: "Роман",
    authorBook: "Олдос Хаксли",
    releaseDate: "1932-01-01",
    typeOfCover: "Мягкая обложка",
    id: 4,
  },
  {
    inStock: true,
    title: "Гарри Поттер и философский камень",
    itemImageUrl:
      "https://www.moscowbooks.ru/image/book/454/w259/i454685.jpg?cu=20180101000000",
    description:
      "Первая книга в серии о Гарри Поттере, автором которой является Джоан Роулинг.",
    category: "Фэнтези",
    publisher: "Росмэн",
    discount: 10,
    pagesCount: 256,
    price: 450,
    genre: "Роман",
    authorBook: "Джоан Роулинг",
    releaseDate: "1997-06-26",
    typeOfCover: "Твердый переплет",
    id: 5,
  },
  {
    inStock: true,
    title: "Гарри Поттер и Тайная комната",
    itemImageUrl:
      "https://img4.labirint.ru/rc/8c1237b3f043b854dec5bd6c9d44d02c/363x561q80/books44/435204/cover.jpg?1670073964",
    description:
      "Вторая книга в серии о Гарри Поттере, автором которой является Джоан Роулинг.",
    category: "Фэнтези",
    publisher: "Росмэн",
    discount: 15,
    pagesCount: 384,
    price: 550,
    genre: "Роман",
    authorBook: "Джоан Роулинг",
    releaseDate: "1998-07-02",
    typeOfCover: "Мягкая обложка",
    id: 6,
  },
  {
    inStock: true,
    title: "Гарри Поттер и узник Азкабана",
    itemImageUrl:
      "https://www.moscowbooks.ru/image/book/466/w259/i466300.jpg?cu=20180101000000",
    description:
      "Третья книга в серии о Гарри Поттере, автором которой является Джоан Роулинг.",
    category: "Фэнтези",
    publisher: "Росмэн",
    discount: 0,
    pagesCount: 480,
    price: 700,
    genre: "Роман",
    authorBook: "Джоан Роулинг",
    releaseDate: "1999-07-08",
    typeOfCover: "Твердый переплет",
    id: 7,
  },
  {
    inStock: true,
    title: "Преступление и наказание",
    itemImageUrl:
      "https://www.moscowbooks.ru/image/book/355/orig/i355030.jpg?cu=20180101000000",
    description:
      "Роман Федора Достоевского, описывающий жизнь Раскольникова, бывшего студента, который убивает зажиточную старушку, чтобы забрать ее деньги.",
    category: "Классика",
    publisher: "Эксмо",
    discount: 15,
    pagesCount: 544,
    price: 650,
    genre: "Роман",
    authorBook: "Федор Достоевский",
    releaseDate: "1866-01-01",
    typeOfCover: "Мягкая обложка",
    id: 8,
  },
  {
    inStock: true,
    title: "Анна Каренина",
    itemImageUrl:
      "https://www.moscowbooks.ru/image/book/410/orig/i410282.jpg?cu=20180101000000",
    description:
      "Роман Льва Толстого о жизни высшего общества России в конце 19 века.",
    category: "Классика",
    publisher: "Эксмо",
    discount: 0,
    pagesCount: 864,
    price: 850,
    genre: "Роман",
    authorBook: "Лев Толстой",
    releaseDate: "1877-01-01",
    typeOfCover: "Твердый переплет",
    id: 9,
  },
  {
    inStock: true,
    title: "Алиса в стране чудес",
    itemImageUrl:
      "https://www.moscowbooks.ru/image/book/768/w259/i768813.jpg?cu=20221207150502",
    description:
      "Роман Льюиса Кэрролла о девочке Алисе, которая попадает в страну чудес.",
    category: "Детская литература",
    publisher: "Азбука",
    discount: 20,
    pagesCount: 224,
    price: 400,
    genre: "Фантастика",
    authorBook: "Льюис Кэрролл",
    releaseDate: "1865-11-26",
    typeOfCover: "Мягкая обложка",
    id: 10,
  },
];

export const BooksList = () => {
  const { classes } = useStyles();

  return (
    <Grid className={classes.grid} align="center">
      {books.map((book, index) => (
        <Grid.Col
          xs={6}
          sm={4}
          md={4}
          lg={3}
          xl={2}
          className={classes.gridCol}
          key={index}
        >
          <Card
            key={book.id}
            className={classes.card}
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
          >
            <Group position="apart">
              <Link to="/book">
                <Image
                  width={"8rem"}
                  height={"12rem"}
                  src={book.itemImageUrl}
                  alt="book img"
                />
              </Link>
              {book.discount > 0 && (
                <Badge
                  className={classes.discount}
                  color="orange"
                  variant="filled"
                >
                  <Text fz={"md"} fw={500}>{`-${book.discount}%`}</Text>
                </Badge>
              )}
              <ActionIcon
                variant="transparent"
                className={classes.action_favorite}
              >
                {book?.favorite ? (
                  <BsBookmarkCheckFill
                    className={classes.favorite_on}
                    size="4rem"
                  />
                ) : (
                  <BsBookmarkCheck
                    className={classes.favorite_off}
                    size="4rem"
                  />
                )}
              </ActionIcon>
            </Group>
            <Grid mt={10} pl={10} mb={5} gutter={0}>
              <Grid.Col span={12}>
                <Text align="start" size="sm" color="dimmed" lineClamp={2}>
                  {book.authorBook}
                </Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <Text weight={500} lineClamp={2}>
                  {book.title}
                </Text>
              </Grid.Col>
            </Grid>
            <Text className={classes.text} weight={600} size="lg" color="green">
              {`${book.price} руб.`}
            </Text>

            <Button
              className={classes.buy}
              variant="gradient"
              gradient={{ from: "teal", to: "blue", deg: 60 }}
              color="blue"
              radius="md"
              w={"12rem"}
            >
              КУПИТЬ
            </Button>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
};
