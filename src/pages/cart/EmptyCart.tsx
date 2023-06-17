import { Button, Grid, Title, Text, Image, Center } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/redux.hooks";
import { setPaginationPage } from "../../redux/sortSlice";

export const EmptyCart = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const pathHandler = () => {
    dispatch(setPaginationPage(1));

    navigate("/books-list/Все книги");
  };

  return (
    <Grid justify="center" align="center">
      <Grid.Col span={12}>
        <Title align="center" order={1} pb={10}>
          Товары в корзине отсутствуют
        </Title>
        <Grid.Col span={12}>
          <Center>
            <Image
              maw={400}
              src={"https://svgsilh.com/svg/3225130.svg"}
            ></Image>
          </Center>
        </Grid.Col>
      </Grid.Col>
      <Grid.Col pt={20} span={12}>
        <Center>
          <Button
            variant="light"
            color="blue"
            size="xl"
            maw={500}
            onClick={pathHandler}
          >
            <Text>Перейти к покупкам</Text>
          </Button>
        </Center>
      </Grid.Col>
    </Grid>
  );
};
