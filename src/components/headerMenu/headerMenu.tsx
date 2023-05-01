import {
  Header,
  Menu,
  Group,
  Center,
  Burger,
  Autocomplete,
  Transition,
  Paper,
  Grid,
  Image,
  Avatar,
  Modal,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconLogin, IconSearch } from '@tabler/icons-react';
import { ThemeToggleIcon } from '../../assets/themeToggleIcon';
import { CartIcon } from '../../assets/cartIcon';
import { useStyles } from './headerMenuStyles';
import { FavoritesIcon } from '../../assets/favoritesIcon';
import { AvatarIcon } from '../../assets/avatarIcon';
import { Link, useNavigate } from 'react-router-dom';
import { DATA_FOR_AUTO_COMPLETE } from '../../common/constants';
import { useAppDispatch, useAppSelector } from '../../redux/redux.hooks';
import { userReceived } from '../../redux/authSlice';
import { Authorization } from '../../pages/authorization/authorization';

interface HeaderMenuProps {
  links: {
    link: string;
    label: string;
    links?: { link: string; label: string }[];
  }[];
}

export const HeaderMenu = ({ links }: HeaderMenuProps) => {
  const [openedAuth, { open, close }] = useDisclosure(false);
  const userAvatar = useAppSelector((state) => state.auth.user?.userImageUrl);
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClickToHome = () => {
    navigate('/');
  };
  const logOut = () => {
    dispatch(userReceived(null));
    localStorage.clear();
  };
  const onClickToItem = (link: string) => {
    navigate(link);
    toggle();
  };

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item onClick={() => onClickToItem(item.link)} key={item.link}>
        {item.label}
      </Menu.Item>
    ));
    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger={'click'}
          transitionProps={{ exitDuration: 0 }}
          withinPortal
          width="100%"
          position="bottom-start">
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}>
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="1rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown pl={40}>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link
        key={link.label}
        to={link.link}
        className={classes.link}
        onClick={toggle}
        // onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <Header height={105} className={classes.header} m={'0px'}>
      <Grid m={10} gutter={'5px'}>
        <Grid.Col span={2}>
          <Image
            onClick={onClickToHome}
            maw={50}
            mx="30px"
            radius="md"
            src="https://th.bing.com/th/id/OIG.IuHUSGbrzq_JUMRk1Yrq?pid=ImgGn"
            alt="Random image"
          />
          {/* <Text
            fz="lg"
            fw={700}
            variant="gradient"
            pl={10}
            gradient={{ from: "white", to: "indigo", deg: 45 }}
          >
            Мир книг
          </Text> */}
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
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="lg"
              color="#fff"
            />
          </Group>
        </Grid.Col>
        <Grid.Col span={12}>
          <Group spacing={12} align="center" position="center" className={classes.links}>
            {items}
          </Group>
        </Grid.Col>

        <Transition transition="pop-top-left" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
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
      </Grid>
    </Header>
  );
};
