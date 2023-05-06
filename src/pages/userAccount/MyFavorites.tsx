import React, { FC, memo } from 'react';
import { Item } from '../../common/types';
type MyFavoritesProps = {
  favorites: Item[];
};
const MyFavorites: FC<MyFavoritesProps> = ({ favorites }) => {
  return <>Favorites</>;
};

export default memo(MyFavorites);
