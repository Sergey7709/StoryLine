import { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
import { Grid } from "@mantine/core";
import { useCurrentUser } from "../../hooks/useCurrenUser";

export const ReaderBlogs = () => {
  const user = useAppSelector((state) => state.auth.user);

  const mutatePost = useMutation((args: UpdatePostArgs) =>
    fetchHandler(args.type, args.params, args?.body, args.token)
  ); //! вынести в api

  const [currentPost, setCurrentPost] = useState<number | "create">(0);

  const [addLike, setAddLike] = useState(false); //!

  // const getCurrentUser = useCurrentUser(); //!
  const queryClient = useQueryClient(); //!

  const [postForm, setPostForm] = useState<Post | PostCreate>(initialPostState);

  const [opened, { open, close }] = useDisclosure(false);

  const [onAuth, { open: openAuth, close: closeAuth }] = useDisclosure(false);

  const post: Post | PostCreate = useMemo(() => {
    const findPost = user?.posts.find((el: Post) => el.id === currentPost);
    return currentPost === "create" || findPost === undefined
      ? initialPostState
      : findPost;
  }, [user?.posts]);

  useEffect(() => {
    setPostForm(post);
  }, [post]);

  // useEffect(() => {
  //   if (addLike) {
  //     user?.token &&
  //       mutatePost.mutateAsync({
  //         type: "put",
  //         params: `post/${currentPost}`,
  //         body: postForm,
  //         token: user.token,
  //       });
  //     setAddLike(false);
  //     // getCurrentUser();
  //   }
  // }, [addLike]); //!

  const { data, isLoading } = useQuery<Post[]>(
    // ["readerBlogs", mutatePost.isSuccess],
    ["readerBlogs"],
    () => fetchHandler("get", paramsReaderBlogs)
  ); //! вынести в api

  useEffect(() => {
    const updatePostLike = async () => {
      if (addLike) {
        if (user?.token) {
          await fetchHandler(
            "put",
            `post/${currentPost}`,
            postForm,
            user.token
          );
          queryClient.refetchQueries(["readerBlogs"]);
          setAddLike(false);
        }
      }
    };
    updatePostLike();
  }, [addLike]);

  // useEffect(() => {
  //   const updatePostLike = () => {
  //     if (addLike) {
  //       if (user?.token) {
  //         fetchHandler("put", `post/${currentPost}`, postForm, user.token);
  //         queryClient.invalidateQueries(["readerBlogs"]);
  //         // mutatePost.mutateAsync(
  //         //   {
  //         //     type: "put",
  //         //     params: `post/${currentPost}`,
  //         //     body: postForm,
  //         //     token: user.token,
  //         //   },
  //         //   {
  //         //     onSuccess: () => {
  //         //       // queryClient.invalidateQueries(["readerBlogs"]);
  //         //       setAddLike(false);
  //         //     },
  //         //   }
  //         // );
  //       }

  //       // getCurrentUser();
  //     }
  //   };

  //   updatePostLike();
  // }, [addLike]);//!

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

  const addCurrentPost = (id: number) => {
    setCurrentPost(id);
  }; //!

  const addLikeHandler = ({
    description,
    postImageUrl,
    title,
    date,
    likes,
    id,
  }: PostCreate & {
    id: number;
  }) => {
    setAddLike(true);
    setCurrentPost(id);
    setPostForm({
      description,
      postImageUrl,
      title,
      date,
      likes: likes + 1,
      id,
    });
  }; //!

  // console.log("postForm.likes", postForm.likes); //!
  console.log("isLoading", isLoading);
  // console.log("addLike", addLike); //!

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid>
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
            addCurrentPost={addCurrentPost}
            addLikeHandler={addLikeHandler}
            // likeLoad={mutatePost.isLoading}
          />
        </Grid>
      )}
    </>
  );
};
