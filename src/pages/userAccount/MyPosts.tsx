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
import { useEffect, useMemo, useState } from 'react';
import { getCurrentDate } from '../../helpers/getCurrentDate';
import { useAppDispatch, useAppSelector } from '../../redux/redux.hooks';
import { useMutation } from 'react-query';
import { FetchPostType, fetchPost } from '../../api/postApi';
import { Post, PostCreate, PostUpdate } from '../../common/types';
import { updateUserPosts } from '../../redux/authSlice';
import { notifications } from '@mantine/notifications';
type UpdatePostArgs = {
  body?: PostUpdate | PostCreate;
  params: string;
  token: string;
};
const initialPostState = {
  description: '',
  postImageUrl: '',
  title: '',
  likes: 0,
  date: getCurrentDate(),
};
const MyPosts = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  console.log(user);
  const createPost = useMutation((args: UpdatePostArgs) =>
    fetchPost('post', args.params, args.body, args.token),
  );
  const updatePost = useMutation((args: UpdatePostArgs) =>
    fetchPost('put', args.params, args.body, args.token),
  );
  const deletePost = useMutation((args: UpdatePostArgs) =>
    fetchPost('delete', args.params, undefined, args.token),
  );
  const [currentPost, setCurrentPost] = useState<number | 'create'>(0);
  const [opened, { open, close }] = useDisclosure(false);
  const post: Post | PostCreate = useMemo(() => {
    const findPost = user?.posts.find((el) => el.id === currentPost);
    return currentPost === 'create' || findPost === undefined ? initialPostState : findPost;
  }, [user, currentPost]);
  const [postForm, setPostForm] = useState<Post | PostCreate>(initialPostState);
  useEffect(() => {
    setPostForm(post);
  }, [post]);
  const submitPost = async (type: Omit<FetchPostType, 'get'>, id?: number) => {
    try {
      switch (type) {
        case 'post': {
          const resultCreate = await createPost.mutateAsync({
            params: 'post/create',
            body: postForm,
            token: user?.token ?? '',
          });
          dispatch(updateUserPosts(resultCreate));
          break;
        }
        case 'put': {
          if (!id) throw new Error('Не верный ID поста');
          const updatePostForm: PostUpdate = {
            ...postForm,
            id,
          };
          const resultUpdate = await updatePost.mutateAsync({
            body: updatePostForm,
            params: 'post/' + id.toString(),
            token: user?.token ?? '',
          });
          dispatch(updateUserPosts(resultUpdate));
          break;
        }
        case 'delete': {
          if (!id) throw new Error('Не верный ID поста');
          const resultDelete = await deletePost.mutateAsync({
            params: 'post/' + id.toString(),
            token: user?.token ?? '',
          });
          dispatch(updateUserPosts(resultDelete));
          break;
        }
        default:
          throw new Error('Неверный тип экшена');
      }
      notifications.show({
        color: 'green',
        autoClose: 3000,
        title: 'Пост успешно добавлен',
        message: '',
      });
    } catch (err) {
      console.log(err);
      notifications.show({
        color: 'red',
        autoClose: 3000,
        title: 'Ошибка',
        message: 'Попробуйте позже',
      });
    }
  };

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
              loading={deletePost.isLoading}
              color="pink"
              mr={20}
              onClick={async () => {
                if ('id' in postForm) await submitPost('delete', postForm.id);
                close();
              }}>
              Удалить пост
            </Button>
          )}
          <Button
            onClick={async () => {
              if ('id' in postForm) await submitPost('put', postForm.id);
              else await submitPost('post');
              close();
            }}
            loading={currentPost === 'create' ? createPost.isLoading : updatePost.isLoading}>
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
      <Grid>
        {user?.posts.map((el) => (
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

export default MyPosts;
