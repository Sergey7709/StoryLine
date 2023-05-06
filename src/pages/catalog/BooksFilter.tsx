// import React from "react";

// export const BooksFilter = () => {
//   return <div>Filter</div>;
// };

import { Group, Text, Menu, UnstyledButton, rem } from "@mantine/core";
import { useState } from "react";

export function BooksFilter() {
  const [sortName, setSortName] = useState("");
  const [sortRating, setSortRating] = useState("");
  const [sortCost, setSortCost] = useState("");
  const [sortData, setSortData] = useState("");
  const [price, setPrice] = useState("");
  const [priceEnd, setPriceEnd] = useState("");

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
          <Menu position="right-start" trigger="hover" width={200} offset={5}>
            <Menu.Target>
              <Menu.Item>
                <Text size={"md"} color="blue" weight={300}>
                  Наименованию
                </Text>
                <Menu.Dropdown>
                  <Menu.Item>Наименованию up</Menu.Item>
                  <Menu.Item>Наименованию down</Menu.Item>
                </Menu.Dropdown>
              </Menu.Item>
            </Menu.Target>
          </Menu>
          <Menu position="right-start" trigger="hover" width={200} offset={5}>
            <Menu.Target>
              <Menu.Item>
                <Text size={"md"} color="blue" weight={300}>
                  Рейтингу
                </Text>
                <Menu.Dropdown>
                  <Menu.Item>Рейтингу up</Menu.Item>
                  <Menu.Item>Рейтингу down</Menu.Item>
                </Menu.Dropdown>
              </Menu.Item>
            </Menu.Target>
          </Menu>
          <Menu position="right-start" trigger="hover" width={200} offset={5}>
            <Menu.Target>
              <Menu.Item>
                <Text size={"md"} color="blue" weight={300}>
                  Цене
                </Text>
                <Menu.Dropdown>
                  <Menu.Item>Цене up</Menu.Item>
                  <Menu.Item>Цене down</Menu.Item>
                </Menu.Dropdown>
              </Menu.Item>
            </Menu.Target>
          </Menu>
          <Menu position="right-end" trigger="hover" width={200} offset={5}>
            <Menu.Target>
              <Menu.Item>
                <Text size={"md"} color="blue" weight={300}>
                  Дате выхода
                </Text>
                <Menu.Dropdown>
                  <Menu.Item>Дате выхода up</Menu.Item>
                  <Menu.Item>Дате выхода down</Menu.Item>
                </Menu.Dropdown>
              </Menu.Item>
            </Menu.Target>
          </Menu>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
