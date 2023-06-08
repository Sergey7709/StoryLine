import { Container, Group, UnstyledButton } from "@mantine/core";

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
      <Container className={classes.inner}>
        © 2023 World of books. All rights reserved.
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
};
