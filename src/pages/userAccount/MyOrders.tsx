import { Table } from '@mantine/core';
import { books } from '../catalog/BooksList';
import ShowOrderedItems from './assetsUserAccount/ShowOrderedItems';

const elements = [
  { id: 6, totalPrice: 12.011, date: '10.10.22', itemId: ['Carbon', 'Carbon1'] },
  { id: 7, totalPrice: 14.007, date: '10.10.22', itemId: ['Nitrogen'] },
  { id: 39, totalPrice: 88.906, date: '10.10.22', itemId: ['Yttrium'] },
  { id: 56, totalPrice: 137.33, date: '10.10.22', itemId: ['Barium'] },
  { id: 58, totalPrice: 140.12, date: '10.10.22', itemId: ['Cerium'] },
];

const MyOrders = () => {
  const rows = elements.map((el) => (
    <tr key={el.id}>
      <td>{el.id}</td>
      <td>{el.totalPrice} &#8381;</td>
      <td>{el.date}</td>
      <td>
        <ShowOrderedItems books={books[0]} itemId={el.itemId} />
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
