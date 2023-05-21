import {
  Container,
  Grid,
  Group,
  Image,
  Text,
  Title,
  Badge,
  Button,
  Divider,
  Modal,
  Flex,
} from "@mantine/core";
import { Rating } from "@mantine/core";
import CartBar from "../../components/cartCount/CartBar";
import { Link, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { fetchItem } from "../../api/itemsApi";
import { Loader } from "../../components/loader/Loader";
import { Item, ReviewUpdate } from "../../common/types";
import ReviewsList from "./ReviewsList";
import EmptyData from "../userAccount/assetsUserAccount/EmptyData";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { fetchHandler } from "../../api/postOrReviewApi";
import { useCurrentUser } from "../../hooks/useCurrenUser";
import { useAppSelector } from "../../redux/redux.hooks";
import { FetchReviewArgs } from "../userAccount/MyReviews";
import { notifications } from "@mantine/notifications";
import { getCurrentDate } from "../../helpers/getCurrentDate";
import PricesDiscount from "./UI/PricesDiscount";
import ModalReviewFields from "./UI/ModalReviewFields";

export const BookCard = () => {
  const initialReviewState = {
    date: getCurrentDate(),
    text: "",
    rate: 1,
  };
  const slug = useParams();
  const { mutateAsync, data, isLoading } = useMutation<Item, string, string>(
    fetchItem
  );

  useEffect(() => {
    if (slug.id) mutateAsync(slug.id);
  }, [mutateAsync, slug.id]);
  const user = useAppSelector((state) => state.auth.user);
  const getCurrentUser = useCurrentUser();
  const [opened, { close, open }] = useDisclosure(false);
  const [review, setReview] = useState<ReviewUpdate>(initialReviewState);
  const reviewMutation = useMutation((args: FetchReviewArgs) =>
    fetchHandler(args.type, args.params, args.body, args.token)
  );

  const submitReview = async (itemId: number) => {
    if (!user) {
      return notifications.show({
        color: "red",
        autoClose: 3000,
        title: "Отзывы могут оставлять только зарегестрированные пользователи",
        message: "",
      });
    }
    if (review.text.trim() === "") {
      return notifications.show({
        color: "red",
        autoClose: 3000,
        title: "Отзыв не может быть пустым",
        message: "",
      });
    }
    try {
      const params = `review/${itemId}`;
      await reviewMutation.mutateAsync({
        type: "post",
        params,
        body: review,
        token: user.token,
      });
      getCurrentUser();
      await mutateAsync(slug.id ?? "");
      close();
      notifications.show({
        color: "green",
        autoClose: 3000,
        title: "Успешно",
        message: "Отзыв добавлен",
      });
    } catch (err: any) {
      close();
      notifications.show({
        color: "red",
        autoClose: 3000,
        title: "Ошибка",
        message: err.response.data.message.includes("already")
          ? "Вы уже оставляли отзыв на этот товар"
          : "Попробуйте позже",
      });
    }
    setReview(initialReviewState);
  };

  return (
    <Container my="xl">
      <Modal size="lg" opened={opened} onClose={close} centered>
        <ModalReviewFields setReview={setReview} review={review} />
        <Button
          onClick={() => {
            if (data) submitReview(data.id);
          }}
          loading={reviewMutation.isLoading}
        >
          Написать отзыв
        </Button>
      </Modal>
      <Link to="/books-list">
        <Button>Назад</Button>
      </Link>
      {isLoading ? (
        <Loader />
      ) : (
        data && (
          <Grid gutter="lg">
            <Grid.Col xs={12} sm={4} offsetXs={3} offsetSm={3}>
              <Title size="h3">{data.title}</Title>
            </Grid.Col>
            <Grid.Col
              xs={12}
              sm={4}
              offsetXs={3}
              offsetSm={3}
              style={{ height: "30rem" }}
            >
              <Image maw={"18rem"} src={data.itemImageUrl} alt="book img" />
            </Grid.Col>
            <Grid.Col xs={12} sm={4} offsetXs={3} offsetSm={0}>
              <Grid gutter="sm" ml={30}>
                <Grid.Col xs={12} style={{ height: "5rem" }}>
                  <Text mb={10}>
                    <Button p={0} variant="white" mr={10} onClick={open}>
                      Оценить
                    </Button>
                    (оценило: {data.reviews.length})
                  </Text>
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
                <Grid.Col span={6} style={{ height: "10rem" }}>
                  <Flex justify="center" mb={10}>
                    <PricesDiscount
                      price={data.price}
                      discount={data.discount}
                    />
                  </Flex>
                  <CartBar />
                  <Button
                    variant="gradient"
                    mt={10}
                    fullWidth
                    gradient={{ from: "teal", to: "lime", deg: 105 }}
                  >
                    КУПИТЬ
                  </Button>
                </Grid.Col>
              </Grid>
            </Grid.Col>
            <Grid.Col span={12} style={{ height: "100%" }}>
              <Title my={20} order={3}>
                О книге:
              </Title>
              <Text>{data.description}</Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Title my={20} order={3}>
                Отзывы читателей:
              </Title>
              <Divider my="sm" />
              {data.reviews.length ? (
                data.reviews.map((r) => <ReviewsList review={r} key={r.id} />)
              ) : (
                <EmptyData text="Нет отзывов" />
              )}
            </Grid.Col>
          </Grid>
        )
      )}
    </Container>
  );
};
