import {
  Modal,
  Button,
  Grid,
  Title,
  Group,
  Badge,
  Rating,
  Flex,
  Divider,
  Image,
  Text,
  Container,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { CartCount } from "../../components/cartCount/CartCount";
import EmptyData from "../userAccount/assetsUserAccount/EmptyData";
import ReviewsList from "./ReviewsList";
import ModalReviewFields from "./UI/ModalReviewFields";
import PricesDiscount from "./UI/PricesDiscount";
import { BookCardLayoutProps } from "../../common/types";
import { Loader } from "../../components/loader/Loader";
import { FC } from "react";
import { GoBackButton } from "../../components/GoBackButton";

export const BookCardLayout: FC<BookCardLayoutProps> = (props) => {
  const {
    data,
    isLoading,
    countBar,
    incrementCountBar,
    decrementCountBar,
    handleChangeCountBar,
    handleAddCartItem,
    opened,
    close,
    setReview,
    review,
    submitReview,
    reviewMutation,
    open,
  } = props;

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

      {!isLoading && (
        <GoBackButton
          variant={"gradient"}
          size={"xs"}
          gradient={{ from: "indigo", to: "cyan" }}
          text={"ВЕРНУТЬСЯ"}
        />
      )}

      {isLoading ? (
        <Loader title="Ищем выбранную книгу..." />
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

                  <CartCount
                    book={data}
                    countBar={countBar}
                    incrementCountBar={incrementCountBar}
                    decrementCountBar={decrementCountBar}
                    handleChangeCountBar={handleChangeCountBar}
                  />

                  <Button
                    onClick={handleAddCartItem}
                    variant="gradient"
                    mt={10}
                    fullWidth
                    gradient={{ from: "teal", to: "lime", deg: 105 }}
                  >
                    <Text>В КОРЗИНУ</Text>
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
