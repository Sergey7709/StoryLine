import { Menu, Flex, Center } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { NAV_BUTTONS } from "../../common/constants";
import { MenuItem } from "./MenuItem";

type HeaderButtonsProps = {
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
const HeaderButtons: FC<HeaderButtonsProps> = ({ classes }) => {
  return (
    <>
      {NAV_BUTTONS.map((link) => (
        <Menu
          key={link.label}
          trigger={"click"}
          transitionProps={{ exitDuration: 0 }}
          withinPortal
          width="100%"
          position="bottom-start"
          offset={0}
        >
          <Menu.Target>
            {link.label === "Каталог" ? (
              <Flex align="center" className={classes.link}>
                {link.label}
                <IconChevronDown size="1rem" />
                <Menu.Dropdown pl={40}>
                  <MenuItem />
                </Menu.Dropdown>
              </Flex>
            ) : (
              <NavLink to={link.link} className={classes.link}>
                <Center>
                  <span className={classes.linkLabel}>{link.label}</span>
                </Center>
              </NavLink>
            )}
          </Menu.Target>
        </Menu>
      ))}
    </>
  );
};

export default HeaderButtons;
