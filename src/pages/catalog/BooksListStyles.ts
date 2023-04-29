import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },

    width: "14rem",
    height: "23rem",
    margin: "1rem",
  },

  discount: {
    position: "absolute",
    // top: theme.spacing.xs,
    top: "10px",
    left: rem(5),
    pointerEvents: "none",
  },

  favorite: {
    position: "absolute",
    top: "5px",
    right: rem(5),
  },

  buy: {
    position: "absolute",
    bottom: "10px",
    margin: "0px",
    // right: rem(5),
  },

  text: {
    position: "absolute",
    bottom: "55px",
    margin: "0px",
    // right: rem(5),
  },

  title: {
    display: "block",
    marginTop: theme.spacing.md,
    marginBottom: rem(5),
  },

  grid: {
    [theme.fn.smallerThan("xs")]: {
      cols: 1,
      justifyContent: "center",
    },
    [theme.fn.smallerThan("sm")]: {
      cols: 2,
      paddingLeft: "6%",
    },
    [theme.fn.smallerThan("md")]: {
      cols: 3,
      paddingLeft: "5%",
    },
    [theme.fn.smallerThan("lg")]: {
      cols: 4,
      paddingLeft: "3%",
    },
    [theme.fn.smallerThan("xl")]: {
      cols: 5,
      paddingLeft: "3%",
    },
    [theme.fn.largerThan("xl")]: {
      cols: 7,
      paddingLeft: "3%",
    },
  },
}));
