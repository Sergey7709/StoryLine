import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
  rem,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(200),
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colors[theme.primaryColor][3],

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(38),
    color: theme.white,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(540),
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colors[theme.primaryColor][1],
  },
}));

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
        <div className={classes.label}>500</div>
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
