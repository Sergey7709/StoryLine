import { notifications } from "@mantine/notifications";
import { useCallback } from "react";
import { useMutation, useQuery } from "react-query";
import { paramsReaderBlogs } from "../common/constants";
import { UpdatePostArgs, Post, PostCreate } from "../common/types";
import { fetchHandler } from "./postOrReviewApi";
import { useAppSelector } from "../redux/redux.hooks";

export const UseReaderBlogsApi = () => {
  const user = useAppSelector((state) => state.auth.user);

  const mutatePost = useMutation((args: UpdatePostArgs) =>
    fetchHandler(args.type, args.params, args?.body, args.token)
  ); //! вынести в api

  const { data, isLoading, isSuccess, refetch } = useQuery<Post[]>(
    ["readerBlogs"],
    () => fetchHandler("get", paramsReaderBlogs)
  ); //! вынести в api

  const requestAddLike = useCallback(
    (postLike: PostCreate & { id: number }, refetch: () => void) => {
      if (user && user.token) {
        const updAddLike: UpdatePostArgs = {
          type: "put",
          params: `post/${postLike.id}`,
          body: postLike,
          token: user?.token,
        };

        mutatePost.mutateAsync(updAddLike, {
          onSuccess: () => {
            console.log("add like");
            refetch();
          },
          onError: () => {
            notifications.show({
              message: "Ошибка при добавлении лайка, повторите попытку!",
              autoClose: 5000,
              color: "red",
              fz: "md",
            });
          },
        });
      }
    },
    [user?.token]
  ); //!  //???

  return { data, isLoading, isSuccess, refetch, requestAddLike, mutatePost };
};
