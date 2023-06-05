import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { fetchHandler } from "../../api/postOrReviewApi";
import {
  Post,
  PostCreate,
  UpdatePostArgs,
  initialPostState,
} from "../../common/types";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useAppSelector } from "../../redux/redux.hooks";
import { Loader } from "../../components/loader/Loader";
import { ReaderBlogsModalForm } from "./ReaderBlogsModalForm";
import { paramsReaderBlogs } from "../../common/constants";
import { usePostReaderBlogs } from "../../api/usePostReaderBlogs";
import { ReaderBlogsLayout } from "./ReaderBlogsLayout";
import { ReaderBlogsButton } from "./ReaderBlogsButton";

export const ReaderBlogs = () => {
  const user = useAppSelector((state) => state.auth.user);

  const mutatePost = useMutation((args: UpdatePostArgs) =>
    fetchHandler(args.type, args.params, args?.body, args.token)
  );

  const [currentPost, setCurrentPost] = useState<number | "create">(0);

  const [postForm, setPostForm] = useState<Post | PostCreate>(initialPostState);

  const [opened, { open, close }] = useDisclosure(false);

  const [onAuth, { open: openAuth, close: closeAuth }] = useDisclosure(false);

  const post: Post | PostCreate = useMemo(() => {
    const findPost = user?.posts.find((el: Post) => el.id === currentPost);
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
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ReaderBlogsModalForm
            opened={opened}
            close={close}
            postForm={postForm}
            setPostForm={setPostForm}
            currentPost={currentPost}
            mutatePost={mutatePost}
            submitPost={submitPost}
            onAuth={onAuth}
            closeAuth={closeAuth}
          />

          <ReaderBlogsButton addPostHandler={addPostHandler} />

          <ReaderBlogsLayout
            data={data}
            open={open}
            setCurrentPost={setCurrentPost}
          />
        </>
      )}
    </>
  );
};
