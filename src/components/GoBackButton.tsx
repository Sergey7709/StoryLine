import { Button, MantineGradient, Text } from "@mantine/core";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

type GoBackButtonPropsType = {
  variant?: string;
  color?: string;
  size?: string;
  gradient?: MantineGradient | undefined;
  text?: string;
  compact?: boolean;
};

export const GoBackButton = (props: GoBackButtonPropsType) => {
  const { variant, color, size, gradient, text, compact } = props;

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <Button
      leftIcon={<TiArrowBack size={25} />}
      variant={variant}
      color={color}
      size={size}
      gradient={gradient}
      onClick={goBack}
      compact={compact}
    >
      <Text>{text}</Text>
    </Button>
  );
};
