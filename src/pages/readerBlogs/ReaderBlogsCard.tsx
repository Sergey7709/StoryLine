import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../../common/types";
import {
  BackgroundImage,
  Center,
  Grid,
  Group,
  Paper,
  Space,
  Text,
} from "@mantine/core";
import { GoBackButton } from "../../components/GoBackButton";
import { useAppSelector } from "../../redux/redux.hooks";

export const ReaderBlogsCard = () => {
  const { id } = useParams();

  const dataReaderBlogs = useAppSelector(
    (stateReaderBlogs) => stateReaderBlogs.readerBlogs.dataReaderBlogs
  );

  const blog = dataReaderBlogs?.filter((el: Post) => el.id === Number(id));

  return (
    <>
      {blog?.map((el: Post) => (
        <Grid
          key={el.id}
          m={-16}
          pt={"xs"}
          justify="center"
          align="center"
          sx={(theme) => ({
            height: "105%",
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[3],
          })}
        >
          <BackgroundImage
            my={-15}
            src="https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3870&q=80"
          >
            <Center p="md">
              <Paper w={800} shadow="lg" p="md" mb={20} radius="lg" withBorder>
                <Group spacing={10}>
                  <GoBackButton variant={"subtle"} size={"xs"} color="teal" />

                  <Text fw={"bold"} fz="xl">
                    Автор: {el.authorName}
                  </Text>
                </Group>

                <Text pl={70}>дата: {el.date}</Text>

                <Space h="md" />

                <Text
                  fw={600}
                  fz="md"
                  ff={"sans-serif"}
                  ta={"justify"}
                  mb={50}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {el.description}
                </Text>
              </Paper>
            </Center>
          </BackgroundImage>
        </Grid>
      ))}
    </>
  );
};
