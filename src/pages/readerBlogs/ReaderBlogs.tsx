import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { fetchHandler } from "../../api/postOrReviewApi";
import {
  Post,
  PostCreate,
  UpdatePostArgs,
  initialPostState,
} from "../../common/types";
import { Grid, Button, Text, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useAppSelector } from "../../redux/redux.hooks";
import { Authorization } from "../authorization/Authorization";
import { Loader } from "../../components/loader/Loader";
import { GiNotebook } from "react-icons/gi";
import { ReaderBlogsModalForm } from "./ReaderBlogsModalForm";
import { paramsReaderBlogs } from "../../common/constants";
import { usePostReaderBlogs } from "../../api/usePostReaderBlogs";
import { ReaderBlogsLayout } from "./ReaderBlogsLayout";
import { GoBackButton } from "../../components/GoBackButton";

export const ReaderBlogs = () => {
  const user = useAppSelector((state) => state.auth.user);

  const mutatePost = useMutation((args: UpdatePostArgs) =>
    fetchHandler(args.type, args.params, args?.body, args.token)
  );

  const [currentPost, setCurrentPost] = useState<number | "create">(0);

  const [postForm, setPostForm] = useState<Post | PostCreate>(initialPostState);

  const [opened, { open, close }] = useDisclosure(false);

  const [onAuth, { open: openAuth, close: closeAuth }] = useDisclosure(false); //???

  const post: Post | PostCreate = useMemo(() => {
    const findPost = user?.posts.find((el: Post) => el.id === currentPost); //???
    return currentPost === "create" || findPost === undefined
      ? initialPostState
      : findPost;
  }, [currentPost, user?.posts]);

  useEffect(() => {
    setPostForm(post);
  }, [post]);

  const { data, isLoading } = useQuery(["readerBlogs", mutatePost], () =>
    fetchHandler("get", paramsReaderBlogs)
  );

  const submitPost = usePostReaderBlogs({ mutatePost, postForm, close });

  const addPostHandler = () => {
    if (user) {
      open();
      setCurrentPost("create");
    } else {
      openAuth();
      notifications.show({
        message: "Войдите в аккаунт, чтобы добавить пост",
        autoClose: 5000,
        color: "red",
        fz: "md",
      });
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <ReaderBlogsModalForm
        opened={opened}
        close={close}
        postForm={postForm}
        setPostForm={setPostForm}
        currentPost={currentPost}
        mutatePost={mutatePost}
        submitPost={submitPost}
      />

      <Grid pr={"sm"} pb={"md"} mt={10} gutter={"sm"} justify={"flex-start"}>
        <Grid.Col span="content">
          <GoBackButton
            variant={"gradient"}
            size={"xs"}
            gradient={{ from: "indigo", to: "cyan" }}
            text={"ВЕРНУТЬСЯ"}
          />
        </Grid.Col>
        <Grid.Col span="content">
          <Button
            size="xs"
            // variant="light"
            color="teal"
            onClick={() => {
              addPostHandler();
            }}
          >
            <GiNotebook size={25} />
            <Text fw={"bold"}> ДОБАВИТЬ ПОСТ</Text>
          </Button>
        </Grid.Col>
      </Grid>

      <Modal size={500} opened={onAuth} onClose={closeAuth} centered>
        <Authorization close={closeAuth} />
      </Modal>

      <ReaderBlogsLayout
        data={data}
        open={open}
        setCurrentPost={setCurrentPost}
      />
    </>
  );
};
