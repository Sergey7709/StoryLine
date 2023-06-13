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
        offset={4}
        position="bottom-end"
        trigger="hover"
      >
        <Menu.Target>
          <UnstyledButton>
            <Text
              size={"md"}
              variant="gradient"
              gradient={{ from: "coral", to: "red", deg: 45 }}
            >
              Сортировать книги по...
            </Text>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Group>
            {menuSortData.map((menuItem) => (
              <Menu.Target key={menuItem.key}>
                <Accordion variant="default" transitionDuration={300}>
                  <Accordion.Item value="flexibility">
                    <Accordion.Control>
                      <Text
                        align="start"
                        w={"15vh"}
                        size="md"
                        variant="gradient"
                        gradient={{ from: "coral", to: "red", deg: 45 }}
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
                          color="orange"
                          key={option.value}
                          onClick={() => sortHandler(option.value)}
                          mb={3}
                        >
                          <Text
                            size="md"
                            variant="gradient"
                            gradient={{ from: "coral", to: "red", deg: 45 }}
                            weight={400}
                            align="left"
                          >
                            {option.subtitle}
                          </Text>
                        </Button>
                      ))}
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </Menu.Target>
            ))}
          </Group>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
});
