import { useForm, isEmail, hasLength } from '@mantine/form';
import { Button, Group, TextInput, Box } from '@mantine/core';
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
  const [isRegister, setIsRegister] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    initialValues: isRegister
      ? {
          name: '',
          email: '',
          password: '',
        }
      : {
          email: '',
          password: '',
        },
    validate: isRegister
      ? {
          name: hasLength({ min: 2, max: 10 }, 'Имя должно быть 3-10 символов'),
          email: isEmail('Некорректный email '),
          password: hasLength({ min: 3, max: 10 }, 'Пароль должно быть 3-10 символов'),
        }
      : {
          email: isEmail('Некорректный email '),
          password: hasLength({ min: 3, max: 10 }, 'Пароль должно быть 3-10 символов'),
        },
  });
  const registerUserMutation = useMutation((form: BodyFetchUserRequest) =>
    fetchUser('user/register', form),
  );
  const loginUserMutation = useMutation((form: BodyFetchUserRequest) =>
    fetchUser('user/login', form),
  );
  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let result: User | null = null;
    setIsLoading(true);
    try {
      if (!isRegister) {
        const loginData = { ...form.values };
        result = await loginUserMutation.mutateAsync(loginData);
      } else {
        const newUser = { ...form.values, isAdmin: false, about: '', userImageUrl: '' };
        result = await registerUserMutation.mutateAsync(newUser);
      }
      if (result?.token) {
        dispatch(userReceived(result));
        if (typeof saveToken === 'function') saveToken(result.token);
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
    <Box component="form" maw={400} mx="auto" onSubmit={submitForm}>
      {isRegister && (
        <TextInput label="Имя" placeholder="Имя" withAsterisk {...form.getInputProps('name')} />
      )}
      <TextInput
        label="Ваш email"
        placeholder="Ваш email"
        withAsterisk
        mt="md"
        {...form.getInputProps('email')}
      />
      <TextInput
        label="Ваш пароль"
        placeholder="Ваш пароль"
        withAsterisk
        mt="md"
        {...form.getInputProps('password')}
      />
      <Group position="right" mt="md">
        <span
          className={styles.register_toggle_link}
          onClick={() => {
            form.reset();
            setIsRegister((prev) => !prev);
          }}>
          {isRegister ? 'У меня уже есть аккаунт' : 'Зарегистрироваться'}
        </span>
        <Button loading={isLoading} disabled={!form.isValid()} type="submit">
          {isRegister ? 'Регистрация' : 'Войти'}
        </Button>
      </Group>
    </Box>
  );
}
