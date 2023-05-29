import { Grid, Title } from "@mantine/core";
import React from "react";

export const EmptyCart = () => {
  return (
    <Grid>
      <Title align="center" order={1} pb={10}>
        Товары в корзине отсутствуют
      </Title>
    </Grid>
  );
};
