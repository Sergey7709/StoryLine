import React, { FC, useCallback, useEffect, useState } from "react";
import { SingleBookListProps } from "../../common/types";
import { useStyles } from "./BooksListStyles";
import { useAppDispatch } from "../../redux/redux.hooks";
import { addCartItems } from "../../redux/cartSlice";
import { SingleBookBlockLayout } from "./SingleBookBlockLayout";

const SingleBookBlock: FC<SingleBookListProps> = React.memo(
  ({ book, favorite, favoritesChange }) => {
    const [favoriteState, setFavoriteState] = useState(favorite);

    const dispatch = useAppDispatch();

    const handleFavoritesChange = useCallback(() => {
      setFavoriteState(!favoriteState);
      favoritesChange(book.id, favoriteState);
    }, [book.id, favoriteState, favoritesChange]);

    const handleAddCartItem = () => {
      dispatch(addCartItems(book));
    };

    const { id, discount, reviews, price } = book;
    const { classes } = useStyles();

    useEffect(() => {
      setFavoriteState(favorite);
    }, [favorite]);

    return (
      <>
        <SingleBookBlockLayout
          id={id}
          classes={classes}
          book={book}
          discount={discount}
          price={price}
          reviews={reviews}
          favoriteState={favoriteState}
          handleFavoritesChange={handleFavoritesChange}
          handleAddCartItem={handleAddCartItem}
        />
      </>
    );
  }
);

export default SingleBookBlock;
