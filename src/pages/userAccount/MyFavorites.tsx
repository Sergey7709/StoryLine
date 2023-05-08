import React, { FC, memo } from 'react';
import { Item } from '../../common/types';
import SingleBookList from '../catalog/SingleBookList';
type MyFavoritesProps = {
  favorites: Item[];
};
const MyFavorites: FC<MyFavoritesProps> = ({ favorites = [] }) => {
  return (
    <>
      {favorites.length ? (
        favorites.map((book) => <SingleBookList book={book} />)
      ) : (
        <div>В избранном нет товаров</div>
      )}
    </>
  );
};

export default memo(MyFavorites);
