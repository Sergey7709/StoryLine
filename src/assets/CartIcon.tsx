import { IconShoppingCart } from "@tabler/icons-react";
import { ActionIcon, Badge } from "@mantine/core";
import styles from "./cartIcon.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/redux.hooks";
import { InitialStateCartSlice } from "../common/types";
import { useEffect } from "react";
import { loadInitialStateFromStorage } from "../redux/cartSlice";

export function CartIcon() {
  const dispatch = useAppDispatch(); //!

  useEffect(() => {
    dispatch(loadInitialStateFromStorage());
  }, []); //!

  const cartTotalCount = useAppSelector((state) => state.cart.totalCount);

  // const cart = useAppSelector((state) => state.cart); //!

  // const cartItemsFromStorage = localStorage.getItem("cartItems"); //!
  // const parsedCartData: InitialStateCartSlice =
  //   cartItemsFromStorage !== null ? JSON.parse(cartItemsFromStorage) : cart; //!

  // const cartTotalCount = parsedCartData.totalCount; //!

  return (
    <Link to={"/cart"}>
      <ActionIcon
        p={12}
        variant="gradient"
        gradient={{ from: "white", to: "yellow" }}
        size={39}
      >
        <div className={styles.divWrapper}>
          <IconShoppingCart size={25} strokeWidth={1.5} color={"#1e194d"} />
          <div className={styles.divWrapper}>
            <Badge
              size="sm"
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
            >
              {cartTotalCount}
            </Badge>
          </div>
        </div>
      </ActionIcon>
    </Link>
  );
}
