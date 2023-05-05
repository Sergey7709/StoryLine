import { Popover, Image, Text, Flex } from '@mantine/core';
import { FC } from 'react';
import { useDisclosure } from '@mantine/hooks';
import styles from '../user-account.module.css';
import { OrderItem } from '../../../common/types';
type Props = {
  books: OrderItem[];
};

const ShowOrderedItems: FC<Props> = ({ books }) => {
  const [opened, { close, open }] = useDisclosure(false);
  return (
    <Popover width="auto" position="bottom" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Text
          onMouseEnter={open}
          onMouseLeave={close}
          td="underline"
          fw={600}
          className={styles.show_item_text}>
          Посмотреть товары
        </Text>
      </Popover.Target>
      <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
        {books.map((el, ind) => (
          <Flex direction="row" h="auto" align="center" key={ind} mb={5} mt={5}>
            <Image src={el.imageUrl} width={50} height={50} radius="50%" mr={10} />
            <Text size="sm">{el.title} х 1</Text>
          </Flex>
        ))}
      </Popover.Dropdown>
    </Popover>
  );
};

export default ShowOrderedItems;
