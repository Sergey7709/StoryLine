import React, { FC, memo } from 'react';
import { Item } from '../../common/types';
import SingleBookList from '../catalog/SingleBookList';
import EmptyData from './assetsUserAccount/EmptyData';
type MyFavoritesProps = {
  favorites: Item[];
};
const MyFavorites: FC<MyFavoritesProps> = ({ favorites = [] }) => {
  return (
    <>
      {favorites.length ? (
        favorites.map((book) => <SingleBookList book={book} />)
      ) : (
        <EmptyData text="У вас нет избранных товаров" />
      )}
    </>
  );
};

export default memo(MyFavorites);
