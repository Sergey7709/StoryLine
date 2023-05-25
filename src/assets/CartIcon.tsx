import { IconShoppingCart } from "@tabler/icons-react";
import { ActionIcon, Badge } from "@mantine/core";
import styles from "./cartIcon.module.css";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/redux.hooks";

export function CartIcon() {
  const cartTotalCount = useAppSelector((state) => state.cart.totalCount);

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
