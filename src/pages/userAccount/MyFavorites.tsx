import React, { FC, memo } from "react";
import { Item } from "../../common/types";
import SingleBookList from "../catalog/SingleBookBlock";
import EmptyData from "./assetsUserAccount/EmptyData";
import { useAppSelector } from "../../redux/redux.hooks";
type MyFavoritesProps = {
  favorites: Item[];
};
const MyFavorites: FC<MyFavoritesProps> = () => {
  // const favorites = useAppSelector((state) => state.auth.user?.favoriteItems);

  return (
    <>
      {/* {favorites.length ? (
        favorites.map((book) => <SingleBookList book={book} />)
      ) : (
        <EmptyData text="У вас нет избранных товаров" />
      )} */}
    </>
  );
};

export default memo(MyFavorites);
