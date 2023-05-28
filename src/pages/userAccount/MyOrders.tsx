import { Table } from "@mantine/core";
import ShowOrderedItems from "./assetsUserAccount/ShowOrderedItems";
import { FC, memo } from "react";
import { Order } from "../../common/types";
import EmptyData from "./assetsUserAccount/EmptyData";
type MyOrdersProps = {
  orders: Order[];
};
const MyOrders: FC<MyOrdersProps> = ({ orders }) => {
  const filteredOrders = orders.filter((el) => el.id === 530); //!
  const itemsArray = filteredOrders?.map((item: any) => item.items); //!
  // const filteredOrders = orders.filter((el) => el.id === 530); //!
  // const itemsArray = orders?.map((item: any) => item.items); //!
  const parsedItemsArrayItems = itemsArray?.map((item: string) =>
    JSON.parse(item)
  ); //!

  // const parsedItemsArray = orders.map((order: Order) => ({
  //   ...order,
  //   items: parsedItemsArrayItems,
  // }));

  const parsedItemsArray = filteredOrders.map((order: Order) => ({
    ...order,
    items: parsedItemsArrayItems,
  }));

  console.log(parsedItemsArray); //!

  const rows = parsedItemsArray.map((el) => (
    <tr key={el.id}>
      <td>{el.id}</td>
      <td>{el.totalPrice} &#8381;</td>
      <td>{el.date}</td>
      <td>
        <ShowOrderedItems books={el.items} />
      </td>
    </tr>
  ));

  return (
    <>
      <Table mt={10}>
        <thead>
          <tr>
            <th>Номер заказа</th>
            <th>Общая стоимость</th>
            <th>Дата заказа</th>
            <th>Заказанные товары</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      {orders.length === 0 && <EmptyData text="У вас нет заказов" />}
    </>
  );
};

export default memo(MyOrders);
