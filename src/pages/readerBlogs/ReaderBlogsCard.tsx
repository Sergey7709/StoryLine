import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../../common/types";
import { useQuery } from "react-query";
import { fetchHandler } from "../../api/postOrReviewApi";
import { paramsReaderBlogs } from "../../common/constants";
import { Grid, Paper, Text } from "@mantine/core";
import { Loader } from "../../components/loader/Loader";

export const ReaderBlogsCard = () => {
  const { id } = useParams();

  const { data, isLoading, isSuccess } = useQuery(["readerBlogsCard"], () =>
    fetchHandler("get", paramsReaderBlogs)
  );

  const blog = isSuccess && data?.filter((el: Post) => el.id === Number(id));

  console.log(id);
  // console.log(blog.description);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        blog.map((el: any) => (
          <Grid justify="center" align="center">
            <Paper w={800} shadow="xs" p="md" withBorder>
              <div>
                <Text fw={"bold"} fz="xl">
                  {el.authorName}
                </Text>
                <Text fz="md">{el.description}</Text>
              </div>
            </Paper>
          </Grid>
        ))
      )}
    </>
  );
};
