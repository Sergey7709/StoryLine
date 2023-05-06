import { ThemeContext } from "@emotion/react";
import { Group, Text, Menu, UnstyledButton } from "@mantine/core";
import { useState } from "react";

type SortType = {
  sortName: string;
  sortRating: string;
  sortCost: string;
  sortData: string;
  price: string;
  priceEnd: string;
};

const initialState: SortType = {
  sortName: "",
  sortRating: "",
  sortCost: "",
  sortData: "",
  price: "",
  priceEnd: "",
};

const menuData = [
  {
    key: "sortName",
    title: "Наименованию",
    options: [
      { value: "asc", subtitle: "Наименованию А-Я" },
      { value: "desc", subtitle: "Наименованию Я-А" },
    ],
  },
  {
    key: "sortRating",
    title: "Рейтингу",
    options: [
      { value: "asc", subtitle: "Рейтингу возрастанию" },
      { value: "desc", subtitle: "Рейтингу убыванию" },
    ],
  },
  {
    key: "sortCost",
    title: "Цене",
    options: [
      { value: "asc", subtitle: "Цене возрастанию" },
      { value: "desc", subtitle: "Цене убыванию" },
    ],
  },
  {
    key: "sortData",
    title: "Дате выхода",
    options: [
      { value: "asc", subtitle: "Дате возрастанию" },
      { value: "desc", subtitle: "Дате убыванию" },
    ],
  },
];

export function BooksFilter() {
  const [sortCategories, setSortCategories] = useState<SortType>(initialState);

  const sortHandler = (key: keyof SortType, value: string) => {
    setSortCategories((prevState) => ({ ...prevState, [key]: value }));
  };

  const { sortName, sortRating, sortCost, sortData, price, priceEnd } =
    sortCategories;

  const param = `${sortName}${sortRating}${sortCost}${sortData}${price}${priceEnd}`; //! тест

  console.log(param);

  return (
    <Group position="center">
      <Menu
        shadow="md"
        // withArrow
        width={200}
        offset={0}
        // position="right-start"
        trigger="hover"
      >
        <Menu.Target>
          <UnstyledButton>
            <Text size={"md"} color="blue" weight={500}>
              Сортировать книги по...
            </Text>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          {menuData.map((menuItem) => (
            <Menu
              position="right-start"
              trigger="hover"
              width={200}
              offset={2}
              key={menuItem.key}
            >
              <Menu.Target>
                <Menu.Item>
                  <Text size="md" color="blue" weight={300}>
                    {menuItem.title}
                  </Text>
                  <Menu.Dropdown>
                    {menuItem.options.map((option) => (
                      <Menu.Item
                        key={option.value}
                        onClick={() =>
                          sortHandler(
                            menuItem.key as keyof SortType,
                            option.value
                          )
                        }
                      >
                        <Text size="md" color="blue" weight={300}>
                          {option.subtitle}
                        </Text>
                      </Menu.Item>
                    ))}
                  </Menu.Dropdown>
                </Menu.Item>
              </Menu.Target>
            </Menu>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
