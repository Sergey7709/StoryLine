import { FC, memo } from "react";
import { Item } from "../../common/types";
import EmptyData from "./assetsUserAccount/EmptyData";
import { useAppSelector } from "../../redux/redux.hooks";
import SingleBookBlock from "../catalog/SingleBookBlock";
import { usePostFavorites } from "../../api/usePostFavorites";
import { useDisclosure } from "@mantine/hooks";
type MyFavoritesProps = {
  favorites: Item[];
};
const MyFavorites: FC<MyFavoritesProps> = () => {
  const favorites = useAppSelector((state) => state.auth.user?.favoriteItems);

  const [openedAuth, handlers] = useDisclosure(false);

  const { favoritesChange } = usePostFavorites(handlers);

  return (
    <>
      {favorites?.length ? (
        favorites.map((book) => (
          <SingleBookBlock
            favorite={true}
            book={book}
            key={book.id}
            favoritesChange={favoritesChange}
          />
        ))
      ) : (
        <EmptyData text="У вас нет избранных товаров" />
      )}
    </>
  );
};

export default memo(MyFavorites);
