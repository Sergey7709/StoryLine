import { Menu } from "@mantine/core";
import { CATEGORIES } from "../../common/constants";
import { useAppDispatch } from "../../redux/redux.hooks";
import { currentFilter } from "../../redux/filterSlice";
import { useNavigate } from "react-router-dom";
import {
  setCategorySort,
  setMaxPrice,
  setMinPrice,
  setReset,
  setSearchBooksValue,
} from "../../redux/sortSlice";

export const MenuItem = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onClickToItem = (param: string) => {
    dispatch(setSearchBooksValue(""));
    dispatch(setCategorySort(""));
    dispatch(setMinPrice(""));
    dispatch(setMaxPrice(""));
    dispatch(setReset(true));
    dispatch(currentFilter(param));

    navigate(`/books-list/${param}`);
  };
  const menuCategory = CATEGORIES.map((item, ind) => (
    <Menu.Item
      tt={"uppercase"}
      fz={"sm"}
      color="blue"
      onClick={() => onClickToItem(item.param)}
      key={ind}
    >
      {item.label}
    </Menu.Item>
  ));

  return <>{menuCategory}</>;
};
