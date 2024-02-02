import {
  Avatar,
  Grid,
  Group,
  Modal,
  Image,
  Burger,
  Paper,
  Text,
  Transition,
} from "@mantine/core";
import { FC } from "react";
import { Authorization } from "../../pages/authorization/Authorization";
import { useAppSelector } from "../../redux/redux.hooks";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";

import { CartIcon } from "../../assets/CartIcon";
import { FavoritesIcon } from "../../assets/FavoritesIcon";
import { ThemeToggleIcon } from "../../assets/ThemeToggleIcon";
import HeaderButtons from "./HeaderButtons";
import { AvatarIcon } from "../../assets/AvatarIcon";
import BookSearch from "../BookSearch";
import { HeaderToolBarProps } from "../../common/types";

const HeaderToolBar: FC<HeaderToolBarProps> = ({ classes }) => {
  const [openedAuth, { open, close }] = useDisclosure(false);
  const [opened, { toggle }] = useDisclosure(false);
  const userAvatar = useAppSelector((state) => state.auth.user?.userImageUrl);
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <>
      <Grid.Col span={4}>
        <Group spacing={1}>
          <Link to="/">
            <Image
              className={classes.image}
              maw={50}
              ml="30px"
              radius="md"
              src="https://i.ibb.co/Bfftmyz/logo.jpg"
              alt="Home image"
            />
          </Link>
          <Text
            w={120}
            fz="lg"
            fw={700}
            variant="gradient"
            pl={10}
            gradient={{ from: "white", to: "yellow", deg: 45 }}
          >
            МИР КНИГ
          </Text>
        </Group>
        <Modal size={500} opened={openedAuth} onClose={close} centered>
          <Authorization close={close} />
        </Modal>
      </Grid.Col>
      <Grid.Col span={8}>
        <Group
          spacing={10}
          align="center"
          position="right"
          mr={"5%"}
          mb={"0px"}
          px={0}
        >
          <BookSearch classes={classes.search_default} />
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
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="lg"
            color="#fff"
          />
        </Group>
      </Grid.Col>
      <Transition transition="pop-top-right" duration={100} mounted={opened}>
        {(styles) => (
          <Paper className={classes.dropdown} withBorder style={styles}>
            <HeaderButtons classes={classes} />
            <BookSearch classes={classes.search_alt} />
          </Paper>
        )}
      </Transition>
    </>
  );
};

export default HeaderToolBar;
