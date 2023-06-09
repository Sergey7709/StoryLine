import { deleteCartItems } from "../../redux/cartSlice";
import { BASE_URL } from "../../common/constants";
import { idOrder } from "../../common/commonFunctions";
import { usePostOrder } from "../../api/usePostOrder";
import { EmptyCart } from "./EmptyCart";
import { ActiveCart } from "./ActiveCart";
import { useAppDispatch, useAppSelector } from "../../redux/redux.hooks";
import { Container, Modal } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { Authorization } from "../authorization/Authorization";

export const Cart = () => {
  const user = useAppSelector((state) => state.auth.user);

  const cart = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const [onAuth, { open: openAuth, close: closeAuth }] = useDisclosure(false);

  const orderItems = cart.cartItems.map((book) => ({
    imageUrl: book.itemImageUrl,
    price: book.discount ? book.discount : book.price,
    count: book.count,
    title: book.title,
  }));

  const OrderData = {
    id: idOrder,
    userId: user?.id,
    userName: user?.name,
    userEmail: user?.email,
    userPhone: user?.phone,
    userAddress: user?.address,
    items: JSON.stringify([...orderItems]),
    date: new Date(),
    totalPrice: cart.totalPrice,
  };

  const orderMutation = usePostOrder(BASE_URL, OrderData, user);
  const { mutateAsync } = orderMutation;

  const handleDeleteCartItem = (bookID: number) => {
    dispatch(deleteCartItems(bookID));
  };

  const handleAddOrder = () => {
    if (user?.token) {
      mutateAsync(`order`);
    } else {
      openAuth();
      notifications.show({
        message: "Войдите в аккаунт, чтобы добавить пост",
        autoClose: 5000,
        color: "red",
        fz: "md",
      });
    }
  };

  return (
    <>
      <Modal size={500} opened={onAuth} onClose={closeAuth} centered>
        <Authorization close={closeAuth} />
      </Modal>
      <Container size="100%" h={"100%"} px="xs" py={"lg"}>
        {cart.cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <ActiveCart
            handleDeleteCartItem={handleDeleteCartItem}
            handleAddOrder={handleAddOrder}
            cartItems={cart.cartItems}
            totalCount={cart.totalCount}
            totalPrice={cart.totalPrice}
          />
        )}
      </Container>
    </>
  );
};
