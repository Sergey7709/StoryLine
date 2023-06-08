import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../../common/types";
import { useQuery } from "react-query";
import { fetchHandler } from "../../api/postOrReviewApi";
import { paramsReaderBlogs } from "../../common/constants";
import { ActionIcon, Grid, Group, Paper, Space, Text } from "@mantine/core";
import { Loader } from "../../components/loader/Loader";
import { FaPenNib } from "react-icons/fa";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import { GoBackButton } from "../../components/GoBackButton";
import { useAppDispatch, useAppSelector } from "../../redux/redux.hooks";

export const ReaderBlogsCard = () => {
  const { id } = useParams();

  // const { data, isLoading, isSuccess } = useQuery(["readerBlogsCard"], () =>
  //   fetchHandler("get", paramsReaderBlogs)
  // );

  // const blog = isSuccess && data?.filter((el: Post) => el.id === Number(id));

  const dataReaderBlogs = useAppSelector(
    (stateReaderBlogs) => stateReaderBlogs.readerBlogs.dataReaderBlogs
  ); //!

  const blog = dataReaderBlogs?.filter((el: Post) => el.id === Number(id));

  return (
    <>
      {/* {isLoading ? (
        <Loader />
      ) : (
        <> */}
      {blog?.map((el: Post) => (
        <Grid
          key={el.id}
          m={-16}
          pt={"xl"}
          justify="center"
          align="start"
          sx={(theme) => ({
            height: "200vh",
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.violet[5],
          })}
        >
          <Paper
            w={800}
            shadow="lg"
            p="md"
            radius="lg"
            withBorder
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[5]
                  : theme.colors.yellow[3],
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
        </Grid>
      ))}
      {/* </>
      )} */}
    </>
  );
};
