import { rem, createStyles } from "@mantine/core";

const HEADER_HEIGHT = rem(100);

export const useStyles = createStyles((theme) => ({
  header: {
    backgroundImage: `linear-gradient(to bottom, ${theme.colors.cyan[6]}, ${theme.colors.violet[6]})`,
    borderBottom: 0,
    padding: "0px",
  },

  inner: {
    height: rem(56),
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("690")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("690")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.white,
    fontSize: theme.fontSizes.lg,
    fontWeight: 600,
    cursor: "pointer",

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },

  search_default: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
    [theme.fn.largerThan("lg")]: {
      width: "70%",
    },
    [theme.fn.smallerThan("lg")]: {
      width: "70%",
    },
    [theme.fn.smallerThan("1060")]: {
      width: "50%",
    },
    [theme.fn.smallerThan("690")]: {
      // width: "40%",
      display: "none",
    },
    [theme.fn.smallerThan("631")]: {
      display: "none",
    },
  },

  search_alt: {
    [theme.fn.largerThan("631")]: {
      width: "70%",
    },
  },

  image: {
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: theme.shadows.md,
    },
    transition: "transform 150ms ease, box-shadow 150ms ease",
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "self-start",
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: "violet",
    }).background,
    borderBottom: 0,
    height: rem(300),
    padding: rem(5),

    [theme.fn.largerThan("690")]: {
      display: "none",
    },
  },
}));
