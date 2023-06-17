import { Button, Grid, Title, Text, Image, Center } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

export const EmptyCart = () => {
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
          <Link to={"/books-list/Все книги"}>
            <Button variant="light" color="blue" size="xl" maw={500}>
              <Text>Перейти к покупкам</Text>
            </Button>
          </Link>
        </Center>
      </Grid.Col>
    </Grid>
  );
};
