import {
  Autocomplete,
  Avatar,
  Grid,
  Group,
  Modal,
  Image,
  Burger,
  Paper,
  Transition,
} from '@mantine/core';
import { FC } from 'react';
import { DATA_FOR_AUTO_COMPLETE } from '../../common/constants';
import { Authorization } from '../../pages/authorization/Authorization';
import { useAppSelector } from '../../redux/redux.hooks';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { CartIcon } from '../../assets/CartIcon';
import { FavoritesIcon } from '../../assets/FavoritesIcon';
import { ThemeToggleIcon } from '../../assets/ThemeToggleIcon';
import { AvatarIcon } from '../../assets/avatarIcon';
import HeaderButtons from './HeaderButtons';

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
  const [openedAuth, { open, close }] = useDisclosure(false);
  const userAvatar = useAppSelector((state) => state.auth.user?.userImageUrl);
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <>
      <Grid.Col span={4}>
        <Group spacing={1}>
          <Link to="/">
            <Image
              maw={50}
              ml="30px"
              radius="md"
              src="https://th.bing.com/th/id/OIG.IuHUSGbrzq_JUMRk1Yrq?pid=ImgGn"
              alt="Home image"
            />
          </Link>
          {/* <Text
            w={120}
            fz="lg"
            fw={700}
            variant="gradient"
            pl={10}
            gradient={{ from: 'white', to: 'yellow', deg: 45 }}>
            МИР КНИГ
          </Text> */}
        </Group>
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
            <Link to="/user-account">
              <Avatar src={userAvatar} />
            </Link>
          ) : (
            <AvatarIcon open={open} />
          )}
          <FavoritesIcon />
          {/* <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="lg"
            color="#fff"
          /> */}
        </Group>
      </Grid.Col>
      <Transition transition="pop-top-right" duration={100}>
        {(styles) => (
          <Paper className={classes.dropdown} withBorder style={styles}>
            <HeaderButtons classes={classes} />
            <Autocomplete
              className={classes.search_alt}
              placeholder="Search"
              icon={<IconSearch size="1rem" stroke={1.5} />}
              size="md"
              data={DATA_FOR_AUTO_COMPLETE}
            />
          </Paper>
        )}
      </Transition>
    </>
  );
};

export default HeaderToolBar;
