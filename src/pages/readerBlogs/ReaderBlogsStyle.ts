import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  card: {
    transition: "box-shadow 150ms ease, transform 100ms ease",
    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.05)",
    },
  },
}));
