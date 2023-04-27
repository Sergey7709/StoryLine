import { useMantineColorScheme, ActionIcon } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

export function ThemeToggleIcon() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <ActionIcon
      variant="filled"
      // variant="gradient"
      // gradient={{ from: "yellow", to: "black" }}
      color={dark ? "yellow" : "dark"}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
      size={40}
    >
      {dark ? <IconSun size="1.5rem" /> : <IconMoonStars size="1.5rem" />}
    </ActionIcon>
  );
}
