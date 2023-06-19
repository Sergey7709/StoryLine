import { notifications } from "@mantine/notifications";
import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { paramsReaderBlogs } from "../common/constants";
import { UpdatePostArgs, Post, PostCreate } from "../common/types";
import { fetchHandler } from "./postOrReviewApi";
import { useAppSelector } from "../redux/redux.hooks";

export const UseReaderBlogsApi = () => {
  const user = useAppSelector((state) => state.auth.user);

  const mutatePost = useMutation((args: UpdatePostArgs) =>
    fetchHandler(args.type, args.params, args?.body, args.token)
  );

  const queryClient = useQueryClient();

  const pageReaderBlogs = useAppSelector(
    (state) => state.readerBlogs.pageReaderBlogs
  );

  const numPages = (pageReaderBlogs - 1) * 4;

  const pagination =
    numPages === 0 ? `&limit=${4}` : `&limit=${4}&offset=${numPages}`;

  const paramsPagination = `${paramsReaderBlogs}${pagination}`;

  const { data: allDataReaderBlogs } = useQuery<Post[]>(
    ["allReaderBlogs", pageReaderBlogs],

    () => fetchHandler("get", `${paramsReaderBlogs}`)
  );

  const { data, isLoading, isSuccess, refetch } = useQuery<Post[]>(
    ["readerBlogs", paramsPagination],

    () => fetchHandler("get", paramsPagination)
  );

  const requestAddLike = useCallback(
    (postLike: PostCreate & { id: number }) => {
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
            queryClient.invalidateQueries("readerBlogs");
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
  );

  return {
    data,
    isLoading,
    isSuccess,
    refetch,
    requestAddLike,
    mutatePost,
    allDataReaderBlogs,
  };
};
