import { Box, Button, Group, TextInput, Textarea, Title } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { FC, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/redux.hooks';
import { fetchUser } from '../../../api/authApi';
import { useMutation } from 'react-query';
import { BodyUpdateUserRequest } from '../../../api/authApi';
import { userReceived } from '../../../redux/authSlice';
import { notifications } from '@mantine/notifications';
type Props = {
  close: () => void;
};
const MyProfile: FC<Props> = ({ close }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const updateUserMutation = useMutation((body: BodyUpdateUserRequest) =>
    fetchUser('user/update', body, user?.token),
  );
  const form = useForm({
    initialValues: {
      name: user?.name ?? '',
      about: user?.about ?? '',
      userImageUrl: user?.userImageUrl ?? '',
      phone: user?.phone ?? '',
      address: user?.address ?? '',
    },
    validate: {
      name: hasLength({ min: 2, max: 15 }, 'Имя должно быть 3-15 символов'),
      phone: (value?: string) =>
        value && /^((\+7|7|8)+([0-9]){10})$/.test(value) ? null : 'Неккоректный номер телефона',
    },
  });
  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.validate().hasErrors || !user) return;
    setIsLoading(true);
    try {
      const changedUser = { ...form.values, id: user.id };
      const result = await updateUserMutation.mutateAsync(changedUser);
      if (result?.token) {
        dispatch(userReceived(result));
        notifications.show({
          color: 'green',
          autoClose: 3000,
          title: 'Данные успешно изменены',
          message: result.name,
        });
      }
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
    setIsLoading(false);
  };
  return (
    <Box component="form" maw={400} mx="auto" onSubmit={submitForm}>
      <Title color="dimmed" fz={15} mb={5}>
        Мои данные
      </Title>
      <TextInput mt={5} label="Имя" placeholder="Имя" {...form.getInputProps('name')} />
      <TextInput mt={5} label="Телефон" placeholder="Телефон" {...form.getInputProps('phone')} />
      <TextInput
        mt={5}
        label="Адрес доставки"
        placeholder="Адрес доставки"
        {...form.getInputProps('address')}
      />
      <TextInput
        mt={5}
        label="Аватар"
        placeholder="Ссылка на аватар"
        {...form.getInputProps('userImageUrl')}
      />
      <Textarea mt={5} label="Обо мне" placeholder="Обо мне" {...form.getInputProps('about')} />
      <Group position="right" mt="md">
        <Button loading={isLoading} type="submit">
          Сохранить изменения
        </Button>
      </Group>
    </Box>
  );
};

export default MyProfile;
