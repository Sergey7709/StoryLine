import { useMemo } from 'react';
import styles from './user-account.module.css';
import { Box, Text, Flex, Grid, Paper, RingProgress, Title } from '@mantine/core';
import { Image } from '@mantine/core';
import { useAppSelector } from '../../redux/redux.hooks';
import { IconUser } from '@tabler/icons-react';
import { checkRankLevel } from '../../helpers/checkRankLevel';

const MyFavorites = () => {
  const user = useAppSelector((state) => state.auth.user);
  const rank = useMemo(() => {
    const totalOrderPrice = user?.orderItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
    return typeof totalOrderPrice === 'number'
      ? checkRankLevel(totalOrderPrice)
      : {
          title: 'Читатель',
          next: 5000,
          proc: 0,
          totalOrderPrice,
        };
  }, [user]);

  return (
    <Grid>
      <Grid.Col span={4}>
        <Paper shadow="xs" p="md" mt={10}>
          <Flex h={350} gap="md" direction="column" justify="space-between">
            <Image mx="auto" radius="md" src={user?.userImageUrl} alt="" />
            <Box display="flex">
              <IconUser />
              <Text ml={10} mb={10} fw={700}>
                {user?.name}
              </Text>
            </Box>
          </Flex>
        </Paper>
      </Grid.Col>
      <Grid.Col span={4}>
        <Paper shadow="xs" p="md" mt={10}>
          <Flex h={350} gap="md" direction="column">
            <RingProgress
              mx="auto"
              size={250}
              sections={[{ value: rank.proc as number, color: 'blue' }]}
              label={
                <Text color="blue" weight={700} align="center" size="xl">
                  {rank.proc}%
                </Text>
              }
            />
            <Text>
              Текущий ранг : <b>{rank?.title}</b>
            </Text>
            <Text>
              {rank.title === 'Книжный бог' ? (
                'У вас максимальный уровень'
              ) : (
                <>
                  <span>Для перехода на следующий уровень выкупите товаров на : </span>
                  <b>{rank?.next} &#8381;</b>
                </>
              )}
            </Text>
          </Flex>
        </Paper>
      </Grid.Col>
      <Grid.Col span={4}>
        <Paper shadow="xs" p="md" mt={10}>
          <Flex h={350} gap="md" direction="column" justify="space-between">
            <Title mt="md" ta="center">
              Моя статистика
            </Title>
            <Text fz="lg">Заказов всего {user?.orderItems.length ?? 0}</Text>
            <Text fz="lg">Заказано на сумму {rank.totalOrderPrice} &#8381;</Text>

            <Text fz="lg">Написано постов {user?.posts.length ?? 0}</Text>
            <Text fz="lg">Написано отзывов {user?.reviews.length ?? 0}</Text>
          </Flex>
        </Paper>
      </Grid.Col>
    </Grid>
  );
};

export default MyFavorites;
