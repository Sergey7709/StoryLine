import { FC } from "react";
import { Text } from "@mantine/core";
type PricesDiscountProps = {
  discount: number;
  price: number;
};

const PricesDiscount: FC<PricesDiscountProps> = ({ discount, price }) => {
  return (
    <>
      <Text
        weight={600}
        size="lg"
        color="green"
        style={{ opacity: discount ? 0.5 : 1 }}
        td={discount ? "line-through" : ""}
      >
        {`${price}`}&#8381;
      </Text>
      {discount ? (
        <Text ml={30} weight={600} size="lg" color="red">
          {/* {`${price - Math.round(price / discount)}`}&#8381; */}
          {`${price - Math.round((price / 100) * discount)}`}&#8381;
        </Text>
      ) : (
        <></>
      )}
    </>
  );
};

export default PricesDiscount;
