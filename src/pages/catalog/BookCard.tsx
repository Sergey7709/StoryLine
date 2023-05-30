import { useMutation } from "react-query";
import { fetchItem } from "../../api/itemsApi";
import { Item, ReviewUpdate } from "../../common/types";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { fetchHandler } from "../../api/postOrReviewApi";
import { useCurrentUser } from "../../hooks/useCurrenUser";
import { useAppSelector } from "../../redux/redux.hooks";
import { FetchReviewArgs } from "../userAccount/MyReviews";
import { notifications } from "@mantine/notifications";
import { getCurrentDate } from "../../helpers/getCurrentDate";
import { useDispatch } from "react-redux";
import { addCartItems, handleChangeCountItem } from "../../redux/cartSlice";
import { BookCardLayout } from "./BookCardLayout";
import { useNavigate, useParams } from "react-router-dom";

export const BookCard = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const [countBar, setCountBar] = useState<number>(1);

  const initialReviewState = {
    date: getCurrentDate(),
    text: "",
    rate: 1,
  };
  const slug = useParams();
  const { mutateAsync, data, isLoading } = useMutation<Item, string, string>(
    fetchItem
  );

  const book = data && { ...data };

  const itemCart = cartItems.find((item) => item.id === book?.id);

  const incrementCountBar = () => setCountBar((prevCount) => prevCount + 1);
  const decrementCountBar = () => setCountBar((prevCount) => prevCount - 1);
  const handleChangeCountBar = (value: number) => setCountBar(value);

  const handleAddCartItem = () => {
    if (countBar === 1 && !itemCart) {
      data && dispatch(addCartItems(data));
    } else {
      book && dispatch(handleChangeCountItem({ book, count: countBar }));
    }

    navigate("/cart");
  };

  useEffect(() => {
    if (slug.id) mutateAsync(slug.id);
  }, [mutateAsync, slug.id]);

  const user = useAppSelector((state) => state.auth.user);
  const getCurrentUser = useCurrentUser();
  const [opened, { close, open }] = useDisclosure(false);
  const [review, setReview] = useState<ReviewUpdate>(initialReviewState);

  const reviewMutation = useMutation((args: FetchReviewArgs) =>
    fetchHandler(args.type, args.params, args.body, args.token)
  );

  const submitReview = async (itemId: number) => {
    if (!user) {
      return notifications.show({
        color: "red",
        autoClose: 3000,
        title: "Отзывы могут оставлять только зарегистрированные пользователи",
        message: "",
      });
    }
    if (review.text.trim() === "") {
      return notifications.show({
        color: "red",
        autoClose: 3000,
        title: "Отзыв не может быть пустым",
        message: "",
      });
    }
    try {
      const params = `review/${itemId}`;
      await reviewMutation.mutateAsync({
        type: "post",
        params,
        body: review,
        token: user.token,
      });
      getCurrentUser();
      await mutateAsync(slug.id ?? "");
      close();
      notifications.show({
        color: "green",
        autoClose: 3000,
        title: "Успешно",
        message: "Отзыв добавлен",
      });
    } catch (err: any) {
      close();
      notifications.show({
        color: "red",
        autoClose: 3000,
        title: "Ошибка",
        message: err.response.data.message.includes("already")
          ? "Вы уже оставляли отзыв на этот товар"
          : "Попробуйте позже",
      });
    }
    setReview(initialReviewState);
  };

  return (
    <>
      <BookCardLayout
        data={data}
        isLoading={isLoading}
        countBar={countBar}
        incrementCountBar={incrementCountBar}
        decrementCountBar={decrementCountBar}
        handleChangeCountBar={handleChangeCountBar}
        handleAddCartItem={handleAddCartItem}
        opened={opened}
        close={close}
        setReview={setReview}
        review={review}
        submitReview={submitReview}
        reviewMutation={reviewMutation}
        open={open}
      />
    </>
  );
};
