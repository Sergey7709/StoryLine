import { Menu } from "@mantine/core";
import { CATEGORIES } from "../../common/constants";
import { useAppDispatch } from "../../redux/redux.hooks";
import { currentFilter } from "../../redux/filterSlice";
import { useNavigate } from "react-router-dom";
import { setSearchBooksValue } from "../../redux/sortSlice";

export const MenuItem = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClickToItem = (link: string, param: string) => {
    dispatch(currentFilter(param));
    dispatch(setSearchBooksValue("")); //!
    navigate(link);
  };
  const menuCategory = CATEGORIES.map((item, ind) => (
    <Menu.Item
      fz={"md"}
      color="blue"
      onClick={() => onClickToItem(item.link, item.param)}
      key={ind}
    >
      {item.label}
    </Menu.Item>
  ));

  return <>{menuCategory}</>;
};
