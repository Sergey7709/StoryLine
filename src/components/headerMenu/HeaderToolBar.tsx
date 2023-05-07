import { Autocomplete, Avatar, Grid, Group, Modal, Image } from '@mantine/core';
import { FC } from 'react';
import { DATA_FOR_AUTO_COMPLETE } from '../../common/constants';
import { Authorization } from '../../pages/authorization/authorization';
import { userReceived } from '../../redux/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/redux.hooks';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch, IconLogin } from '@tabler/icons-react';
import { AvatarIcon } from '../../assets/AvatarIcon';
import { CartIcon } from '../../assets/CartIcon';
import { FavoritesIcon } from '../../assets/FavoritesIcon';
import { ThemeToggleIcon } from '../../assets/ThemeToggleIcon';

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
  console.log('toolbar');
  const [openedAuth, { open, close }] = useDisclosure(false);
  const userAvatar = useAppSelector((state) => state.auth.user?.userImageUrl);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();
  const logOut = () => {
    dispatch(userReceived(null));
    localStorage.clear();
  };

  return (
    <>
      <Grid.Col span={2}>
        <Link to={'/'}>
          <Image
            maw={50}
            mx="30px"
            radius="md"
            src="https://th.bing.com/th/id/OIG.IuHUSGbrzq_JUMRk1Yrq?pid=ImgGn"
            alt="Random image"
          />
        </Link>
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
          <Link to={'/cart'}>
            <CartIcon />
          </Link>
          {isAuth ? (
            <>
              <IconLogin size={35} cursor="pointer" onClick={logOut} />
              <Link to={'/user-account'}>
                <Avatar src={userAvatar} />
              </Link>
            </>
          ) : (
            <AvatarIcon open={open} />
          )}
          <Link to={'/favorites'}>
            <FavoritesIcon />
          </Link>
        </Group>
      </Grid.Col>
    </>
  );
};

export default HeaderToolBar;
