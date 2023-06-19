import { Button, Text } from "@mantine/core";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { GoBackButtonPropsType } from "../common/constants";

export const GoBackButton = (props: GoBackButtonPropsType) => {
  const { variant, color, size, gradient, text, compact, width } = props;

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
      w={width}
    >
      <Text>{text}</Text>
    </Button>
  );
};
