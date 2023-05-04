import { Table } from '@mantine/core';
import ShowOrderedItems from './assetsUserAccount/ShowOrderedItems';
import { useAppSelector } from '../../redux/redux.hooks';

const MyOrders = () => {
  const user = useAppSelector((state) => state.auth.user);
  const rows = user?.orderItems.map((el) => (
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
  );
};

export default MyOrders;
