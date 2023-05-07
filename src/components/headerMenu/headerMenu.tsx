import { Header, Group, Grid } from '@mantine/core';

import { useStyles } from './headerMenuStyles';
import HeaderToolBar from './HeaderToolBar';
import HeaderButtons from './HeaderButtons';

const HeaderMenu = () => {
  console.log('render header');
  const { classes } = useStyles();

  return (
    <Header height={105} className={classes.header} m={'0px'}>
      <Grid m={10} gutter={'5px'}>
        <HeaderToolBar classes={classes} />
        <Grid.Col span={12}>
          <Group spacing={12} align="center" position="center" className={classes.links}>
            <HeaderButtons classes={classes} />
          </Group>
        </Grid.Col>
      </Grid>
    </Header>
  );
};

export default HeaderMenu;
