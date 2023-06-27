import { Container, Text, Image, Grid, Paper, Button } from "@mantine/core";
import { BLOCK_DATA_STOCKS } from "../../common/constants";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/redux.hooks";
import { currentFilter } from "../../redux/filterSlice";
import { setPaginationPage } from "../../redux/sortSlice";
import { Footer } from "../../components/footer/Footer";

export const Stocks = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const pathHandler = (param: string) => {
    dispatch(currentFilter(param));
    dispatch(setPaginationPage(1));

    navigate(`/books-list/${param}`); //!
  };
  return (
    <>
      <Container size={"sm"}>
        {BLOCK_DATA_STOCKS.map((block) => (
          <Paper key={block.id} shadow="xs" p="md" withBorder mb={40}>
            <Grid gutter={50}>
              <Grid.Col>
                <Image src={block.src} />

                <Button
                  color="green"
                  fullWidth
                  radius={0}
                  onClick={() => pathHandler(block.param)}
                >
                  <Text tt={"uppercase"}>Перейти к покупкам</Text>
                </Button>
              </Grid.Col>

              <Grid.Col>
                {block.text.map((paragraph, index) => (
                  <Text key={index} align="justify" mb={10}>
                    {paragraph}
                  </Text>
                ))}
              </Grid.Col>
            </Grid>
          </Paper>
        ))}
      </Container>
      <Footer />
    </>
  );
};
