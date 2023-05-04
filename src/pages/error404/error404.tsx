import { Container, Title, Text, Button, Group } from "@mantine/core";

import { useNavigate } from "react-router-dom";
import { Illustration } from "./Illustration";
import { useStyles } from "./Error404Styles";

export function Error404() {
  const navigate = useNavigate();
  const onClickToHome = () => {
    navigate("/");
  };
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Здесь не на что смотреть</Title>
          <Text
            color="dimmed"
            size="lg"
            align="center"
            className={classes.description}
          >
            Страница, которую вы пытаетесь открыть, не существует. Возможно, вы
            неправильно ввели адрес, или страница была перемещена на другой URL.
          </Text>
          <Group position="center">
            <Button onClick={onClickToHome} size="md">
              Вернуться на главную страницу
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
