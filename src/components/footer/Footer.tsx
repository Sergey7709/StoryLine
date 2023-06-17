import { Text, Grid, Group, UnstyledButton } from "@mantine/core";

import { NavLink } from "react-router-dom";
import { useStyles } from "./footerStyles";
import { linksFooter } from "../../common/constants";

export const Footer = () => {
  const { classes } = useStyles();

  const items = linksFooter.map((link) => (
    <NavLink key={link.label} to={link.link}>
      <UnstyledButton fz={"lg"} fw={"bold"}>
        <Text color="cyan.8"> {link.label}</Text>
      </UnstyledButton>
    </NavLink>
  ));

  return (
    <div className={classes.footer}>
      <Grid className={classes.inner}>
        <Grid.Col span={4}>
          <Text fz={"lg"} fw={"bold"} color="cyan.8">
            © 2023 World of books. All rights reserved.
          </Text>
        </Grid.Col>
        <Grid.Col span={4} offset={3}>
          <Group color="red" pr={"lg"} className={classes.links}>
            {items}
          </Group>
        </Grid.Col>
      </Grid>
    </div>
  );
};
