import { useQueryClient } from "react-query";
import { notifications } from "@mantine/notifications";
import { useCallback } from "react";
import { PostReaderBlogs, PostUpdate } from "../common/types";
import { FetchType } from "./postOrReviewApi";
import { useCurrentUser } from "../hooks/useCurrenUser";
import { useAppSelector } from "../redux/redux.hooks";

export const usePostReaderBlogs = (props: PostReaderBlogs) => {
  const { mutatePost, postForm, close } = props;

  const user = useAppSelector((state) => state.auth.user);

  const getCurrentUser = useCurrentUser();

  const queryClient = useQueryClient();

  const submitPost = useCallback(
    async (type: FetchType, id?: number) => {
      try {
        switch (type) {
          case "post": {
            user?.token &&
              (await mutatePost.mutateAsync({
                type,
                params: "post/create",
                body: postForm,
                token: user.token,
              }));
            getCurrentUser();
            queryClient.invalidateQueries("readerBlogs");
            break;
          }
          case "put": {
            if (!id) throw new Error("Не верный ID поста");
            const updatePostForm: PostUpdate = {
              ...postForm,
              id,
            };
            user?.token &&
              (await mutatePost.mutateAsync({
                type,
                body: updatePostForm,
                params: "post/" + id.toString(),
                token: user.token,
              }));
            getCurrentUser();
            queryClient.invalidateQueries("readerBlogs");
            break;
          }
          case "delete": {
            if (!id) throw new Error("Не верный ID поста");
            user?.token &&
              (await mutatePost.mutateAsync({
                type,
                params: "post/" + id.toString(),
                token: user.token,
              }));
            getCurrentUser();
            queryClient.invalidateQueries("readerBlogs");
            break;
          }
          default:
            throw new Error("Неверный тип экшена");
        }
        notifications.show({
          color: "green",
          autoClose: 3000,
          title: `Пост успешно ${
            type === "post"
              ? " добавлен"
              : type === "put"
              ? "изменен"
              : "удален"
          }`,
          message: "",
        });
        close();
      } catch (err) {
        console.log(err);
        notifications.show({
          color: "red",
          autoClose: 3000,
          title: "Ошибка",
          message: "Попробуйте позже",
        });
      }
    },
    [close, getCurrentUser, mutatePost, postForm, user?.token]
  );

  return submitPost;
};
