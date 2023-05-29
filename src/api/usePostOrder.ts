import axios from "axios";
import { useMutation } from "react-query";
import { OrderData, User } from "../common/types";
import { notifications } from "@mantine/notifications";
import { deleteCartItems } from "../redux/cartSlice";
import { useAppDispatch } from "./../redux/redux.hooks";

export const usePostOrder = (
  BASE_URL: string,
  OrderData: OrderData,
  user: User | null
) => {
  const dispatch = useAppDispatch();

  const orderMutation = useMutation(
    (param: string) => {
      return axios.post(`${BASE_URL}${param}`, OrderData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: user?.token ?? "",
        },
      });
    },
    {
      onSuccess: () => {
        notifications.show({
          message: "Заказ успешно отправлен!",
          autoClose: 2000,
          color: "green",
        });
        dispatch(deleteCartItems(0));
      },
      onError: () => {
        notifications.show({
          message: "Ошибка при добавлении заказа!",
          autoClose: 2000,
          color: "red",
        });
      },
    }
  );

  return orderMutation;
};
