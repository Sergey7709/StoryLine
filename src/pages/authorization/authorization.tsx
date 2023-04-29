import { useForm, isEmail, hasLength } from '@mantine/form';
import { Button, Group, TextInput, Box, PasswordInput, Checkbox } from '@mantine/core';
import { FormEvent, useState } from 'react';
import styles from './authorization.module.css';
import { BodyFetchUserRequest, fetchUser } from '../../api/authApi';
import { useMutation } from 'react-query';
import { useAppDispatch } from '../../redux/redux.hooks';
import { userReceived } from '../../redux/authSlice';
import { notifications } from '@mantine/notifications';
import { useSaveTokenLocalStorage } from '../../hooks/useSaveTokenLocalStorage';
import { useNavigate } from 'react-router-dom';
import { User } from '../../common/types';
export function Authorization() {
  const navigate = useNavigate();
  const [, saveToken] = useSaveTokenLocalStorage();
  const dispatch = useAppDispatch();
  const [remember, setRemember] = useState(true);
  const [isRegister, setIsRegister] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    initialValues: isRegister
      ? {
          name: '',
          email: '',
          password: '',
          about: '',
          userImageUrl: '',
          phone: '',
          address: '',
        }
      : {
          email: '',
          password: '',
        },
    validate: isRegister
      ? {
          name: hasLength({ min: 2, max: 15 }, 'Имя должно быть 3-15 символов'),
          email: isEmail('Некорректный email '),
          password: hasLength({ min: 3, max: 15 }, 'Пароль должно быть 3-15 символов'),
          phone: (value: string) =>
            /^((\+7|7|8)+([0-9]){10})$/.test(value) ? null : 'Неккоректный номер телефона',
        }
      : {
          email: isEmail('Некорректный email '),
          password: hasLength({ min: 3, max: 15 }, 'Пароль должно быть 3-15 символов'),
        },
  });
  const registerUserMutation = useMutation((body: BodyFetchUserRequest) =>
    fetchUser('user/register', body),
  );
  const loginUserMutation = useMutation((body: BodyFetchUserRequest) =>
    fetchUser('user/login', body),
  );
  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let result: User | null = null;
    if (form.validate().hasErrors) return;
    setIsLoading(true);
    try {
      if (!isRegister) {
        const loginData = { ...form.values };
        result = await loginUserMutation.mutateAsync(loginData);
      } else {
        const newUser = { ...form.values, isAdmin: false };
        result = await registerUserMutation.mutateAsync(newUser);
      }
      if (result?.token) {
        dispatch(userReceived(result));
        if (typeof saveToken === 'function' && remember) saveToken(result.token);
        navigate('/');
        notifications.show({
          color: 'green',
          autoClose: 3000,
          title: isRegister ? 'Спасибо за регистрацию' : 'Добрый день',
          message: result.name,
        });
      }
      form.reset();
    } catch (error: any) {
      let message = '';
      switch (error.response.data.message) {
        case 'Credentials are not available': {
          message = 'Неверный логин или пароль';
          break;
        }
        case 'Email are taken': {
          message = 'Такой email уже существует';
          break;
        }
        default: {
          message = 'Попробуйте позже';
        }
      }
      notifications.show({
        color: 'red',
        autoClose: 3000,
        title: 'Ошибка',
        message,
      });
    }
    setIsLoading(false);
  };
  return (
    <Box component="form" maw={420} mx="auto" onSubmit={submitForm}>
      <TextInput
        label="Ваш email"
        placeholder="Ваш email"
        withAsterisk
        {...form.getInputProps('email')}
      />
      <PasswordInput
        mt={5}
        label="Ваш пароль"
        placeholder="Ваш пароль"
        withAsterisk
        {...form.getInputProps('password')}
      />
      {isRegister && (
        <>
          <TextInput
            mt={5}
            label="Имя"
            placeholder="Имя"
            withAsterisk
            {...form.getInputProps('name')}
          />
          <TextInput
            mt={5}
            label="Телефон"
            placeholder="Телефон"
            withAsterisk
            {...form.getInputProps('phone')}
          />
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
          <TextInput
            mt={5}
            label="Обо мне"
            placeholder="Обо мне"
            {...form.getInputProps('about')}
          />
        </>
      )}

      <Group position="right" mt="md">
        <span
          className={styles.register_toggle_link}
          onClick={() => {
            form.reset();
            setIsRegister((prev) => !prev);
          }}>
          {isRegister ? 'У меня уже есть аккаунт' : 'Зарегистрироваться'}
        </span>
        {!isRegister && (
          <Checkbox
            checked={remember}
            onChange={() => setRemember((prev) => !prev)}
            label="Запомнить"
          />
        )}
        <Button loading={isLoading} type="submit">
          {isRegister ? 'Регистрация' : 'Войти'}
        </Button>
      </Group>
    </Box>
  );
}
