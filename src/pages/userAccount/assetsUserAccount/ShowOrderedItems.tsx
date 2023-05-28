import { Popover, Image, Text, Flex } from "@mantine/core";
import { FC } from "react";
import { useDisclosure } from "@mantine/hooks";
import styles from "../user-account.module.css";
import { CartItem, OrderItem } from "../../../common/types";

type Props = {
  books: string;
};

const ShowOrderedItems: FC<Props> = ({ books }) => {
  const parsedBooks = JSON.parse(books) as CartItem[];
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Popover
      width="auto"
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
    >
      <Popover.Target>
        <Text
          onMouseEnter={open}
          onMouseLeave={close}
          td="underline"
          fw={600}
          className={styles.show_item_text}
        >
          Посмотреть товары
        </Text>
      </Popover.Target>
      <Popover.Dropdown sx={{ pointerEvents: "none" }}>
        {parsedBooks.map((el: any, ind: any) => (
          <Flex direction="row" h="auto" align="center" key={ind} mb={5} mt={5}>
            <Image
              src={el.imageUrl}
              width={50}
              height={50}
              radius="50%"
              mr={10}
            />
            <Text size="sm">
              {el.title} х {el.count}
            </Text>
          </Flex>
        ))}
      </Popover.Dropdown>
    </Popover>
  );
};

export default ShowOrderedItems;
