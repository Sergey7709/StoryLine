import { IconShoppingCart } from "@tabler/icons-react";
import { ActionIcon, Badge } from "@mantine/core";
import styles from "./cartIcon.module.css";
import { Link } from "react-router-dom";

export function CartIcon() {
  const cartCount = 5; // здесь нужно получить количество товара из хранилища

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
              {cartCount}
            </Badge>
          </div>
        </div>
      </ActionIcon>
    </Link>
  );
}
