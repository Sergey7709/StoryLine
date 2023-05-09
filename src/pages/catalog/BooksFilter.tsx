import { Group, Text, Menu, UnstyledButton } from "@mantine/core";
import { memo } from "react";
import { menuSortData } from "../../common/constants";
import { SortHandlerType, SortType } from "../../common/types";

export const BooksFilter = memo(({ sortHandler }: SortHandlerType) => {
  console.log("render BooksFilter");

  return (
    <Group position="center">
      <Menu
        shadow="md"
        // withArrow
        width={370}
        offset={3}
        position="bottom-start"
        trigger="hover"
      >
        <Menu.Target>
          <UnstyledButton>
            <Text size={"md"} color="violet" weight={500}>
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
                    <Text size="md" color="violet" weight={300}>
                      {`${menuItem.title}`}
                    </Text>
                  </UnstyledButton>
                </Menu.Target>
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
                      <Text size="md" color="violet" weight={300}>
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
