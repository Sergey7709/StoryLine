import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../../common/types";
import { Center, Grid, Group, Paper, Space, Text } from "@mantine/core";
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
          <Center p="md">
            <Paper
              w={800}
              shadow="lg"
              p="md"
              mb={20}
              radius="lg"
              withBorder
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.blue[0],
              })}
            >
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
        </Grid>
      ))}
    </>
  );
};
