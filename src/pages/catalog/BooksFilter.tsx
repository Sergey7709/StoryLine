import { Group, Text, Menu, UnstyledButton } from "@mantine/core";
import { memo } from "react";
import { menuSortData } from "../../common/constants";
import { SortHandlerType } from "../../common/types";

export const BooksFilter = memo(({ sortHandler }: SortHandlerType) => {
  console.log("render BooksFilter");
  return (
    <Group position="center">
      <Menu
        shadow="md"
        // withArrow
        // width={370}
        offset={4}
        position="bottom-start"
        trigger="hover"
      >
        <Menu.Target>
          <UnstyledButton>
            <Text
              size={"md"}
              variant="gradient"
              gradient={{ from: "coral", to: "red", deg: 45 }}
              weight={500}
            >
              Сортировать книги по...
            </Text>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Group>
            {menuSortData.map((menuItem) => (
              <Menu
                position="bottom"
                trigger="hover"
                width={140}
                offset={5}
                key={menuItem.key}
              >
                <Menu.Target>
                  <UnstyledButton>
                    <Text
                      size="md"
                      variant="gradient"
                      gradient={{ from: "coral", to: "red", deg: 45 }}
                      weight={400}
                    >
                      {`${menuItem.title}`}
                    </Text>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  {menuItem.options.map((option) => (
                    <Menu.Item
                      px={2}
                      key={option.value}
                      onClick={() => sortHandler(option.value)}
                    >
                      <Text
                        size="md"
                        variant="gradient"
                        gradient={{ from: "coral", to: "red", deg: 45 }}
                        weight={400}
                      >
                        {option.subtitle}
                      </Text>
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>
            ))}
          </Group>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
});
