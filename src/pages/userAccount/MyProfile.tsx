import { FC, memo, useMemo } from 'react';
import { Box, Text, Flex, Grid, Paper, RingProgress, Title, Modal } from '@mantine/core';
import { Image } from '@mantine/core';
import { IconLogin, IconSettings, IconUser } from '@tabler/icons-react';
import { checkRankLevel } from '../../helpers/checkRankLevel';
import ChangeMyData from './assetsUserAccount/ChangeMyData';
import { useDisclosure } from '@mantine/hooks';
import { User } from '../../common/types';
import { userReceived } from '../../redux/authSlice';
import { useAppDispatch } from '../../redux/redux.hooks';
import { useNavigate } from 'react-router-dom';
type MyProfileProps = {
  user: User;
};
const MyProfile: FC<MyProfileProps> = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logOut = () => {
    dispatch(userReceived(null));
    localStorage.clear();
    navigate('/');
  };
  const [opened, { open, close }] = useDisclosure(false);
  const rank = useMemo(() => {
    const totalOrderPrice = user.orderItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
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
    <>
      <Modal size="md" opened={opened} onClose={close} centered>
        <ChangeMyData close={close} user={user} />
      </Modal>
      <Grid>
        <Grid.Col span={4}>
          <Paper shadow="xs" p="md" mt={10}>
            <Flex h={350} gap="md" direction="column" justify="space-between">
              <Image mx="auto" radius="md" src={user.userImageUrl} alt="" />
              <Box>
                <Text mb={20} fw={700} display="flex">
                  <IconUser opacity={0.7} /> {user.name}
                </Text>
                <Text mb={10} fw={700} display="flex">
                  <IconSettings opacity={0.7} cursor="pointer" onClick={open} /> Изменить мои данные
                </Text>
                <Text mb={10} fw={700} display="flex">
                  <IconLogin opacity={0.7} cursor="pointer" onClick={logOut} />
                  Выйти
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
                Текущий ранг : <b>{rank.title}</b>
              </Text>
              <Text>
                {rank.title === 'Книжный бог' ? (
                  'У вас максимальный уровень'
                ) : (
                  <>
                    <span>Для перехода на следующий уровень выкупите товаров на : </span>
                    <b>{rank.next} &#8381;</b>
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
              <Text fz="lg">Заказов всего {user.orderItems.length}</Text>
              <Text fz="lg">Заказано на сумму {rank.totalOrderPrice} &#8381;</Text>
              <Text fz="lg">Написано постов {user.posts.length}</Text>
              <Text fz="lg">Написано отзывов {user.reviews.length}</Text>
            </Flex>
          </Paper>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default memo(MyProfile);
