import {
  Grid,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Card,
  Modal,
  Input,
  Textarea,
  Box,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { getCurrentDate } from '../../helpers/getCurrentDate';
import { useMutation } from 'react-query';
import { FetchType, fetchHandler } from '../../api/postOrReviewApi';
import { Post, PostCreate, PostUpdate } from '../../common/types';
import { notifications } from '@mantine/notifications';

import EmptyData from './assetsUserAccount/EmptyData';
import { useCurrentUser } from '../../hooks/useCurrenUser';
type UpdatePostArgs = {
  params: string;
  token: string;
  body?: PostUpdate | PostCreate;
  type: FetchType;
};
const initialPostState = {
  description: '',
  postImageUrl: '',
  title: '',
  likes: 0,
  date: getCurrentDate(),
};
type MyPostsProps = {
  posts: Post[];
  token: string;
};
const MyPosts: FC<MyPostsProps> = ({ posts, token }) => {
  const mutatePost = useMutation((args: UpdatePostArgs) =>
    fetchHandler(args.type, args.params, args?.body, args.token),
  );
  const getCurrentUser = useCurrentUser();
  const [currentPost, setCurrentPost] = useState<number | 'create'>(0);
  const [opened, { open, close }] = useDisclosure(false);
  const post: Post | PostCreate = useMemo(() => {
    const findPost = posts.find((el) => el.id === currentPost);
    return currentPost === 'create' || findPost === undefined ? initialPostState : findPost;
  }, [currentPost, posts]);
  const [postForm, setPostForm] = useState<Post | PostCreate>(initialPostState);
  useEffect(() => {
    setPostForm(post);
  }, [post]);

  const submitPost = useCallback(
    async (type: FetchType, id?: number) => {
      try {
        switch (type) {
          case 'post': {
            await mutatePost.mutateAsync({
              type,
              params: 'post/create',
              body: postForm,
              token: token,
            });
            getCurrentUser();
            break;
          }
          case 'put': {
            if (!id) throw new Error('Не верный ID поста');
            const updatePostForm: PostUpdate = {
              ...postForm,
              id,
            };
            await mutatePost.mutateAsync({
              type,
              body: updatePostForm,
              params: 'post/' + id.toString(),
              token: token,
            });
            getCurrentUser();
            break;
          }
          case 'delete': {
            if (!id) throw new Error('Не верный ID поста');
            await mutatePost.mutateAsync({
              type,
              params: 'post/' + id.toString(),
              token: token,
            });
            getCurrentUser();
            break;
          }
          default:
            throw new Error('Неверный тип экшена');
        }
        notifications.show({
          color: 'green',
          autoClose: 3000,
          title: `Пост успешно ${
            type === 'post' ? ' добавлен' : type === 'put' ? 'изменен' : 'удален'
          }`,
          message: '',
        });
        close();
      } catch (err) {
        console.log(err);
        notifications.show({
          color: 'red',
          autoClose: 3000,
          title: 'Ошибка',
          message: 'Попробуйте позже',
        });
      }
    },
    [close, getCurrentUser, mutatePost, postForm, token],
  );

  return (
    <>
      <Modal size="lg" opened={opened} onClose={close} centered>
        <Input
          onChange={(e) => setPostForm((prev) => ({ ...prev, title: e.target.value }))}
          mt={10}
          value={postForm.title}
          placeholder="Заголовок"
        />
        <Input
          onChange={(e) => setPostForm((prev) => ({ ...prev, postImageUrl: e.target.value }))}
          mt={10}
          value={postForm.postImageUrl}
          placeholder="Ссылка на картинку"
        />
        <Textarea
          onChange={(e) => setPostForm((prev) => ({ ...prev, description: e.target.value }))}
          autosize
          value={postForm.description}
          placeholder="Пост"
          mt={10}
          mb={20}
          size="sm"
          color="dimmed"
        />
        <Box display="flex">
          {currentPost !== 'create' && (
            <Button
              loading={mutatePost.isLoading}
              color="pink"
              mr={20}
              onClick={() => {
                if ('id' in postForm) submitPost('delete', postForm.id);
              }}>
              Удалить пост
            </Button>
          )}
          <Button
            onClick={() => {
              if ('id' in postForm) submitPost('put', postForm.id);
              else submitPost('post');
            }}
            loading={mutatePost.isLoading}>
            {currentPost === 'create' ? 'Создать пост' : 'Изменить пост'}
          </Button>
        </Box>
      </Modal>
      <Button
        mt={10}
        onClick={() => {
          open();
          setCurrentPost('create');
        }}>
        Добавить пост
      </Button>
      {!posts.length && <EmptyData text="Вы не написали ни одного поста" />}
      <Grid>
        {posts.map((el) => (
          <Grid.Col span={4} key={el.id}>
            <Card mt={10} shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image src={el.postImageUrl} height={160} alt="Norway" />
              </Card.Section>
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{el.title}</Text>
                <Badge color="green" variant="light">
                  <Text fz={10}>&#x1f49a; {el.likes}</Text>
                </Badge>
                <Badge color="pink" variant="light">
                  {el.date}
                </Badge>
              </Group>
              <Text truncate size="sm" color="dimmed">
                {el.description}
              </Text>
              <Button
                onClick={() => {
                  open();
                  setCurrentPost(el.id);
                }}
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md">
                Изменить
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default memo(MyPosts);
