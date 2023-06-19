import { Title, Text, Button, Container, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./ServerErrorStyles";

export const ServerError = () => {
  const navigate = useNavigate();
  const onClickToHome = () => {
    navigate("/");
  };
  const { classes } = useStyles();

  const refreshClick = () => {
    window.location.reload();
  };

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>{"Error"}</div>
        <Title className={classes.title}>Сервер не отвечает...</Title>
        <Text size="lg" align="center" className={classes.description}>
          Наши серверы не смогли обработать ваш запрос. Не волнуйтесь, наша
          команда разработчиков уже была уведомлена. Попробуйте обновить
          страницу.
        </Text>
        <Group position="center">
          <Button
            color="green"
            variant="white"
            size="md"
            onClick={refreshClick}
          >
            Обновить страницу
          </Button>
          <Button
            color="yellow"
            variant="white"
            size="md"
            onClick={onClickToHome}
          >
            Перейти на главную
          </Button>
        </Group>
      </Container>
    </div>
  );
};
