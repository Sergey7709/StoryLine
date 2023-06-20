import { Carusel } from "../../components/carusel/Carusel";
import { IMAGES_CARUSEL_HOME } from "../../common/constants";
import {
  Image,
  Grid,
  Group,
  Paper,
  UnstyledButton,
  Text,
  SimpleGrid,
  Stack,
  Space,
  Title,
  Center,
  useMantineTheme,
} from "@mantine/core";
import { useStyles } from "../../components/headerMenu/headerMenuStyles";
import { SlBookOpen } from "react-icons/sl";
import { GiTrophyCup } from "react-icons/gi";
import { SiLeaderprice } from "react-icons/si";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { Footer } from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import styles from "./home.module.css";
import { useMediaQuery } from "@mantine/hooks";

export const Home = () => {
  const { classes } = useStyles();

  const theme = useMantineTheme();

  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  const featureData = [
    {
      icon: <SlBookOpen size={50} color="DarkSlateBlue" />,
      text: "Самые свежие обзоры книг",
    },
    {
      icon: <GiTrophyCup size={50} color="DarkSlateBlue" />,
      text: "Привилегии постоянным покупателям",
    },
    {
      icon: <SiLeaderprice size={50} color="DarkSlateBlue" />,
      text: "Самые привлекательные цены",
    },
    {
      icon: <HiOutlineRocketLaunch size={50} color="DarkSlateBlue" />,
      text: "Быстрая доставка",
    },
  ];

  return (
    <>
      <Grid justify="center">
        <Grid.Col span={12}>
          <Group spacing={20} position="center">
            <Paper p={7} shadow="xl">
              <Carusel imageUrl={IMAGES_CARUSEL_HOME} maxWidth={900} />
            </Paper>
            <Paper pt={9} pb={3} px={7} shadow="xl">
              <UnstyledButton>
                <Link to={"/reader-blogs"}>
                  <Image
                    radius={3}
                    className={styles.button}
                    maw={354}
                    src={"https://i.ibb.co/7RLt3DF/7.jpg"}
                  />
                </Link>
              </UnstyledButton>
            </Paper>
          </Group>
        </Grid.Col>

        <Grid.Col px={"10%"} span={12}>
          <SimpleGrid
            cols={4}
            breakpoints={[
              { maxWidth: "62rem", cols: 2, spacing: "md" },
              { maxWidth: "48rem", cols: 2, spacing: "sm" },
            ]}
          >
            {featureData.map((data, index) => (
              <Stack key={index} py={10} align="center">
                <Text align="center">{data.icon}</Text>
                <Text w={150} align="center" color="SlateBlue">
                  {data.text}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Grid.Col>

        <Grid.Col span={12}>
          <Center>
            <Paper w={"70%"} p={7}>
              <Link to={"/books-list/Все книги"}>
                <UnstyledButton w={"100%"}>
                  <Title
                    className={styles.btn}
                    tt={"uppercase"}
                    order={mobile ? 3 : 2}
                    color="red.5"
                    align="center"
                    my={20}
                  >
                    Добро пожаловать в наш книжный интернет-магазин!
                  </Title>
                </UnstyledButton>
              </Link>

              <Space h={50} />

              <Text size="lg" align="justify">
                Мы создали этот сайт для тех, кто любит читать и хочет обогатить
                свой ум и душу качественной литературой. Здесь есть книги на
                любой вкус и цвет: от классики до современной прозы, от
                детективов до фантастики, от поэзии до научной литературы. Вы
                cможете легко найти книгу, которая вас интересует, по названию.
                Мы рады предоставить вам удобный сервис заказа и доставки книг,
                а также различные акции и скидки для наших новых и постоянных
                клиентов. Вы можете оплатить свой заказ онлайн или при получении
                книг. Мы гарантируем быструю и надежную доставку в любой регион
                России. Приятного чтения!
              </Text>
            </Paper>
          </Center>
        </Grid.Col>
      </Grid>

      <Footer />
    </>
  );
};
