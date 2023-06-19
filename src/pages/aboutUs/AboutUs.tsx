import {
  Button,
  Container,
  Grid,
  List,
  Space,
  Text,
  Title,
  Divider,
  Center,
  useMantineTheme,
} from "@mantine/core";
import { FcOk } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { Carusel } from "../../components/carusel/Carusel";
import { setPaginationPage } from "../../redux/sortSlice";
import { useAppDispatch } from "../../redux/redux.hooks";
import { Footer } from "../../components/footer/Footer";
import { IMAGES_CARUSEL_ABOUT_US } from "../../common/constants";
import styles from "./aboutUs.module.css";
import { useMediaQuery } from "@mantine/hooks";

export const AboutUs = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const theme = useMantineTheme();

  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  const pathHandler = () => {
    dispatch(setPaginationPage(1));

    navigate("/books-list/Все книги");
  };

  return (
    <>
      <Container>
        <Center>
          <Carusel
            imageUrl={IMAGES_CARUSEL_ABOUT_US}
            maxWidth={"65%"}
            // height={"55%"}
          />
        </Center>
        {/* <Space h="xl" /> */}

        <Divider my="sm" color="orange" />

        <Title
          className={styles.button}
          order={1}
          align="center"
          fw={"bolder"}
          ff={"monospace"}
          fz={mobile ? 30 : 40}
          my={"xl"}
        >
          МИР КНИГ в Москве
        </Title>

        <Divider my="sm" color="orange" />

        <Space h="xl" />

        <Text mt={20} size="lg">
          Добро пожаловать в МИР КНИГ - особенный магазин от книжных экспертов.
          Здесь вы встретите богатый выбор книг разных жанров и направлений, а
          также получите возможность приобрести их по самым привлекательным
          акциям и скидкам.
        </Text>

        <Text size="lg">
          Наш магазин родился в 2010 году и с того времени продал столько книг,
          что ими можно было бы выложить дорогу от Москвы до Петербурга. 😉
        </Text>

        <Text size="lg">
          У нас вы найдете книги на любой вкус и цвет: от классики до
          фантастики, от детективов до поэзии, от бизнеса до психологии.
        </Text>

        <Space h="xl" />

        <Grid>
          <Grid.Col span={12}>
            <Title order={2} pb={10}>
              Мы рады предложить вам:
            </Title>

            <List icon={<FcOk />} spacing="md" size="lg" center>
              <List.Item>Большой выбор книг в наличии и под заказ.</List.Item>
              <List.Item>
                Низкие цены: мы работаем напрямую с издательствами и постоянно
                проводим акции и скидки.
              </List.Item>
              <List.Item>
                Быструю доставку: мы доставляем по Москве и области в течение
                1-2 дней с помощью курьеров или постаматов.
              </List.Item>
              <List.Item>
                Удобный самовывоз: вы можете забрать свой заказ в одном из наших
                пунктов выдачи, расположенных в разных районах Москвы.
              </List.Item>
              <List.Item>
                Качественный сервис: мы гарантируем безопасность оплаты,
                надежную упаковку и возврат товара в случае необходимости.
              </List.Item>
              <List.Item>
                Интересный контент: яркие истории в блогах от наших поклонников
                книг.
              </List.Item>
              <List.Item>
                Автографы: у нас множество книг с автографами авторов и
                иллюстраторов. Это уникальная возможность получить эксклюзивный
                подарок или сувенир.
              </List.Item>
              <List.Item>
                Кэшбэк: для постоянных покупателей МИР КНИГ - самое выгодное
                место в мире. За каждую покупку вы получаете баллы, которые
                можно потратить на следующий заказ или обменять на подарочные
                сертификаты.
              </List.Item>
              <List.Item>
                Подарки: мы любим баловать наших покупателей приятными
                сюрпризами. При заказе от определенной суммы вы можете получить
                бесплатную книгу, набор открыток, магнит или другой подарок на
                выбор.
              </List.Item>
              <List.Item>
                Конкурсы: мы регулярно проводим конкурсы в наших социальных
                сетях, где вы можете выиграть ценные призы: книги, гаджеты,
                подписки и даже поездки.
              </List.Item>
              <List.Item>
                Общение: мы всегда рады общаться с нашими покупателями и слушать
                их пожелания и отзывы. Вы можете связаться с нами по телефону,
                электронной почте или в социальных сетях. Мы будем рады ответить
                на ваши вопросы и помочь вам с выбором книг.
              </List.Item>
            </List>
          </Grid.Col>

          <Grid.Col span={12}>
            <Space h={50} />
            <Button
              variant="gradient"
              size="xl"
              w={"100%"}
              onClick={pathHandler}
            >
              Перейти к покупкам
            </Button>
          </Grid.Col>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};
