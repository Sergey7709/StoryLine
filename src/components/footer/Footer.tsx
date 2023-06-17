import { Container, Grid, Group, UnstyledButton } from "@mantine/core";

import { NavLink } from "react-router-dom";
import { useStyles } from "./footerStyles";
import { linksFooter } from "../../common/constants";

export const Footer = () => {
  const { classes } = useStyles();

  const items = linksFooter.map((link) => (
    <NavLink key={link.label} to={link.link}>
      <UnstyledButton>{link.label}</UnstyledButton>
    </NavLink>
  ));

  return (
    <div className={classes.footer}>
      <Grid className={classes.inner} bg={"gray"}>
        <Grid.Col span={4}>
          © 2023 World of books. All rights reserved.
        </Grid.Col>
        <Grid.Col span={3} offset={4}>
          <Group className={classes.links}>{items}</Group>
        </Grid.Col>
      </Grid>
    </div>
  );
};
