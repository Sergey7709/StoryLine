import { ActionIcon, Avatar } from "@mantine/core";
import { FC } from "react";
type Props = {
  open: () => void;
};
export const AvatarIcon: FC<Props> = ({ open }) => {
  return (
    <ActionIcon onClick={open} p={12} size={39}>
      <Avatar
        variant="gradient"
        gradient={{ from: "green", to: "gray" }}
        size="2.5rem"
        radius="sm"
      />
    </ActionIcon>
  );
};
