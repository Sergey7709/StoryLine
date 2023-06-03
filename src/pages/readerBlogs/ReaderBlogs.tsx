import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { FetchType, fetchHandler } from "../../api/postOrReviewApi";
import { Post, PostCreate, PostUpdate } from "../../common/types";
import {
  Grid,
  Card,
  Group,
  Badge,
  Button,
  Image,
  Text,
  Box,
  Input,
  Modal,
  Textarea,
  UnstyledButton,
  ActionIcon,
  createStyles,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { getCurrentDate } from "../../helpers/getCurrentDate";
import { useCurrentUser } from "../../hooks/useCurrenUser";
import { useAppSelector } from "../../redux/redux.hooks";
import { Authorization } from "../authorization/Authorization";
import { Link, NavLink } from "react-router-dom";
import { Loader } from "../../components/loader/Loader";
import { CiEdit } from "react-icons/ci";
import { AiOutlineLike } from "react-icons/ai";

type UpdatePostArgs = {
  params: string;
  token: string;
  body?: PostUpdate | PostCreate;
  type: FetchType;
};
const initialPostState = {
  description: "",
  postImageUrl: "",
  title: "",
  likes: 0,
  date: getCurrentDate(),
};
type MyPostsProps = {
  posts: Post[];
  token: string;
};

export const ReaderBlogs = () => {
  const params = "post/all";
  // const {
  //   data: posts,
  //   isLoading,
  //   isError,
  //   isSuccess,
  // } = useQuery("readerBlogs", currentPost () => fetchHandler("get", params));

  const user = useAppSelector((state) => state.auth.user);

  //!
  const mutatePost = useMutation((args: UpdatePostArgs) =>
    fetchHandler(args.type, args.params, args?.body, args.token)
  );
  const getCurrentUser = useCurrentUser();

  const [currentPost, setCurrentPost] = useState<number | "create">(0);

  const [opened, { open, close }] = useDisclosure(false);

  const [onAuth, { open: openAuth, close: closeAuth }] = useDisclosure(false); //???

  const post: Post | PostCreate = useMemo(() => {
    const findPost = user?.posts.find((el: Post) => el.id === currentPost); //???
    return currentPost === "create" || findPost === undefined
      ? initialPostState
      : findPost;
  }, [currentPost, user?.posts]);

  const [postForm, setPostForm] = useState<Post | PostCreate>(initialPostState);

  useEffect(() => {
    setPostForm(post);
  }, [post]);

  const { data, isLoading, isError, isSuccess } = useQuery(
    ["readerBlogs", currentPost, mutatePost],
    () => fetchHandler("get", params)
  ); //???

  const submitPost = useCallback(
    async (type: FetchType, id?: number) => {
      try {
        switch (type) {
          case "post": {
            user?.token && //!
              (await mutatePost.mutateAsync({
                type,
                params: "post/create",
                body: postForm,
                token: user.token,
              }));
            getCurrentUser();
            break;
          }
          case "put": {
            if (!id) throw new Error("Не верный ID поста");
            const updatePostForm: PostUpdate = {
              ...postForm,
              id,
            };
            user?.token && //!
              (await mutatePost.mutateAsync({
                type,
                body: updatePostForm,
                params: "post/" + id.toString(),
                token: user.token,
              }));
            getCurrentUser();
            break;
          }
          case "delete": {
            if (!id) throw new Error("Не верный ID поста");
            user?.token && //!
              (await mutatePost.mutateAsync({
                type,
                params: "post/" + id.toString(),
                token: user.token,
              }));
            getCurrentUser();
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
  }; //???

  const useStyles = createStyles((theme) => ({
    card: {
      transition: "box-shadow 150ms ease, transform 100ms ease",
      "&:hover": {
        boxShadow: theme.shadows.md,
        transform: "scale(1.05)",
      },
    },
  }));

  const { classes } = useStyles();

  //!

  // return <div> Блоги читателей </div>;
  return (
    <>
      {isLoading && <Loader />}
      <Modal size="lg" opened={opened} onClose={close} centered>
        <Input
          onChange={(e) =>
            setPostForm((prev) => ({ ...prev, title: e.target.value }))
          }
          mt={10}
          value={postForm.title}
          placeholder="Заголовок"
        />
        <Input
          onChange={(e) =>
            setPostForm((prev) => ({ ...prev, postImageUrl: e.target.value }))
          }
          mt={10}
          value={postForm.postImageUrl}
          placeholder="Ссылка на картинку"
        />
        <Textarea
          onChange={(e) =>
            setPostForm((prev) => ({ ...prev, description: e.target.value }))
          }
          autosize
          value={postForm.description}
          placeholder="Пост"
          mt={10}
          mb={20}
          size="sm"
          color="dimmed"
        />
        <Box display="flex">
          {currentPost !== "create" && (
            <Button
              loading={mutatePost.isLoading}
              color="pink"
              mr={20}
              onClick={() => {
                if ("id" in postForm) submitPost("delete", postForm.id);
              }}
            >
              Удалить пост
            </Button>
          )}
          <Button
            onClick={() => {
              if ("id" in postForm) submitPost("put", postForm.id);
              else submitPost("post");
            }}
            loading={mutatePost.isLoading}
          >
            {currentPost === "create" ? "Создать пост" : "Изменить пост"}
          </Button>
        </Box>
      </Modal>
      <Button
        mt={10}
        onClick={() => {
          // open();
          // setCurrentPost("create");
          addPostHandler();
        }}
      >
        Добавить пост
      </Button>

      <Modal size={500} opened={onAuth} onClose={closeAuth} centered>
        <Authorization close={closeAuth} />
      </Modal>

      <Grid>
        {data?.map((el: Post) => (
          <Grid.Col span={4} key={el.id}>
            <Card
              mt={10}
              shadow="sm"
              padding="md"
              radius="md"
              w={400}
              h={480}
              withBorder
              className={classes.card}
            >
              <Card.Section>
                <Link to={`/reader-blogs/${el.id}`}>
                  <Image
                    src={el.postImageUrl}
                    mt={20}
                    maw={180}
                    mx="auto"
                    alt="Norway"
                  />
                </Link>
              </Card.Section>
              <Group position="apart" mt="md" mb="xs">
                <NavLink to={`/reader-blogs/${el.id}`}>
                  <UnstyledButton>
                    <Text lineClamp={2} weight={500}>
                      {el.title}
                    </Text>
                  </UnstyledButton>
                </NavLink>
              </Group>
              <Text truncate size="sm" color="dimmed">
                {el.description}
              </Text>
              <Card.Section>
                <Group position="left" spacing={10} ml={"lg"} mt={"md"}>
                  <Text color="violet"> Автор: {el.authorName} </Text>
                  <ActionIcon color="green" variant="light">
                    <AiOutlineLike size={30} />
                    <Text fz={15}>{el.likes}</Text>
                  </ActionIcon>
                  {el.authorId === user?.id && (
                    <ActionIcon
                      onClick={() => {
                        open();
                        setCurrentPost(el.id);
                      }}
                      variant="light"
                      color="red"
                      // fullWidth
                      // mt="md"
                      // radius="md"
                    >
                      <CiEdit color="red" size={30} />
                    </ActionIcon>
                  )}
                  <Badge color="cyan" variant="light" ml={"30%"} radius={0}>
                    {el.date}
                  </Badge>
                </Group>
              </Card.Section>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};
