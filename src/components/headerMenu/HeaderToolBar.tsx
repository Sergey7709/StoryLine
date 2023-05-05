import { Autocomplete, Avatar, Grid, Group, Modal, Image } from '@mantine/core';
import { FC, memo, useCallback } from 'react';
import { ThemeToggleIcon } from '../../assets/ThemeToggleIcon';
import { FavoritesIcon } from '../../assets/FavoritesIcon';
import { AvatarIcon } from '../../assets/AvatarIcon';
import { IconLogin, IconSearch } from '@tabler/icons-react';
import { CartIcon } from '../../assets/CartIcon';
import { DATA_FOR_AUTO_COMPLETE } from '../../common/constants';
import { Authorization } from '../../pages/authorization/authorization';
import { userReceived } from '../../redux/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/redux.hooks';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
type HeaderToolBarProps = {
  classes: {
    header: string;
    inner: string;
    links: string;
    burger: string;
    link: string;
    linkLabel: string;
    search_default: string;
    search_alt: string;
    dropdown: string;
  };
};
const HeaderToolBar: FC<HeaderToolBarProps> = ({ classes }) => {
  const onClickToHome = () => {
    navigate('/');
  };

  const [openedAuth, { open, close }] = useDisclosure(false);
  const userAvatar = useAppSelector((state) => state.auth.user?.userImageUrl);
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logOut = useCallback(() => {
    dispatch(userReceived(null));
    localStorage.clear();
  }, [dispatch]);
  return (
    <>
      <Grid.Col span={2}>
        <Image
          onClick={onClickToHome}
          maw={50}
          mx="30px"
          radius="md"
          src="https://th.bing.com/th/id/OIG.IuHUSGbrzq_JUMRk1Yrq?pid=ImgGn"
          alt="Random image"
        />
        <Modal size={500} opened={openedAuth} onClose={close} centered>
          <Authorization close={close} />
        </Modal>
      </Grid.Col>
      <Grid.Col span={10}>
        <Group spacing={12} align="center" position="right" mr={'5%'} mb={'0px'}>
          <Autocomplete
            className={classes.search_default}
            placeholder="Search"
            icon={<IconSearch size="1rem" stroke={1.5} />}
            size="md"
            data={DATA_FOR_AUTO_COMPLETE}
            m={0}
          />
          <ThemeToggleIcon />
          <CartIcon />
          {isAuth ? (
            <>
              <IconLogin size={35} cursor="pointer" onClick={logOut} />
              <Avatar onClick={() => navigate('/user-account')} src={userAvatar} />
            </>
          ) : (
            <AvatarIcon open={open} />
          )}
          <FavoritesIcon />
        </Group>
      </Grid.Col>
    </>
  );
};

export default memo(HeaderToolBar);
