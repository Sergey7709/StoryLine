import { useForm, isEmail, hasLength } from "@mantine/form";
import {
  Button,
  Group,
  TextInput,
  Box,
  PasswordInput,
  Checkbox,
  Title,
} from "@mantine/core";
import { FC, FormEvent, useCallback, useState } from "react";
import styles from "./authorization.module.css";
import {
  BodyFetchUserRequest,
  BodyRegisterUserRequest,
  fetchUser,
} from "../../api/authApi";
import { useMutation } from "react-query";
import { useAppDispatch } from "../../redux/redux.hooks";
import { userReceived } from "../../redux/authSlice";
import { notifications } from "@mantine/notifications";
import { useSaveTokenLocalStorage } from "../../hooks/useSaveTokenLocalStorage";
import { User } from "../../common/types";
import { useNavigate } from "react-router-dom";

type FetchAuthArgs = {
  body: BodyFetchUserRequest | BodyRegisterUserRequest;
  params: "user/register" | "user/login";
};
type AuthorizationProps = {
  close: () => void;
};
export const Authorization: FC<AuthorizationProps> = ({ close }) => {
  const [, saveToken] = useSaveTokenLocalStorage();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [remember, setRemember] = useState(true);
  const [isRegister, setIsRegister] = useState(true);
  const form = useForm({
    initialValues: isRegister
      ? {
          name: "",
          email: "",
          password: "",
          about: "",
          userImageUrl: "",
          phone: "",
          address: "",
        }
      : {
          email: "",
          password: "",
        },
    validate: isRegister
      ? {
          name: hasLength({ min: 2, max: 15 }, "Имя должно быть 3-15 символов"),
          email: isEmail("Некорректный email "),
          password: hasLength(
            { min: 3, max: 15 },
            "Пароль должно быть 3-15 символов"
          ),
          phone: (value: string) =>
            /^((\+7|7|8)+([0-9]){10})$/.test(value)
              ? null
              : "Неккоректный номер телефона",
        }
      : {
          email: isEmail("Некорректный email "),
          password: hasLength(
            { min: 3, max: 15 },
            "Пароль должно быть 3-15 символов"
          ),
        },
  });
  const authUserMutation = useMutation((args: FetchAuthArgs) =>
    fetchUser(args.params, args.body)
  );
  const submitForm = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let result: User | null = null;
      if (form.validate().hasErrors) return;
      try {
        if (!isRegister) {
          const loginData = { ...form.values };
          result = await authUserMutation.mutateAsync({
            params: "user/login",
            body: loginData,
          });
        } else {
          const newUser = { ...form.values, isAdmin: false };
          result = await authUserMutation.mutateAsync({
            params: "user/register",
            body: newUser,
          });
        }

        if (result?.token) {
          dispatch(userReceived(result));
          if (typeof saveToken === "function" && remember)
            saveToken(result.token);
          close();
          navigate("/");
          notifications.show({
            color: "green",
            autoClose: 3000,
            title: isRegister ? "Спасибо за регистрацию" : "Добрый день",
            message: result.name,
          });
        }
        form.reset();
      } catch (error: any) {
        let message = "";
        switch (error.response.data.message) {
          case "Credentials are not available": {
            message = "Неверный логин или пароль";
            break;
          }
          case "Email are taken": {
            message = "Такой email уже существует";
            break;
          }
          default: {
            message = "Попробуйте позже";
          }
        }
        notifications.show({
          color: "red",
          autoClose: 3000,
          title: "Ошибка",
          message,
        });
      }
    },
    [
      form,
      isRegister,
      authUserMutation,
      dispatch,
      saveToken,
      remember,
      close,
      navigate,
    ]
  );

  return (
    <Box component="form" maw={420} mx="auto" onSubmit={submitForm}>
      <Title color="dimmed" fz={15} mb={5}>
        Авторизация
      </Title>
      <TextInput
        label="Ваш email"
        placeholder="Ваш email"
        withAsterisk
        {...form.getInputProps("email")}
      />
      <PasswordInput
        label="Ваш пароль"
        placeholder="Ваш пароль"
        withAsterisk
        {...form.getInputProps("password")}
      />
      {isRegister && (
        <>
          <TextInput
            label="Имя"
            placeholder="Имя"
            withAsterisk
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Телефон"
            placeholder="Телефон"
            withAsterisk
            {...form.getInputProps("phone")}
          />
          <TextInput
            label="Адрес доставки"
            placeholder="Адрес доставки"
            {...form.getInputProps("address")}
          />
          <TextInput
            label="Аватар"
            placeholder="Ссылка на аватар"
            {...form.getInputProps("userImageUrl")}
          />
          <TextInput
            label="Обо мне"
            placeholder="Обо мне"
            {...form.getInputProps("about")}
          />
        </>
      )}
      <Group position="right" mt="md">
        <span
          className={styles.register_toggle_link}
          onClick={() => {
            form.reset();
            setIsRegister((prev) => !prev);
          }}
        >
          {isRegister ? "У меня уже есть аккаунт" : "Зарегистрироваться"}
        </span>
        {!isRegister && (
          <Checkbox
            checked={remember}
            onChange={() => setRemember((prev) => !prev)}
            label="Запомнить"
          />
        )}
        <Button loading={authUserMutation.isLoading} type="submit">
          {isRegister ? "Регистрация" : "Войти"}
        </Button>
      </Group>
    </Box>
  );
};
