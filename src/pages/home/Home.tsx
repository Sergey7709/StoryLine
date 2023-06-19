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
} from "@mantine/core";
import { useStyles } from "../../components/headerMenu/headerMenuStyles";
import { SlBookOpen } from "react-icons/sl";
import { GiTrophyCup } from "react-icons/gi";
import { SiLeaderprice } from "react-icons/si";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { Footer } from "../../components/footer/Footer";
import { Link } from "react-router-dom";

export const Home = () => {
  const { classes } = useStyles();

  const featureData = [
    {
      icon: <SlBookOpen size={50} color="indigo" />,
      text: "Самые свежие обзоры книг",
    },
    {
      icon: <GiTrophyCup size={50} color="indigo" />,
      text: "Привилегии постоянным покупателям",
    },
    {
      icon: <SiLeaderprice size={50} color="indigo" />,
      text: "Самые привлекательные цены",
    },
    {
      icon: <HiOutlineRocketLaunch size={50} color="indigo" />,
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
                    className={classes.image}
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
                <Text w={150} color="indigo.8" align="center">
                  {data.text}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Grid.Col>
      </Grid>

      <Space h={80} />

      <Footer />
    </>
  );
};
