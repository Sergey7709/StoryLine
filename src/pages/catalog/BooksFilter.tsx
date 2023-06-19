import {
  Group,
  Text,
  Menu,
  UnstyledButton,
  Accordion,
  Button,
} from "@mantine/core";
import { memo } from "react";
import { menuSortData } from "../../common/constants";
import { SortHandlerType } from "../../common/types";

export const BooksFilter = memo(({ sortHandler }: SortHandlerType) => {
  console.log("render BooksFilter");
  return (
    <Group position="center">
      <Menu
        shadow="md"
        width={"230px"}
        offset={10}
        position="bottom-end"
        trigger="hover"
      >
        <Menu.Target>
          <UnstyledButton>
            <Text
              tt="uppercase"
              size={"sm"}
              variant="gradient"
              gradient={{ from: "teal", to: "blue", deg: 45 }}
              fw={500}
            >
              Сортировать книги по...
            </Text>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Group>
            <Accordion variant="contained" transitionDuration={400}>
              {menuSortData.map((menuItem) => (
                <Accordion.Item key={menuItem.key} value={menuItem.title}>
                  <Accordion.Control>
                    <Text
                      tt="uppercase"
                      align="start"
                      w={"15vh"}
                      size="sm"
                      variant="gradient"
                      gradient={{ from: "teal", to: "blue", deg: 45 }}
                      weight={600}
                    >
                      {`${menuItem.title}`}
                    </Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    {menuItem.options.map((option) => (
                      <Button
                        w={"100%"}
                        variant="light"
                        color="violet"
                        key={option.value}
                        onClick={() => sortHandler(option.value)}
                        mb={3}
                      >
                        <Text
                          size="md"
                          variant="gradient"
                          gradient={{ from: "teal", to: "blue", deg: 45 }}
                          weight={500}
                          align="left"
                        >
                          {option.subtitle}
                        </Text>
                      </Button>
                    ))}
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Group>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
});
