import { ActionIcon, Avatar } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const AvatarIcon = () => {
  const navigate = useNavigate();
  const onClickAuthorization = () => {
    navigate("/authorization");
  };
  return (
    <ActionIcon onClick={onClickAuthorization} p={12} size={39}>
      <Avatar
        variant="gradient"
        gradient={{ from: "green", to: "gray" }}
        size="2.5rem"
        radius="sm"
      />
    </ActionIcon>
  );
};
