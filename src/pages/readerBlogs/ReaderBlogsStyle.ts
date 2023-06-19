import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  card: {
    transition: "box-shadow 150ms ease, transform 100ms ease",
    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.05)",
    },
  },

  grid: {
    [theme.fn.smallerThan("xl")]: {
      cols: 4,
    },
    [theme.fn.smallerThan("md")]: {
      cols: 3,
    },
    [theme.fn.smallerThan("xs")]: {
      cols: 1,
    },
  },

  gridCol: {
    display: "flex",
    justifyContent: "space-between",
  },

  date: {
    position: "absolute",
    bottom: "2%",
    right: "5px",
  },
}));
