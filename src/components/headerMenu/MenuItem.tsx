import { Menu } from "@mantine/core";
import { CATEGORIES } from "../../common/constants";
import { useAppDispatch } from "../../redux/redux.hooks";
import { currentFilter } from "../../redux/filterSlice";
import { useNavigate } from "react-router-dom";

export const MenuItem = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClickToItem = (link: string, param: string) => {
    dispatch(currentFilter(param));
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
