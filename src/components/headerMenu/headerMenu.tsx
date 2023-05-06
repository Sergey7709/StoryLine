import { Header, Menu, Group, Center, Grid, Flex } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES, NAV_BUTTONS } from '../../common/constants';
import { useAppDispatch } from '../../redux/redux.hooks';
import { currentFilter } from '../../redux/filterSlice';
import React, { useCallback, useMemo } from 'react';
import { useStyles } from './headerMenuStyles';
import HeaderToolBar from './HeaderToolBar';

const HeaderMenu = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClickToItem = useCallback(
    (link: string, param: string) => {
      dispatch(currentFilter(param));
      navigate(link);
    },
    [dispatch, navigate],
  );

  const menuCategory = useMemo(
    () =>
      CATEGORIES.map((item, ind) => (
        <Menu.Item onClick={() => onClickToItem(item.link, item.param)} key={ind}>
          {item.label}
        </Menu.Item>
      )),
    [onClickToItem],
  );
  const items = useMemo(
    () =>
      NAV_BUTTONS.map((link) => (
        <Menu
          key={link.label}
          trigger={'click'}
          transitionProps={{ exitDuration: 0 }}
          withinPortal
          width="100%"
          position="bottom-start"
          offset={0}>
          <Menu.Target>
            {link.label === 'Каталог' ? (
              <Flex align="center" className={classes.link}>
                {link.label}
                <IconChevronDown size="1rem" />
                <Menu.Dropdown pl={40}>{menuCategory}</Menu.Dropdown>
              </Flex>
            ) : (
              <Link to={link.link} className={classes.link}>
                <Center>
                  <span className={classes.linkLabel}>{link.label}</span>
                </Center>
              </Link>
            )}
          </Menu.Target>
        </Menu>
      )),
    [classes.link, classes.linkLabel, menuCategory],
  );

  return (
    <Header height={105} className={classes.header} m={'0px'}>
      <Grid m={10} gutter={'5px'}>
        <HeaderToolBar classes={classes} />
        <Grid.Col span={12}>
          <Group spacing={12} align="center" position="center" className={classes.links}>
            {items}
          </Group>
        </Grid.Col>
      </Grid>
    </Header>
  );
};

export default React.memo(HeaderMenu);
