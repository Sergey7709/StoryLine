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
import { useAppDispatch, useAppSelector } from "../../redux/redux.hooks";
import { Loader } from "../../components/loader/Loader";
import { ReaderBlogsModalForm } from "./ReaderBlogsModalForm";
import { paramsReaderBlogs } from "../../common/constants";
import { usePostReaderBlogs } from "../../api/usePostReaderBlogs";
import { ReaderBlogsLayout } from "./ReaderBlogsLayout";
import { ReaderBlogsButton } from "./ReaderBlogsButton";
import { Grid } from "@mantine/core";
import { Footer } from "../../components/footer/Footer";
import readerBlogsSlice, {
  getDataReaderBlogs,
} from "../../redux/readerBlogsSlice";

export const ReaderBlogs = () => {
  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch(); //!

  const dataReaderBlogs = useAppSelector(
    (stateReaderBlogs) => stateReaderBlogs.readerBlogs.dataReaderBlogs
  ); //!

  const mutatePost = useMutation((args: UpdatePostArgs) =>
    fetchHandler(args.type, args.params, args?.body, args.token)
  ); //! вынести в api

  const [currentPost, setCurrentPost] = useState<number | "create">(0);

  // const [addLike, setAddLike] = useState(false); //!

  // const queryClient = useQueryClient(); //!

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

  const { data, isLoading, isSuccess } = useQuery<Post[]>(["readerBlogs"], () =>
    fetchHandler("get", paramsReaderBlogs)
  ); //! вынести в api

  useEffect(() => {
    isSuccess && dispatch(getDataReaderBlogs(data));
  }, [isSuccess]); //!

  // useEffect(() => {
  //   const updatePostLike = async () => {
  //     if (addLike) {
  //       if (user?.token) {
  //         await fetchHandler(
  //           "put",
  //           `post/${currentPost}`,
  //           postForm,
  //           user.token
  //         );
  //         queryClient.refetchQueries(["readerBlogs"]);
  //         setAddLike(false);
  //       }
  //     }
  //   };
  //   updatePostLike();
  // }, [addLike]); //!

  const requestAddLike = async (
    postLike: PostCreate & {
      id: number;
    }
  ) => {
    try {
      await fetchHandler("put", `post/${postLike.id}`, postLike, user?.token);

      const blogData = await fetchHandler("get", paramsReaderBlogs);

      dispatch(getDataReaderBlogs(blogData));
    } catch (error) {
      console.error(error);
    }
  }; //???

  const addLikeHandler = useCallback(
    ({
      description,
      postImageUrl,
      title,
      date,
      likes,
      id,
    }: PostCreate & {
      id: number;
    }) => {
      if (user && user.token) {
        const postLike = {
          description,
          postImageUrl,
          title,
          date,
          likes: likes + 1,
          id,
        };
        requestAddLike(postLike);
      }
    },
    []
  ); //???

  // const updatePostLike = () => {
  //   if (addLike) {
  //     if (user?.token) {
  //       fetchHandler("put", `post/${currentPost}`, postForm, user.token);
  //       queryClient.refetchQueries(["readerBlogs"]);
  //       setAddLike(false);
  //     }
  //   }
  // };
  // updatePostLike();

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

  const addCurrentPostHadler = useCallback((id: number) => {
    setCurrentPost(id);
  }, []); //!

  // const addLikeHandler = useCallback(
  //   ({
  //     description,
  //     postImageUrl,
  //     title,
  //     date,
  //     likes,
  //     id,
  //   }: PostCreate & {
  //     id: number;
  //   }) => {
  //     setAddLike(true);
  //     setCurrentPost(id);
  //     setPostForm({
  //       description,
  //       postImageUrl,
  //       title,
  //       date,
  //       likes: likes + 1,
  //       id,
  //     });
  //   },
  //   []
  // ); //!

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
              // data={data}
              data={dataReaderBlogs}
              open={open}
              addCurrentPostHadler={addCurrentPostHadler}
              addLikeHandler={addLikeHandler}
            />
          </Grid>
          <Footer />
        </>
      )}
    </>
  );
};
